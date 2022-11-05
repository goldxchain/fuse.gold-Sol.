// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "./Blacklistable.sol";
import "./Pausable.sol";
import "./ERC20.sol";
import "./SafeMath.sol";
import "./AggregatorV3Interface.sol";
import "./AccessControl.sol";

contract Q007 is Ownable, Blacklistable, Pausable, ERC20, AccessControl {
    using SafeMath for uint256;

    struct Member {
        address payable clientAddress;
        address payable refAddress;
        string role;
    }

    uint private _totalBurnt = 0;
    uint256 public _totalValue = 0;
    uint256 public taxRate;
    uint256 SA_threshold;
    address public taxAddress;
    address public feeAddress;
    address public treasuryAddress;
    string SA = "super_admin";
    string MA = "merchant";

    bytes32 public constant THREE_ROLE = keccak256("THREE_ROLE");
    bytes32 public constant FOUR_ROLE = keccak256("FOUR_ROLE");

    mapping(address => Member) Members;
    mapping(address => uint256) taxList;

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
        _setupRole(THREE_ROLE, three);
        _setupRole(FOUR_ROLE, four);
    }

    function transfer(address to, uint256 amount) public override whenNotPaused returns (bool) {
        address sender = _msgSender();
        require(isBlacklisted(sender)!=true, "ERC20: account is blacklisted");

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
        _totalValue = SafeMath.add(_totalValue, amount);

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
    // Start of getter functions

    /**
     * Returns the latest price of gold from chainlink
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
    // End of getter functions

    function verify_level(address user) public view returns(uint256) {
        if (keccak256(abi.encodePacked((Members[user].role))) == keccak256(abi.encodePacked((SA))) || user==owner()){
            return 0;
        } else if (keccak256(abi.encodePacked((Members[user].role))) == keccak256(abi.encodePacked((MA)))) {
            return SA_threshold;
        } else {
            return 1;
        }
    }
  
    function setTaxRate(uint256 rate) external onlyRole(THREE_ROLE) {
        taxRate = rate;
    }

    function setTaxWallet(address wallet) external onlyRole(FOUR_ROLE) {
        require(wallet != address(0), "Invalid Wallet Address");
        taxAddress = wallet;
    }

    function setFeeWallet(address wallet) external onlyRole(FOUR_ROLE) {
        require(wallet != address(0), "Invalid Wallet Address");
        feeAddress = wallet;
    }

    function setTreasuryWallet(address wallet) external onlyRole(FOUR_ROLE) {
        require(wallet != address(0), "Invalid Wallet Address");
        treasuryAddress = wallet;
    }

    function addToTaxList(address wallet, uint256 taxAmount) external onlyHigherUser(_msgSender()) {
        require(wallet != address(0), "Invalid Wallet Address");
        require(taxAmount > 0, "taxAmount can't be 0");
        taxList[wallet] = taxAmount;
    }

    function removeFromTaxList(address wallet) external onlyHigherUser(_msgSender()) {
        require(wallet != address(0), "Invalid Wallet Address");
        delete taxList[wallet];
    }

    function set_SA_threshold(uint256 amount) public onlyHigherUser(_msgSender()) {
        SA_threshold = amount;
    }

    function newSuperAdmin(address payable user) public onlyRole(THREE_ROLE) {
        require(keccak256(abi.encodePacked((Members[user].role))) != keccak256(abi.encodePacked((SA))), 
            "Already SuperAdmin");
        Members[user].role= SA;
        emit NewSuperAdminEvent(user, block.timestamp);
    }

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
  
    function pause() public onlyRole(FOUR_ROLE) {
        _pause();
    }
  
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
        _totalBurnt = SafeMath.add(_totalBurnt, amount);
        _totalValue = SafeMath.sub(_totalValue, amount);
     
    }

    function transferOwnership(address newOwner) public override onlyRole(FOUR_ROLE) {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }

 
}