// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "./Blacklistable.sol";
import "./Pausable.sol";
import "./ERC20.sol";
import "./AggregatorV3Interface.sol";
import "./AccessControl.sol";

contract Q007 is Ownable, Blacklistable, Pausable, ERC20, AccessControl {

    struct Member {
        address payable clientAddress;
        address payable refAddress;
        string role;
    }

    uint private _totalBurnt = 0;
    uint256 private taxRatePower = 4;
    uint256 public _totalValue = 0;
    uint256 public taxRate;
    uint256 SA_threshold;
    address public taxAddress = 0x32Ac66Ea2de678D2edc66486Dc8cc2Aa0Fff82d8; //Test addresses
    address public feeAddress = 0xDC8F0f1795B99B5cC2B4619C25BA03aF4b6F905C;
    address public treasuryAddress = 0x47205d12a931255D46f39100f594bA6E749D40B8;
    address public threeRoleAddress;
    address public fourRoleAddress;
    string SA = "super_admin";
    string MA = "merchant";

    bytes32 public constant THREE_ROLE = keccak256("THREE_ROLE");
    bytes32 public constant FOUR_ROLE = keccak256("FOUR_ROLE");

    mapping(address => Member) Members;
    mapping(address => uint256) public taxList;

    AggregatorV3Interface internal priceFeedCommon;

    /**
     * Network: Rinkeby
     * Aggregator: XAU/USD
     * Address: 0x81570059A0cb83888f1459Ec66Aad1Ac16730243
     * Aggregator: BTC/USD
     * Address: 0xECe365B379E1dD183B20fc5f022230C044d51404
     * Aggregator: BNB/USD
     * Address: 0xcf0f51ca2cDAecb464eeE4227f5295F2384F84ED
     * Aggregator: LINK/USD
     * Address: 0xd8bD0a1cB028a31AA859A21A3758685a95dE4623
     * Aggregator: ETH/USD
     * Address: 0x8A753747A1Fa494EC906cE90E9f37563A8AF630e
     */

    event GoldBought(address indexed client, uint amount, int goldPrice, uint timestamp);
    event GoldWithdrawn(address indexed client, uint amount, int goldPrice, uint timestamp);
    event NewMerchantEvent(address indexed user, uint timestamp);
    event NewSuperAdminEvent(address indexed user, uint timestamp);
    event MerchantRemoved(address indexed user, uint timestamp);
    event SuperAdmin_Removed(address indexed user, uint timestamp);
    event UpdatedMultiSigWallets(address threeWallet, address fourWallet);
    event TaxRateUpdated(uint256 rate);
    event TaxWalletUpdated(address wallet);
    event FeeWalletUpdated(address wallet);
    event TreasuryWalletUpdated(address wallet);
    event AddedToTaxList(address wallet, uint256 taxAmount);
    event RemovedFromTaxList(address wallet);
    event PerformedTax(address wallet, uint256 taxAmount);

    // Start of modifiers
    modifier checkClientBalance(address payable client, uint amount) {
        uint clientBalance = balanceOf(client);
        require(clientBalance >= amount, "Inefficient balance");
        _;
    }

    modifier onlyHighUser(address user) {
        require(keccak256(abi.encodePacked(
            (Members[user].role))) == keccak256(abi.encodePacked((SA))) ||
            keccak256(abi.encodePacked((Members[user].role))) == keccak256(abi.encodePacked((MA))) ||
            user==owner(),
            "Authorization: caller is not authorized");
        _;
    }

    modifier onlyHigherUser(address user) {
        require(keccak256(abi.encodePacked(
        (Members[user].role))) == keccak256(abi.encodePacked((SA))) ||
            user==owner(),
            "Authorization: caller is not authorized");
        _;
    }
    
    // End of modifiers
    constructor(address three, address four) ERC20("goodToken", "GT")  {
        require(three != address(0), "Invalid 3 signature wallet Address");
        require(four != address(0), "Invalid 4 signature wallet Address");
        _setupRole(THREE_ROLE, three);
        _setupRole(FOUR_ROLE, four);
        threeRoleAddress = three;
        fourRoleAddress = four;
    }

    /**
     * @dev 3 Signer multisig function that sets tax rate, if set to 0 effectively disables tax
     * 100 = 1%, 1 = 0.01% etc
     */
    function setTaxRate(uint256 rate) external onlyRole(THREE_ROLE) {
        taxRate = rate;
        emit TaxRateUpdated(rate);
    }

    /**
     * @dev 4 Signer multisig function that updates tax wallet address
     */
    function setTaxWallet(address wallet) external onlyRole(FOUR_ROLE) {
        require(wallet != address(0), "Invalid Wallet Address");
        taxAddress = wallet;
        emit TaxWalletUpdated(wallet);
    }

    /**
     * @dev 4 Signer multisig function that updates fee wallet address
     */
    function setFeeWallet(address wallet) external onlyRole(FOUR_ROLE) {
        require(wallet != address(0), "Invalid Wallet Address");
        feeAddress = wallet;
        emit FeeWalletUpdated(wallet);
    }

    /**
     * @dev 4 Signer multisig function that updates treasury wallet address
     */
    function setTreasuryWallet(address wallet) external onlyRole(FOUR_ROLE) {
        require(wallet != address(0), "Invalid Wallet Address");
        treasuryAddress = wallet;
        emit TreasuryWalletUpdated(wallet);
    }

    /**
     * @dev Adds wallet and tax amount to tax list, also can update amount for specific wallet
     */
    function addToTaxList(address wallet, uint256 taxAmount) external onlyHigherUser(_msgSender()) {
        require(wallet != address(0), "Invalid Wallet Address");
        require(taxAmount > 0, "taxAmount can't be 0");
        taxList[wallet] = taxAmount;
        emit AddedToTaxList(wallet, taxAmount);
    }

    /**
     * @dev Deletes wallet address from tax list
     */
    function removeFromTaxList(address wallet) external onlyHigherUser(_msgSender()) {
        require(wallet != address(0), "Invalid Wallet Address");
        require(taxList[wallet] != 0, "Wallet doesn't exist in tax list");
        delete taxList[wallet];
        emit RemovedFromTaxList(wallet);
    }

    /**
     * @dev Returns true if specified wallet is in tac list
     */
    function isSpecificTax(address wallet) public view returns (bool) {
        return taxList[wallet] != 0;
    }

    function performTax(uint256 amount, uint256 specificTaxRate) internal {
        require(specificTaxRate > 0, "Tax rate must be greater than 0");
        address sender = _msgSender();
        uint256 taxAmount;
        uint256 totalTaxRate = 10 ** taxRatePower;
        
        taxAmount = amount * specificTaxRate / totalTaxRate;
        require(balanceOf(sender) > (amount + taxAmount), "Insufficient balance");
        _transfer(sender, taxAddress, taxAmount);

        emit PerformedTax(sender, taxAmount);
    }

    /**
     * @dev Overriden ERC20 transfer function with added pause and blacklist
     */
    function transfer(address to, uint256 amount) public override whenNotPaused returns (bool) {

        address sender = _msgSender();
        require(isBlacklisted(sender)!=true, "ERC20: account is blacklisted");

        if(isSpecificTax(sender)) {
            performTax(amount, taxList[sender]);
        } else if (taxRate > 0) {
            performTax(amount, taxRate);
        }

        _transfer(sender, to, amount);
        return true;
    }

    function transferTokens(
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

        _transfer(treasuryAddress, clientAddress,clientAmount);
        _transfer(treasuryAddress, feeAddress,feeAmount);
        _transfer(feeAddress, refAddress,refAmount);

       // emit GoldBought(clientAddress, clientAmount, )
    }

    function mintTokens(
        address wallet,
        uint256 amount
    ) public onlyOwner returns (bool) {
        _mint(wallet, amount);
        _totalValue = _totalValue + amount;

        return true;
    }

    function transferFrom(
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

    }

    /**
     * @dev Returns the latest price of gold from chainlink
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

    function getAdminLimit() public view returns(uint256) {
        return SA_threshold;
    }

    function getTotalBurnt() public view returns(uint) {
        return _totalBurnt;
    }

    function verify_level(address user) public view returns(uint256) {
        if (keccak256(abi.encodePacked((Members[user].role))) == keccak256(abi.encodePacked((SA))) || user==owner()) {
            return 0;
        } else if (keccak256(abi.encodePacked((Members[user].role))) == keccak256(abi.encodePacked((MA)))) {
            return SA_threshold;
        } else {
            return 1;
        }
    }
  
    function set_SA_threshold(uint256 amount) public onlyHigherUser(_msgSender()) {
        SA_threshold = amount;
    }

    /**
     * @dev 3 Signer multisig function that adds new super admin
     */
    function newSuperAdmin(address payable user) public onlyRole(THREE_ROLE) {
        require(keccak256(abi.encodePacked((Members[user].role))) != keccak256(abi.encodePacked((SA))), 
            "Already SuperAdmin");
        Members[user].role= SA;
        emit NewSuperAdminEvent(user, block.timestamp);
    }

    /**
     * @dev 4 Signer multisig function updates both 3 signer and 4 signer multi sig wallet addresses
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
     * @dev 3 Signer multisig function that removes super admin
     */
    function removeSuperAdmin(address payable user) public onlyRole(THREE_ROLE) {
        Members[user].role = "user";
        emit SuperAdmin_Removed(user, block.timestamp);
    }
  
    function isMerchant(address _account) public view returns (bool) {
        return (keccak256(abi.encodePacked((Members[_account].role))) == keccak256(abi.encodePacked((MA))));
    }

    function isSuperAdmin(address _account) public view returns (bool) {
        return (keccak256(abi.encodePacked((Members[_account].role))) == keccak256(abi.encodePacked((SA))));
    }  

    function newMerchant(address payable user) public onlyRole(THREE_ROLE) {
        require(keccak256(abi.encodePacked((Members[user].role))) != keccak256(abi.encodePacked((MA))), 
            "Already Merchant");
        Members[user].role = MA;
        emit NewMerchantEvent(user, block.timestamp);
    }

    function removeMerchant(address payable user) public onlyRole(THREE_ROLE) {
        Members[user].role= "user";
        emit MerchantRemoved(user, block.timestamp);
    }
  
    /**
     * @dev 4 Signer multisig function that pauses contract
     */
    function pause() public onlyRole(FOUR_ROLE) {
        _pause();
    }

    /**
     * @dev 4 Signer multisig function that unpauses contract
     */
    function unpause() public onlyRole(FOUR_ROLE) {
        _unpause();
    }

    function withdrawGold(
        address payable client,
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
        _totalBurnt = _totalBurnt + amount;
        _totalValue = _totalValue - amount;
     
    }

    /**
     * @dev Override ownable function with 4 Signer multisig that transfers contract owner address
     */
    function transferOwnership(address newOwner) public override onlyRole(FOUR_ROLE) {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }

 
}