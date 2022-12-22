// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "./Blacklistable.sol";
import "./Pausable.sol";
import "./ERC20.sol";
import "./AggregatorV3Interface.sol";
import "./AccessControl.sol";
import "./IRewardVault.sol";

// @title Fuse Gold Token Contract
contract FuseG is Ownable, Blacklistable, Pausable, ERC20, AccessControl {


    uint256 public taxRate;
    address public taxAddress;
    address public feeAddress;
    address public treasuryAddress;
    address public threeRoleAddress;
    address public fourRoleAddress;
    address public rewardVaultAddress;
    uint256 public dexBuyRewards;
    uint256 public dexSellRewards;
    uint256 private _totalValue = 0;
    uint256 private _totalBurnt = 0;
    uint256 private constant _taxRatePower = 4;
    uint256 private _adminLimit;


    bytes32 public constant THREE_ROLE = keccak256("THREE_ROLE");
    bytes32 public constant FOUR_ROLE = keccak256("FOUR_ROLE");
    bytes32 public constant SUPER_ADMIN = keccak256("SUPER_ADMIN");
    bytes32 public constant MERCHANT = keccak256("MERCHANT");

    mapping(address => bytes32) Members;
    mapping(address => bool) public DexList;
    mapping(address => uint256) public taxList;

    mapping(address => uint256) public userDexBuyRewards;
    mapping(address => uint256) public userDexSellRewards;

    AggregatorV3Interface internal priceFeedCommon;

    event GoldBought(address indexed client, uint amount, uint timestamp);
    event GoldSold(address indexed client, uint amount, uint timestamp);
    event GoldWithdrawn(address indexed client, uint amount, uint timestamp);
    event NewMerchantEvent(address indexed user, uint timestamp);
    event NewSuperAdminEvent(address indexed user, uint timestamp);
    event MerchantRemoved(address indexed user, uint timestamp);
    event SuperAdmin_Removed(address indexed user, uint timestamp);
    event UpdatedMultiSigWallets(address threeWallet, address fourWallet);
    event TaxRateUpdated(uint256 rate);
    event TaxWalletUpdated(address wallet);
    event FeeWalletUpdated(address wallet);
    event TreasuryWalletUpdated(address wallet);
    event RewardVaultSet(address wallet);
    event AddedToTaxList(address wallet, uint256 taxAmount);
    event RemovedFromTaxList(address wallet);
    event PerformedTax(address wallet, uint256 taxAmount);

    // Start of modifiers
    modifier checkClientBalance(address client, uint amount) {
        uint clientBalance = balanceOf(client);
        require(clientBalance >= amount, "Insufficient balance");
        _;
    }

    modifier onlyHighUser(address user) {
        require(hasRole(SUPER_ADMIN, user) ||
            hasRole(MERCHANT, user) ||
            user==owner(),
            "Authorization: caller is not authorized");
        _;
    }

    modifier onlyHigherUser(address user) {
        require(hasRole(SUPER_ADMIN, user) || user==owner(),
            "Authorization: caller is not authorized");
        _;
    }
    
    // End of modifiers

    /**
     * @notice Fuse Gold token contstructor
     * @param _threeWallet Multi sig wallet address with three signers
     * @param _fourWallet Multi sig wallet address with four signers
     * @param _taxWallet Wallet used to receive tax
     * @param _feeWallet Wallet used to receive fees
     * @param _treasuryWallet Treasury wallet address
     */
    constructor(
        address _threeWallet, 
        address _fourWallet,
        address _taxWallet,
        address _feeWallet,
        address _treasuryWallet
        ) ERC20("FuseGold", "FuseG") {
        require(_threeWallet != address(0), "Invalid 3 signature wallet Address");
        require(_fourWallet != address(0), "Invalid 4 signature wallet Address");
        require(_taxWallet != address(0), "Invalid tax wallet Address");
        require(_feeWallet != address(0), "Invalid fee wallet Address");
        require(_treasuryWallet != address(0), "Invalid treasury wallet Address");
        _setupRole(THREE_ROLE, _threeWallet);
        _setupRole(FOUR_ROLE, _fourWallet);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        threeRoleAddress = _threeWallet;
        fourRoleAddress = _fourWallet;
        taxAddress = _taxWallet;
        feeAddress = _feeWallet;
        treasuryAddress = _treasuryWallet;
    }

    /**
     * @notice 3 Signer multisig function that sets tax rate, if set to 0 effectively disables tax
     * @param rate New tax rate (100 = 1%, 1 = 0.01% etc)
     */
    function setTaxRate(uint256 rate) external onlyRole(THREE_ROLE) {
        taxRate = rate;
        emit TaxRateUpdated(rate);
    }

    /**
     * @notice 4 Signer multisig function that updates tax wallet address
     * @param wallet New tax wallet address
     */
    function setTaxWallet(address wallet) external onlyRole(FOUR_ROLE) {
        require(wallet != address(0), "Invalid tax wallet Address");
        taxAddress = wallet;
        emit TaxWalletUpdated(wallet);
    }

    /**
     * @notice 4 Signer multisig function that updates fee wallet address
     * @param wallet New fee wallet address
     */
    function setFeeWallet(address wallet) external onlyRole(FOUR_ROLE) {
        require(wallet != address(0), "Invalid fee wallet Address");
        feeAddress = wallet;
        emit FeeWalletUpdated(wallet);
    }

    /**
     * @notice 4 Signer multisig function that updates treasury wallet address
     * @param wallet New treasury wallet address
     */
    function setTreasuryWallet(address wallet) external onlyRole(FOUR_ROLE) {
        require(wallet != address(0), "Invalid treasury wallet Address");
        treasuryAddress = wallet;
        emit TreasuryWalletUpdated(wallet);
    }

    /**
     * @notice 4 Signer multisig function that updates treasury wallet address
     * @param wallet New treasury wallet address
     */
    function setRewardVault(address wallet) external onlyOwner {
        require(wallet != address(0), "Invalid reward vault contract Address");
        rewardVaultAddress = wallet;
        emit RewardVaultSet(wallet);
    }

    /**
     * @notice Adds a new dex contract to the list
     * @param dexContract Contract address of dex pair
     */
    function addDexAddress(address dexContract) external onlyOwner {
        require(dexContract != address(0), "Invalid DEX address");
        DexList[dexContract] = true;
    }

    /**
     * @notice Removes specified dex contract address to the list
     * @param dexContract Contract address of dex to remove
     */
    function removeDexAddress(address dexContract) external onlyOwner {
        require(dexContract != address(0), "Invalid DEX address");
        require(isDex(dexContract), "DEX doesn't exist in list");
        delete DexList[dexContract];
    }

    /**
     * @notice Adds wallet and tax amount to tax list, also can update amount for specific wallet
     * @param wallet New wallet to add to list
     * @param taxAmount Tax rate for new wallet (100 = 1%, 1 = 0.01% etc)
     */
    function addToTaxList(address wallet, uint256 taxAmount) external onlyHigherUser(_msgSender()) {
        require(wallet != address(0), "Invalid Wallet Address");
        require(taxAmount > 0, "taxAmount can't be 0");
        taxList[wallet] = taxAmount;
        emit AddedToTaxList(wallet, taxAmount);
    }

    /**
     * @notice Deletes wallet address from tax list
     * @param wallet Wallet to be removed
     */
    function removeFromTaxList(address wallet) external onlyHigherUser(_msgSender()) {
        require(wallet != address(0), "Invalid Wallet Address");
        require(taxList[wallet] != 0, "Wallet doesn't exist in tax list");
        delete taxList[wallet];
        emit RemovedFromTaxList(wallet);
    }

    /**
     * @notice Returns true if specified wallet is in tax list
     * @param wallet Wallet to check if currently is in list
     */
    function isSpecificTax(address wallet) public view returns (bool) {
        return taxList[wallet] != 0;
    }

    /**
     * @notice Overriden ERC20 transfer function with added pause and blacklist
     */
    function transfer(address to, uint256 amount) public override whenNotPaused returns (bool) {

        address sender = msg.sender;
        require(isBlacklisted(sender)!=true, "FuseG: account is blacklisted");
        
        _transfer(sender, to, amount);
        return true;
    }

    /**
     * @notice Overriden ERC20 function to allow tax and minting from DEX trades
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override {

        if(isSpecificTax(from)) {
            performTax(amount, taxList[from]);
        } else if (taxRate > 0) {
            performTax(amount, taxRate);
        }

        uint256 reward = 0;
        if(isDex(from)) {
            reward = IRewardVault(rewardVaultAddress).mineGoldX(to, amount);
            dexBuyRewards += reward;
            userDexBuyRewards[to] += reward;
        } 
        if(isDex(to)) {
            reward = IRewardVault(rewardVaultAddress).mineGoldX(from, amount);
             dexSellRewards += reward;
             userDexSellRewards[from] += reward;
        }
    }

    /**
     * @notice Buy function for fuse gold, values will be calculated and passed to this function
     * via the online platform. Calls GoldX RewardVault contract to mineGoldX tokens
     * @param clientAddress Client wallet address the tokens are to be sent to
     * @param clientAmount Amount of tokens to send to the Client Address from the Sender wallet address
     * @param feeAmount Amount of tokens to be sent to the Fee wallet address from the Sender wallet address
     * @param refAddress Referral wallet address the tokens are to be sent to for the referral rate
     * @param refAmount Amount of tokens to be sent to the Referral wallet address from the Sender wallet address
     */
    function buyTokens(
        address clientAddress,
        uint256 clientAmount,
        uint256 feeAmount,
        address refAddress,
        uint256 refAmount
    ) public onlyHighUser(_msgSender()) {
        uint level_code = verify_level(_msgSender());

        if (clientAmount>level_code) {
            require(level_code==0, "not authorized");
        } else {
            require(level_code>clientAmount || level_code==0, "not authorized");
        }

        _transfer(treasuryAddress, clientAddress, clientAmount);
        _transfer(treasuryAddress, feeAddress, feeAmount);

        if(refAddress != address(0)) {
            _transfer(clientAddress, refAddress, refAmount);
        }
        
        //mint GoldX
        IRewardVault(rewardVaultAddress).mineGoldX(clientAddress, clientAmount);

       emit GoldBought(clientAddress, clientAmount, block.timestamp);
    }
     /**
     * @notice Allows owner to mint tokens to specified wallet
     * @param wallet Wallet to mint tokens to
     * @param amount Amount of tokens to mint
     */
    function mintTokens(
        address wallet,
        uint256 amount
    ) public onlyOwner returns (bool) {
        _mint(wallet, amount);
        _totalValue = _totalValue + amount;

        return true;
    }

    /**
     * @notice Fuse gold sell function, fees will be calculated via the fuse gold platform
     * calls GoldX RewardVault contract to mineGoldX tokens
     * @param sender Sender wallet address the tokens are to be sent from (seller)
     * @param amount Amount of tokens to send to the treasury address from the Sender wallet address
     * @param feeAmount Amount of tokens to be sent to the Fee wallet address from the Sender wallet address
     */
    function sellTokens(
        address sender,
        uint256 amount,
        uint256 feeAmount
    ) public onlyHighUser(_msgSender()) {
        uint level_code = verify_level(_msgSender());

        if (amount>level_code) {
            require(level_code==0, "not authorized");
        } else {
            require(level_code>amount || level_code==0, "not authorized");
        }

        _transfer(sender, treasuryAddress, amount);
        _transfer(sender, feeAddress, feeAmount);

        //mint GoldX
        IRewardVault(rewardVaultAddress).mineGoldX(sender, amount);

        emit GoldSold(sender, amount, block.timestamp);

    }

    /**
     * @notice Returns the latest price of gold from chainlink
     * @param account Address of the chainlink aggregator to use:
     * Network: BSC Testnet XAU/USD
     * Address: 0x4E08A779a85d28Cc96515379903A6029487CEbA0
     */
    function getPrice(address account) public returns (int) {
        priceFeedCommon = AggregatorV3Interface(account);
        (
            /*uint80 roundID*/,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = priceFeedCommon.latestRoundData();
        return price;
    }

     /**
     * @notice Returns the current spend limit
     */
    function getAdminLimit() public view returns(uint256) {
        return _adminLimit;
    }

     /**
     * @notice Returns the total amount burned
     */
    function getTotalBurnt() public view returns(uint256) {
        return _totalBurnt;
    }

    /**
     * @notice Returns the total amount burned
     */
    function getTotalValue() public view returns(uint256) {
        return _totalValue;
    }

     /**
     * @notice Verification for user permissions
     * @return Integer spend limit for Merchants, 0 for Super Admin, otherwise returns 1
     */
    function verify_level(address user) public view returns(uint256) {
        if (hasRole(SUPER_ADMIN, user) || user==owner()) {
            return 0;
        } else if (hasRole(MERCHANT, user)) {
            return _adminLimit;
        } else {
            return 1;
        }
    }
  
    /**
     * @notice Sets the spend limit for super admin
     * @param amount New limit amount
     */
    function setAdminLimit(uint256 amount) public onlyHigherUser(_msgSender()) {
        _adminLimit = amount;
    }

    /**
     * @notice 3 Signer multisig function that adds new super admin
     * @param user New user address to add as a super admin
     */
    function newSuperAdmin(address user) public onlyRole(THREE_ROLE) {
        require(!hasRole(SUPER_ADMIN, user), "Already SuperAdmin");
        _grantRole(SUPER_ADMIN, user);
        Members[user] = SUPER_ADMIN;

        emit NewSuperAdminEvent(user, block.timestamp);
    }

    /**
     * @notice 4 Signer multisig function updates both 3 signer and 4 signer multi sig wallet addresses
     * @param threeWallet Wallet address used for 3 signer multi sig functions
     * @param fourWallet Wallet address used for 4 signer multi sig functions
     */
    function updateMultiSigWallets(address threeWallet, address fourWallet) external onlyRole(FOUR_ROLE) {
        require(threeWallet != address(0), "Invalid 3 signature wallet Address");
        require(fourWallet != address(0), "Invalid 4 signature wallet Address");
        revokeRole(THREE_ROLE, threeRoleAddress);
        grantRole(THREE_ROLE, threeWallet);
        revokeRole(FOUR_ROLE, fourRoleAddress);
        grantRole(FOUR_ROLE, fourWallet);

        threeRoleAddress = threeWallet;
        fourRoleAddress = fourWallet;

        emit UpdatedMultiSigWallets(threeWallet, fourWallet);
    }

    /**
     * @notice 3 Signer multisig function that removes super admin
     * @param user Wallet address to remove super admin role
     */
    function removeSuperAdmin(address user) public onlyRole(THREE_ROLE) {
        revokeRole(SUPER_ADMIN, user);
        Members[user] = "user";
        emit SuperAdmin_Removed(user, block.timestamp);
    }
  
     /**
     * @notice Returns whether specified address has merchant role
     * @param _account Address to check
     */
    function isMerchant(address _account) public view returns (bool) {
        return hasRole(MERCHANT, _account);
    }

    /**
     * @notice Returns whether specified address has super admin role
     * @param _account Address to check
     */
    function isSuperAdmin(address _account) public view returns (bool) {
        return hasRole(SUPER_ADMIN, _account);
    } 

    /**
     * @notice Adds a new merchant user
     * @param user Address of user to add
     */
    function newMerchant(address user) public onlyRole(THREE_ROLE) {
        require(!hasRole(MERCHANT, user), "Already Merchant");
        _revokeRole(SUPER_ADMIN, user);
        _grantRole(MERCHANT, user);
        Members[user] = MERCHANT;
        emit NewMerchantEvent(user, block.timestamp);
    }

    /**
     * @notice Removes merchant user
     * @param user Address of merchant user to remove
     */
    function removeMerchant(address user) public onlyRole(THREE_ROLE) {
        _revokeRole(MERCHANT, user);
        Members[user] = "user";
        emit MerchantRemoved(user, block.timestamp);
    }
  
    /**
     * @notice 4 Signer multisig function that pauses contract
     */
    function pause() public onlyRole(FOUR_ROLE) {
        _pause();
    }

    /**
     * @notice 4 Signer multisig function that unpauses contract
     */
    function unpause() public onlyRole(FOUR_ROLE) {
        _unpause();
    }

    /**
     * @notice Withdraws tokens to physical gold, burning tokens
     * @param client Sender wallet address the tokens are to be sent from (seller/exchanger)
     * @param amount Amount of tokens to burn
     * @param feeAmount Amount of tokens to be sent to the Fee wallet address from the Sender wallet address
     */
    function withdrawGold(
        address client,
        uint256 amount,
        uint256 feeAmount
    ) public onlyHighUser(_msgSender()) checkClientBalance(client, amount) {
        uint level_code = verify_level(_msgSender());
        if (amount>level_code) {
            require(level_code==0, "not authorized");
        } else {
            require(level_code>amount || level_code==0, "not authorized");
        }
    
        _transfer(client, feeAddress, feeAmount);
        _burn(client, amount);

        //mint GoldX
        IRewardVault(rewardVaultAddress).mineGoldX(client, amount);

        _totalBurnt = _totalBurnt + amount;
        _totalValue = _totalValue - amount;
     
        emit GoldWithdrawn(client, amount, block.timestamp);
    }

    /**
     * @notice Override ownable function with 4 Signer multisig that transfers contract owner address
     * @param newOwner wallet address to transfer to
     */
    function transferOwnership(address newOwner) public override onlyRole(FOUR_ROLE) {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }

    //Used to determine whether address is in dex list
    function isDex(address dexContract) internal view returns (bool) {
        return DexList[dexContract] == true;
    }

    //Performs tax calculations
    function performTax(uint256 amount, uint256 specificTaxRate) internal {
        require(specificTaxRate > 0, "Tax rate must be greater than 0");
        address sender = _msgSender();
        uint256 taxAmount;
        uint256 totalTaxRate = 10 ** _taxRatePower;
        
        taxAmount = amount * specificTaxRate / totalTaxRate;
        require(balanceOf(sender) > (amount + taxAmount), "Insufficient balance");
        _transfer(sender, taxAddress, taxAmount);

        emit PerformedTax(sender, taxAmount);
    }

 
}