# Fuse Gold Developer Documentation

## AccessControl

_Contract module that allows children to implement role-based access
control mechanisms. This is a lightweight version that doesn't allow enumerating role
members except through off-chain means by accessing the contract event logs. Some
applications may benefit from on-chain enumerability, for those cases see
{AccessControlEnumerable}.

Roles are referred to by their `bytes32` identifier. These should be exposed
in the external API and be unique. The best way to achieve this is by
using `public constant` hash digests:

```
bytes32 public constant MY_ROLE = keccak256("MY_ROLE");
```

Roles can be used to represent a set of permissions. To restrict access to a
function call, use {hasRole}:

```
function foo() public {
    require(hasRole(MY_ROLE, msg.sender));
    ...
}
```

Roles can be granted and revoked dynamically via the {grantRole} and
{revokeRole} functions. Each role has an associated admin role, and only
accounts that have a role's admin role can call {grantRole} and {revokeRole}.

By default, the admin role for all roles is `DEFAULT_ADMIN_ROLE`, which means
that only accounts with this role will be able to grant or revoke other
roles. More complex role relationships can be created by using
{_setRoleAdmin}.

WARNING: The `DEFAULT_ADMIN_ROLE` is also its own admin: it has permission to
grant and revoke this role. Extra precautions should be taken to secure
accounts that have been granted it._

### RoleData

```solidity
struct RoleData {
  mapping(address => bool) members;
  bytes32 adminRole;
}
```

### _roles

```solidity
mapping(bytes32 => struct AccessControl.RoleData) _roles
```

### DEFAULT_ADMIN_ROLE

```solidity
bytes32 DEFAULT_ADMIN_ROLE
```

### onlyRole

```solidity
modifier onlyRole(bytes32 role)
```

_Modifier that checks that an account has a specific role. Reverts
with a standardized message including the required role.

The format of the revert reason is given by the following regular expression:

 /^AccessControl: account (0x[0-9a-f]{40}) is missing role (0x[0-9a-f]{64})$/

_Available since v4.1.__

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) public view virtual returns (bool)
```

_See {IERC165-supportsInterface}._

### hasRole

```solidity
function hasRole(bytes32 role, address account) public view virtual returns (bool)
```

_Returns `true` if `account` has been granted `role`._

### _checkRole

```solidity
function _checkRole(bytes32 role) internal view virtual
```

_Revert with a standard message if `_msgSender()` is missing `role`.
Overriding this function changes the behavior of the {onlyRole} modifier.

Format of the revert message is described in {_checkRole}.

_Available since v4.6.__

### _checkRole

```solidity
function _checkRole(bytes32 role, address account) internal view virtual
```

_Revert with a standard message if `account` is missing `role`.

The format of the revert reason is given by the following regular expression:

 /^AccessControl: account (0x[0-9a-f]{40}) is missing role (0x[0-9a-f]{64})$/_

### getRoleAdmin

```solidity
function getRoleAdmin(bytes32 role) public view virtual returns (bytes32)
```

_Returns the admin role that controls `role`. See {grantRole} and
{revokeRole}.

To change a role's admin, use {_setRoleAdmin}._

### grantRole

```solidity
function grantRole(bytes32 role, address account) public virtual
```

_Grants `role` to `account`.

If `account` had not been already granted `role`, emits a {RoleGranted}
event.

Requirements:

- the caller must have ``role``'s admin role.

May emit a {RoleGranted} event._

### revokeRole

```solidity
function revokeRole(bytes32 role, address account) public virtual
```

_Revokes `role` from `account`.

If `account` had been granted `role`, emits a {RoleRevoked} event.

Requirements:

- the caller must have ``role``'s admin role.

May emit a {RoleRevoked} event._

### renounceRole

```solidity
function renounceRole(bytes32 role, address account) public virtual
```

_Revokes `role` from the calling account.

Roles are often managed via {grantRole} and {revokeRole}: this function's
purpose is to provide a mechanism for accounts to lose their privileges
if they are compromised (such as when a trusted device is misplaced).

If the calling account had been revoked `role`, emits a {RoleRevoked}
event.

Requirements:

- the caller must be `account`.

May emit a {RoleRevoked} event._

### _setupRole

```solidity
function _setupRole(bytes32 role, address account) internal virtual
```

_Grants `role` to `account`.

If `account` had not been already granted `role`, emits a {RoleGranted}
event. Note that unlike {grantRole}, this function doesn't perform any
checks on the calling account.

May emit a {RoleGranted} event.

[WARNING]
====
This function should only be called from the constructor when setting
up the initial roles for the system.

Using this function in any other way is effectively circumventing the admin
system imposed by {AccessControl}.
====

NOTE: This function is deprecated in favor of {_grantRole}._

### _setRoleAdmin

```solidity
function _setRoleAdmin(bytes32 role, bytes32 adminRole) internal virtual
```

_Sets `adminRole` as ``role``'s admin role.

Emits a {RoleAdminChanged} event._

### _grantRole

```solidity
function _grantRole(bytes32 role, address account) internal virtual
```

_Grants `role` to `account`.

Internal function without access restriction.

May emit a {RoleGranted} event._

### _revokeRole

```solidity
function _revokeRole(bytes32 role, address account) internal virtual
```

_Revokes `role` from `account`.

Internal function without access restriction.

May emit a {RoleRevoked} event._

## AggregatorV3Interface

### decimals

```solidity
function decimals() external view returns (uint8)
```

### description

```solidity
function description() external view returns (string)
```

### version

```solidity
function version() external view returns (uint256)
```

### getRoundData

```solidity
function getRoundData(uint80 _roundId) external view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)
```

### latestRoundData

```solidity
function latestRoundData() external view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)
```

## Blacklistable

### blacklister

```solidity
address blacklister
```

### blacklisted

```solidity
mapping(address => bool) blacklisted
```

### Blacklisted

```solidity
event Blacklisted(address _account)
```

### UnBlacklisted

```solidity
event UnBlacklisted(address _account)
```

### BlacklisterChanged

```solidity
event BlacklisterChanged(address newBlacklister)
```

### onlyBlacklister

```solidity
modifier onlyBlacklister()
```

_Throws if called by any account other than the blacklister_

### notBlacklisted

```solidity
modifier notBlacklisted(address _account)
```

_Throws if argument account is blacklisted_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _account | address | The address to check |

### isBlacklisted

```solidity
function isBlacklisted(address _account) public view returns (bool)
```

_Checks if account is blacklisted_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _account | address | The address to check |

### blacklist

```solidity
function blacklist(address _account) public
```

_Adds account to blacklist_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _account | address | The address to blacklist |

### unBlacklist

```solidity
function unBlacklist(address _account) public
```

_Removes account from blacklist_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _account | address | The address to remove from the blacklist |

### updateBlacklister

```solidity
function updateBlacklister(address _newBlacklister) public
```

## Context

_Provides information about the current execution context, including the
sender of the transaction and its data. While these are generally available
via msg.sender and msg.data, they should not be accessed in such a direct
manner, since when dealing with meta-transactions the account sending and
paying for execution may not be the actual sender (as far as an application
is concerned).

This contract is only required for intermediate, library-like contracts._

### _msgSender

```solidity
function _msgSender() internal view virtual returns (address)
```

### _msgData

```solidity
function _msgData() internal view virtual returns (bytes)
```

## ERC165

_Implementation of the {IERC165} interface.

Contracts that want to implement ERC165 should inherit from this contract and override {supportsInterface} to check
for the additional interface id that will be supported. For example:

```solidity
function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
    return interfaceId == type(MyInterface).interfaceId || super.supportsInterface(interfaceId);
}
```

Alternatively, {ERC165Storage} provides an easier to use but more expensive implementation._

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) public view virtual returns (bool)
```

_See {IERC165-supportsInterface}._

## ERC20

_Implementation of the {IERC20} interface.

This implementation is agnostic to the way tokens are created. This means
that a supply mechanism has to be added in a derived contract using {_mint}.
For a generic mechanism see {ERC20PresetMinterPauser}.

TIP: For a detailed writeup see our guide
https://forum.openzeppelin.com/t/how-to-implement-erc20-supply-mechanisms/226[How
to implement supply mechanisms].

We have followed general OpenZeppelin Contracts guidelines: functions revert
instead returning `false` on failure. This behavior is nonetheless
conventional and does not conflict with the expectations of ERC20
applications.

Additionally, an {Approval} event is emitted on calls to {transferFrom}.
This allows applications to reconstruct the allowance for all accounts just
by listening to said events. Other implementations of the EIP may not emit
these events, as it isn't required by the specification.

Finally, the non-standard {decreaseAllowance} and {increaseAllowance}
functions have been added to mitigate the well-known issues around setting
allowances. See {IERC20-approve}._

### _balances

```solidity
mapping(address => uint256) _balances
```

### _allowances

```solidity
mapping(address => mapping(address => uint256)) _allowances
```

### _totalSupply

```solidity
uint256 _totalSupply
```

### _name

```solidity
string _name
```

### _symbol

```solidity
string _symbol
```

### constructor

```solidity
constructor(string name_, string symbol_) public
```

_Sets the values for {name} and {symbol}.

The default value of {decimals} is 18. To select a different value for
{decimals} you should overload it.

All two of these values are immutable: they can only be set once during
construction._

### name

```solidity
function name() public view virtual returns (string)
```

_Returns the name of the token._

### symbol

```solidity
function symbol() public view virtual returns (string)
```

_Returns the symbol of the token, usually a shorter version of the
name._

### decimals

```solidity
function decimals() public view virtual returns (uint8)
```

_Returns the number of decimals used to get its user representation.
For example, if `decimals` equals `2`, a balance of `505` tokens should
be displayed to a user as `5.05` (`505 / 10 ** 2`).

Tokens usually opt for a value of 18, imitating the relationship between
Ether and Wei. This is the value {ERC20} uses, unless this function is
overridden;

NOTE: This information is only used for _display_ purposes: it in
no way affects any of the arithmetic of the contract, including
{IERC20-balanceOf} and {IERC20-transfer}._

### totalSupply

```solidity
function totalSupply() public view virtual returns (uint256)
```

_See {IERC20-totalSupply}._

### balanceOf

```solidity
function balanceOf(address account) public view virtual returns (uint256)
```

_See {IERC20-balanceOf}._

### transfer

```solidity
function transfer(address to, uint256 amount) public virtual returns (bool)
```

_See {IERC20-transfer}.

Requirements:

- `to` cannot be the zero address.
- the caller must have a balance of at least `amount`._

### allowance

```solidity
function allowance(address owner, address spender) public view virtual returns (uint256)
```

_See {IERC20-allowance}._

### approve

```solidity
function approve(address spender, uint256 amount) public virtual returns (bool)
```

_See {IERC20-approve}.

NOTE: If `amount` is the maximum `uint256`, the allowance is not updated on
`transferFrom`. This is semantically equivalent to an infinite approval.

Requirements:

- `spender` cannot be the zero address._

### transferFrom

```solidity
function transferFrom(address from, address to, uint256 amount) public virtual returns (bool)
```

_See {IERC20-transferFrom}.

Emits an {Approval} event indicating the updated allowance. This is not
required by the EIP. See the note at the beginning of {ERC20}.

NOTE: Does not update the allowance if the current allowance
is the maximum `uint256`.

Requirements:

- `from` and `to` cannot be the zero address.
- `from` must have a balance of at least `amount`.
- the caller must have allowance for ``from``'s tokens of at least
`amount`._

### increaseAllowance

```solidity
function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool)
```

_Atomically increases the allowance granted to `spender` by the caller.

This is an alternative to {approve} that can be used as a mitigation for
problems described in {IERC20-approve}.

Emits an {Approval} event indicating the updated allowance.

Requirements:

- `spender` cannot be the zero address._

### decreaseAllowance

```solidity
function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool)
```

_Atomically decreases the allowance granted to `spender` by the caller.

This is an alternative to {approve} that can be used as a mitigation for
problems described in {IERC20-approve}.

Emits an {Approval} event indicating the updated allowance.

Requirements:

- `spender` cannot be the zero address.
- `spender` must have allowance for the caller of at least
`subtractedValue`._

### _transfer

```solidity
function _transfer(address from, address to, uint256 amount) internal virtual
```

_Moves `amount` of tokens from `from` to `to`.

This internal function is equivalent to {transfer}, and can be used to
e.g. implement automatic token fees, slashing mechanisms, etc.

Emits a {Transfer} event.

Requirements:

- `from` cannot be the zero address.
- `to` cannot be the zero address.
- `from` must have a balance of at least `amount`._

### _mint

```solidity
function _mint(address account, uint256 amount) internal virtual
```

_Creates `amount` tokens and assigns them to `account`, increasing
the total supply.

Emits a {Transfer} event with `from` set to the zero address.

Requirements:

- `account` cannot be the zero address._

### _burn

```solidity
function _burn(address account, uint256 amount) internal virtual
```

_Destroys `amount` tokens from `account`, reducing the
total supply.

Emits a {Transfer} event with `to` set to the zero address.

Requirements:

- `account` cannot be the zero address.
- `account` must have at least `amount` tokens._

### _approve

```solidity
function _approve(address owner, address spender, uint256 amount) internal virtual
```

_Sets `amount` as the allowance of `spender` over the `owner` s tokens.

This internal function is equivalent to `approve`, and can be used to
e.g. set automatic allowances for certain subsystems, etc.

Emits an {Approval} event.

Requirements:

- `owner` cannot be the zero address.
- `spender` cannot be the zero address._

### _spendAllowance

```solidity
function _spendAllowance(address owner, address spender, uint256 amount) internal virtual
```

_Updates `owner` s allowance for `spender` based on spent `amount`.

Does not update the allowance amount in case of infinite allowance.
Revert if not enough allowance is available.

Might emit an {Approval} event._

### _beforeTokenTransfer

```solidity
function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual
```

_Hook that is called before any transfer of tokens. This includes
minting and burning.

Calling conditions:

- when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
will be transferred to `to`.
- when `from` is zero, `amount` tokens will be minted for `to`.
- when `to` is zero, `amount` of ``from``'s tokens will be burned.
- `from` and `to` are never both zero.

To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks]._

### _afterTokenTransfer

```solidity
function _afterTokenTransfer(address from, address to, uint256 amount) internal virtual
```

_Hook that is called after any transfer of tokens. This includes
minting and burning.

Calling conditions:

- when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
has been transferred to `to`.
- when `from` is zero, `amount` tokens have been minted for `to`.
- when `to` is zero, `amount` of ``from``'s tokens have been burned.
- `from` and `to` are never both zero.

To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks]._

## FuseG

### _totalValue

```solidity
uint256 _totalValue
```

### taxRate

```solidity
uint256 taxRate
```

### taxAddress

```solidity
address taxAddress
```

### feeAddress

```solidity
address feeAddress
```

### treasuryAddress

```solidity
address treasuryAddress
```

### threeRoleAddress

```solidity
address threeRoleAddress
```

### fourRoleAddress

```solidity
address fourRoleAddress
```

### rewardVaultAddress

```solidity
address rewardVaultAddress
```

### taxRatePower

```solidity
uint256 taxRatePower
```

### _totalBurnt

```solidity
uint256 _totalBurnt
```

### adminLimit

```solidity
uint256 adminLimit
```

### THREE_ROLE

```solidity
bytes32 THREE_ROLE
```

### FOUR_ROLE

```solidity
bytes32 FOUR_ROLE
```

### SUPER_ADMIN

```solidity
bytes32 SUPER_ADMIN
```

### MERCHANT

```solidity
bytes32 MERCHANT
```

### Members

```solidity
mapping(address => bytes32) Members
```

### DexList

```solidity
mapping(address => bool) DexList
```

### taxList

```solidity
mapping(address => uint256) taxList
```

### priceFeedCommon

```solidity
contract AggregatorV3Interface priceFeedCommon
```

### GoldBought

```solidity
event GoldBought(address client, uint256 amount, int256 goldPrice, uint256 timestamp)
```

### GoldWithdrawn

```solidity
event GoldWithdrawn(address client, uint256 amount, int256 goldPrice, uint256 timestamp)
```

### NewMerchantEvent

```solidity
event NewMerchantEvent(address user, uint256 timestamp)
```

### NewSuperAdminEvent

```solidity
event NewSuperAdminEvent(address user, uint256 timestamp)
```

### MerchantRemoved

```solidity
event MerchantRemoved(address user, uint256 timestamp)
```

### SuperAdmin_Removed

```solidity
event SuperAdmin_Removed(address user, uint256 timestamp)
```

### UpdatedMultiSigWallets

```solidity
event UpdatedMultiSigWallets(address threeWallet, address fourWallet)
```

### TaxRateUpdated

```solidity
event TaxRateUpdated(uint256 rate)
```

### TaxWalletUpdated

```solidity
event TaxWalletUpdated(address wallet)
```

### FeeWalletUpdated

```solidity
event FeeWalletUpdated(address wallet)
```

### TreasuryWalletUpdated

```solidity
event TreasuryWalletUpdated(address wallet)
```

### AddedToTaxList

```solidity
event AddedToTaxList(address wallet, uint256 taxAmount)
```

### RemovedFromTaxList

```solidity
event RemovedFromTaxList(address wallet)
```

### PerformedTax

```solidity
event PerformedTax(address wallet, uint256 taxAmount)
```

### checkClientBalance

```solidity
modifier checkClientBalance(address client, uint256 amount)
```

### onlyHighUser

```solidity
modifier onlyHighUser(address user)
```

### onlyHigherUser

```solidity
modifier onlyHigherUser(address user)
```

### constructor

```solidity
constructor(address _threeWallet, address _fourWallet, address _taxWallet, address _feeWallet, address _treasuryWallet, address _rewardVault) public
```

Fuse Gold token contstructor

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _threeWallet | address | Multi sig wallet address with three signers |
| _fourWallet | address | Multi sig wallet address with four signers |
| _taxWallet | address | Wallet used to receive tax |
| _feeWallet | address | Wallet used to receive fees |
| _treasuryWallet | address | Treasury wallet address |
| _rewardVault | address |  |

### setTaxRate

```solidity
function setTaxRate(uint256 rate) external
```

3 Signer multisig function that sets tax rate, if set to 0 effectively disables tax

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| rate | uint256 | New tax rate (100 = 1%, 1 = 0.01% etc) |

### setTaxWallet

```solidity
function setTaxWallet(address wallet) external
```

4 Signer multisig function that updates tax wallet address

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| wallet | address | New tax wallet address |

### setFeeWallet

```solidity
function setFeeWallet(address wallet) external
```

4 Signer multisig function that updates fee wallet address

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| wallet | address | New fee wallet address |

### setTreasuryWallet

```solidity
function setTreasuryWallet(address wallet) external
```

4 Signer multisig function that updates treasury wallet address

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| wallet | address | New treasury wallet address |

### addDexAddress

```solidity
function addDexAddress(address dexContract) external
```

Adds a new dex contract to the list

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| dexContract | address | Contract address of dex pair |

### removeDexAddress

```solidity
function removeDexAddress(address dexContract) external
```

Removes specified dex contract address to the list

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| dexContract | address | Contract address of dex to remove |

### addToTaxList

```solidity
function addToTaxList(address wallet, uint256 taxAmount) external
```

Adds wallet and tax amount to tax list, also can update amount for specific wallet

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| wallet | address | New wallet to add to list |
| taxAmount | uint256 | Tax rate for new wallet (100 = 1%, 1 = 0.01% etc) |

### removeFromTaxList

```solidity
function removeFromTaxList(address wallet) external
```

Deletes wallet address from tax list

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| wallet | address | Wallet to be removed |

### isSpecificTax

```solidity
function isSpecificTax(address wallet) public view returns (bool)
```

Returns true if specified wallet is in tax list

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| wallet | address | Wallet to check if currently is in list |

### transfer

```solidity
function transfer(address to, uint256 amount) public returns (bool)
```

Overriden ERC20 transfer function with added pause and blacklist

### buyTokens

```solidity
function buyTokens(address clientAddress, uint256 clientAmount, uint256 feeAmount, address refAddress, uint256 refAmount) public
```

Buy function for fuse gold, values will be calculated and passed to this function
via the online platform. Calls GoldX RewardVault contract to mineGoldX tokens

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| clientAddress | address | Client wallet address the tokens are to be sent to |
| clientAmount | uint256 | Amount of tokens to send to the Client Address from the Sender wallet address |
| feeAmount | uint256 | Amount of tokens to be sent to the Fee wallet address from the Sender wallet address |
| refAddress | address | Referral wallet address the tokens are to be sent to for the referral rate |
| refAmount | uint256 | Amount of tokens to be sent to the Referral wallet address from the Sender wallet address |

### mintTokens

```solidity
function mintTokens(address wallet, uint256 amount) public returns (bool)
```

Allows owner to mint tokens to specified wallet

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| wallet | address | Wallet to mint tokens to |
| amount | uint256 | Amount of tokens to mint |

### sellTokens

```solidity
function sellTokens(address sender, uint256 amount, uint256 feeAmount) public
```

Fuse gold sell function, fees will be calculated via the fuse gold platform
calls GoldX RewardVault contract to mineGoldX tokens

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | address | Sender wallet address the tokens are to be sent from (seller) |
| amount | uint256 | Amount of tokens to send to the treasury address from the Sender wallet address |
| feeAmount | uint256 | Amount of tokens to be sent to the Fee wallet address from the Sender wallet address |

### getPrice

```solidity
function getPrice(address account) public returns (int256)
```

Returns the latest price of gold from chainlink

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| account | address | Address of the chainlink aggregator to use: Network: BSC Testnet XAU/USD Address: 0x4E08A779a85d28Cc96515379903A6029487CEbA0 |

### getAdminLimit

```solidity
function getAdminLimit() public view returns (uint256)
```

Returns the current spend limit

### getTotalBurnt

```solidity
function getTotalBurnt() public view returns (uint256)
```

Returns the total amount burned

### verify_level

```solidity
function verify_level(address user) public view returns (uint256)
```

Verification for user permissions

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | Integer spend limit for Merchants, 0 for Super Admin, otherwise returns 1 |

### setAdminLimit

```solidity
function setAdminLimit(uint256 amount) public
```

Sets the spend limit for super admin

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | uint256 | New limit amount |

### newSuperAdmin

```solidity
function newSuperAdmin(address user) public
```

3 Signer multisig function that adds new super admin

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| user | address | New user address to add as a super admin |

### updateMultiSigWallets

```solidity
function updateMultiSigWallets(address threeWallet, address fourWallet) external
```

4 Signer multisig function updates both 3 signer and 4 signer multi sig wallet addresses

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| threeWallet | address | Wallet address used for 3 signer multi sig functions |
| fourWallet | address | Wallet address used for 4 signer multi sig functions |

### removeSuperAdmin

```solidity
function removeSuperAdmin(address user) public
```

3 Signer multisig function that removes super admin

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| user | address | Wallet address to remove super admin role |

### isMerchant

```solidity
function isMerchant(address _account) public view returns (bool)
```

Returns whether specified address has merchant role

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _account | address | Address to check |

### isSuperAdmin

```solidity
function isSuperAdmin(address _account) public view returns (bool)
```

Returns whether specified address has super admin role

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _account | address | Address to check |

### newMerchant

```solidity
function newMerchant(address user) public
```

Adds a new merchant user

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| user | address | Address of user to add |

### removeMerchant

```solidity
function removeMerchant(address user) public
```

Removes merchant user

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| user | address | Address of merchant user to remove |

### pause

```solidity
function pause() public
```

4 Signer multisig function that pauses contract

### unpause

```solidity
function unpause() public
```

4 Signer multisig function that unpauses contract

### withdrawGold

```solidity
function withdrawGold(address client, uint256 amount, uint256 feeAmount) public
```

Withdraws tokens to physical gold, burning tokens

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| client | address | Sender wallet address the tokens are to be sent from (seller/exchanger) |
| amount | uint256 | Amount of tokens to burn |
| feeAmount | uint256 | Amount of tokens to be sent to the Fee wallet address from the Sender wallet address |

### transferOwnership

```solidity
function transferOwnership(address newOwner) public
```

Override ownable function with 4 Signer multisig that transfers contract owner address

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| newOwner | address | wallet address to transfer to |

### isDex

```solidity
function isDex(address dexContract) internal view returns (bool)
```

### performTax

```solidity
function performTax(uint256 amount, uint256 specificTaxRate) internal
```

## IAccessControl

_External interface of AccessControl declared to support ERC165 detection._

### RoleAdminChanged

```solidity
event RoleAdminChanged(bytes32 role, bytes32 previousAdminRole, bytes32 newAdminRole)
```

_Emitted when `newAdminRole` is set as ``role``'s admin role, replacing `previousAdminRole`

`DEFAULT_ADMIN_ROLE` is the starting admin for all roles, despite
{RoleAdminChanged} not being emitted signaling this.

_Available since v3.1.__

### RoleGranted

```solidity
event RoleGranted(bytes32 role, address account, address sender)
```

_Emitted when `account` is granted `role`.

`sender` is the account that originated the contract call, an admin role
bearer except when using {AccessControl-_setupRole}._

### RoleRevoked

```solidity
event RoleRevoked(bytes32 role, address account, address sender)
```

_Emitted when `account` is revoked `role`.

`sender` is the account that originated the contract call:
  - if using `revokeRole`, it is the admin role bearer
  - if using `renounceRole`, it is the role bearer (i.e. `account`)_

### hasRole

```solidity
function hasRole(bytes32 role, address account) external view returns (bool)
```

_Returns `true` if `account` has been granted `role`._

### getRoleAdmin

```solidity
function getRoleAdmin(bytes32 role) external view returns (bytes32)
```

_Returns the admin role that controls `role`. See {grantRole} and
{revokeRole}.

To change a role's admin, use {AccessControl-_setRoleAdmin}._

### grantRole

```solidity
function grantRole(bytes32 role, address account) external
```

_Grants `role` to `account`.

If `account` had not been already granted `role`, emits a {RoleGranted}
event.

Requirements:

- the caller must have ``role``'s admin role._

### revokeRole

```solidity
function revokeRole(bytes32 role, address account) external
```

_Revokes `role` from `account`.

If `account` had been granted `role`, emits a {RoleRevoked} event.

Requirements:

- the caller must have ``role``'s admin role._

### renounceRole

```solidity
function renounceRole(bytes32 role, address account) external
```

_Revokes `role` from the calling account.

Roles are often managed via {grantRole} and {revokeRole}: this function's
purpose is to provide a mechanism for accounts to lose their privileges
if they are compromised (such as when a trusted device is misplaced).

If the calling account had been granted `role`, emits a {RoleRevoked}
event.

Requirements:

- the caller must be `account`._

## IERC165

_Interface of the ERC165 standard, as defined in the
https://eips.ethereum.org/EIPS/eip-165[EIP].

Implementers can declare support of contract interfaces, which can then be
queried by others ({ERC165Checker}).

For an implementation, see {ERC165}._

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) external view returns (bool)
```

_Returns true if this contract implements the interface defined by
`interfaceId`. See the corresponding
https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[EIP section]
to learn more about how these ids are created.

This function call must use less than 30 000 gas._

## IERC20

_Interface of the ERC20 standard as defined in the EIP._

### Transfer

```solidity
event Transfer(address from, address to, uint256 value)
```

_Emitted when `value` tokens are moved from one account (`from`) to
another (`to`).

Note that `value` may be zero._

### Approval

```solidity
event Approval(address owner, address spender, uint256 value)
```

_Emitted when the allowance of a `spender` for an `owner` is set by
a call to {approve}. `value` is the new allowance._

### totalSupply

```solidity
function totalSupply() external view returns (uint256)
```

_Returns the amount of tokens in existence._

### balanceOf

```solidity
function balanceOf(address account) external view returns (uint256)
```

_Returns the amount of tokens owned by `account`._

### transfer

```solidity
function transfer(address to, uint256 amount) external returns (bool)
```

_Moves `amount` tokens from the caller's account to `to`.

Returns a boolean value indicating whether the operation succeeded.

Emits a {Transfer} event._

### allowance

```solidity
function allowance(address owner, address spender) external view returns (uint256)
```

_Returns the remaining number of tokens that `spender` will be
allowed to spend on behalf of `owner` through {transferFrom}. This is
zero by default.

This value changes when {approve} or {transferFrom} are called._

### approve

```solidity
function approve(address spender, uint256 amount) external returns (bool)
```

_Sets `amount` as the allowance of `spender` over the caller's tokens.

Returns a boolean value indicating whether the operation succeeded.

IMPORTANT: Beware that changing an allowance with this method brings the risk
that someone may use both the old and the new allowance by unfortunate
transaction ordering. One possible solution to mitigate this race
condition is to first reduce the spender's allowance to 0 and set the
desired value afterwards:
https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729

Emits an {Approval} event._

### transferFrom

```solidity
function transferFrom(address from, address to, uint256 amount) external returns (bool)
```

_Moves `amount` tokens from `from` to `to` using the
allowance mechanism. `amount` is then deducted from the caller's
allowance.

Returns a boolean value indicating whether the operation succeeded.

Emits a {Transfer} event._

## IERC20Metadata

_Interface for the optional metadata functions from the ERC20 standard.

_Available since v4.1.__

### name

```solidity
function name() external view returns (string)
```

_Returns the name of the token._

### symbol

```solidity
function symbol() external view returns (string)
```

_Returns the symbol of the token._

### decimals

```solidity
function decimals() external view returns (uint8)
```

_Returns the decimals places of the token._

## IRewardVault

### NewRound

```solidity
event NewRound(uint256 roundSupply, uint256 phaseSupply, uint8 phaseCount)
```

event indicating set of the new round

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| roundSupply | uint256 | GoldX amount in one round |
| phaseSupply | uint256 | GoldX amount in one phase |
| phaseCount | uint8 | amount of phases |

### Mine

```solidity
event Mine(address miner, uint256 goldXAmount)
```

indicates GoldX mining via FuseG transfer

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| miner | address | GoldX receiver |
| goldXAmount | uint256 | GoldX amount |

### RewardVaultDepleted

```solidity
event RewardVaultDepleted()
```

indicates that reward vault is out of GoldX, all phases are finished

### mineGoldX

```solidity
function mineGoldX(address sender, uint256 fuseGAmount) external
```

### setNewRound

```solidity
function setNewRound(uint256 _phaseSupply, uint8 _phaseCount, uint256[] _coeffs) external
```

### changeOwner

```solidity
function changeOwner(address newOwner) external
```

## Math

_Standard math utilities missing in the Solidity language._

### Rounding

```solidity
enum Rounding {
  Down,
  Up,
  Zero
}
```

### max

```solidity
function max(uint256 a, uint256 b) internal pure returns (uint256)
```

_Returns the largest of two numbers._

### min

```solidity
function min(uint256 a, uint256 b) internal pure returns (uint256)
```

_Returns the smallest of two numbers._

### average

```solidity
function average(uint256 a, uint256 b) internal pure returns (uint256)
```

_Returns the average of two numbers. The result is rounded towards
zero._

### ceilDiv

```solidity
function ceilDiv(uint256 a, uint256 b) internal pure returns (uint256)
```

_Returns the ceiling of the division of two numbers.

This differs from standard division with `/` in that it rounds up instead
of rounding down._

### mulDiv

```solidity
function mulDiv(uint256 x, uint256 y, uint256 denominator) internal pure returns (uint256 result)
```

Calculates floor(x * y / denominator) with full precision. Throws if result overflows a uint256 or denominator == 0

_Original credit to Remco Bloemen under MIT license (https://xn--2-umb.com/21/muldiv)
with further edits by Uniswap Labs also under MIT license._

### mulDiv

```solidity
function mulDiv(uint256 x, uint256 y, uint256 denominator, enum Math.Rounding rounding) internal pure returns (uint256)
```

Calculates x * y / denominator with full precision, following the selected rounding direction.

### sqrt

```solidity
function sqrt(uint256 a) internal pure returns (uint256)
```

_Returns the square root of a number. If the number is not a perfect square, the value is rounded down.

Inspired by Henry S. Warren, Jr.'s "Hacker's Delight" (Chapter 11)._

### sqrt

```solidity
function sqrt(uint256 a, enum Math.Rounding rounding) internal pure returns (uint256)
```

Calculates sqrt(a), following the selected rounding direction.

### log2

```solidity
function log2(uint256 value) internal pure returns (uint256)
```

_Return the log in base 2, rounded down, of a positive value.
Returns 0 if given 0._

### log2

```solidity
function log2(uint256 value, enum Math.Rounding rounding) internal pure returns (uint256)
```

_Return the log in base 2, following the selected rounding direction, of a positive value.
Returns 0 if given 0._

### log10

```solidity
function log10(uint256 value) internal pure returns (uint256)
```

_Return the log in base 10, rounded down, of a positive value.
Returns 0 if given 0._

### log10

```solidity
function log10(uint256 value, enum Math.Rounding rounding) internal pure returns (uint256)
```

_Return the log in base 10, following the selected rounding direction, of a positive value.
Returns 0 if given 0._

### log256

```solidity
function log256(uint256 value) internal pure returns (uint256)
```

_Return the log in base 256, rounded down, of a positive value.
Returns 0 if given 0.

Adding one to the result gives the number of pairs of hex symbols needed to represent `value` as a hex string._

### log256

```solidity
function log256(uint256 value, enum Math.Rounding rounding) internal pure returns (uint256)
```

_Return the log in base 10, following the selected rounding direction, of a positive value.
Returns 0 if given 0._

## Ownable

_Contract module which provides a basic access control mechanism, where
there is an account (an owner) that can be granted exclusive access to
specific functions.

By default, the owner account will be the one that deploys the contract. This
can later be changed with {transferOwnership}.

This module is used through inheritance. It will make available the modifier
`onlyOwner`, which can be applied to your functions to restrict their use to
the owner._

### _owner

```solidity
address _owner
```

### OwnershipTransferred

```solidity
event OwnershipTransferred(address previousOwner, address newOwner)
```

### constructor

```solidity
constructor() internal
```

_Initializes the contract setting the deployer as the initial owner._

### onlyOwner

```solidity
modifier onlyOwner()
```

_Throws if called by any account other than the owner._

### owner

```solidity
function owner() public view virtual returns (address)
```

_Returns the address of the current owner._

### _checkOwner

```solidity
function _checkOwner() internal view virtual
```

_Throws if the sender is not the owner._

### renounceOwnership

```solidity
function renounceOwnership() public virtual
```

_Leaves the contract without owner. It will not be possible to call
`onlyOwner` functions anymore. Can only be called by the current owner.

NOTE: Renouncing ownership will leave the contract without an owner,
thereby removing any functionality that is only available to the owner._

### transferOwnership

```solidity
function transferOwnership(address newOwner) public virtual
```

_Transfers ownership of the contract to a new account (`newOwner`).
Can only be called by the current owner._

### _transferOwnership

```solidity
function _transferOwnership(address newOwner) internal virtual
```

_Transfers ownership of the contract to a new account (`newOwner`).
Internal function without access restriction._

## Pausable

_Contract module which allows children to implement an emergency stop
mechanism that can be triggered by an authorized account.

This module is used through inheritance. It will make available the
modifiers `whenNotPaused` and `whenPaused`, which can be applied to
the functions of your contract. Note that they will not be pausable by
simply including this module, only once the modifiers are put in place._

### Paused

```solidity
event Paused(address account)
```

_Emitted when the pause is triggered by `account`._

### Unpaused

```solidity
event Unpaused(address account)
```

_Emitted when the pause is lifted by `account`._

### _paused

```solidity
bool _paused
```

### constructor

```solidity
constructor() internal
```

_Initializes the contract in unpaused state._

### whenNotPaused

```solidity
modifier whenNotPaused()
```

_Modifier to make a function callable only when the contract is not paused.

Requirements:

- The contract must not be paused._

### whenPaused

```solidity
modifier whenPaused()
```

_Modifier to make a function callable only when the contract is paused.

Requirements:

- The contract must be paused._

### paused

```solidity
function paused() public view virtual returns (bool)
```

_Returns true if the contract is paused, and false otherwise._

### _requireNotPaused

```solidity
function _requireNotPaused() internal view virtual
```

_Throws if the contract is paused._

### _requirePaused

```solidity
function _requirePaused() internal view virtual
```

_Throws if the contract is not paused._

### _pause

```solidity
function _pause() internal virtual
```

_Triggers stopped state.

Requirements:

- The contract must not be paused._

### _unpause

```solidity
function _unpause() internal virtual
```

_Returns to normal state.

Requirements:

- The contract must be paused._

## Strings

_String operations._

### _SYMBOLS

```solidity
bytes16 _SYMBOLS
```

### _ADDRESS_LENGTH

```solidity
uint8 _ADDRESS_LENGTH
```

### toString

```solidity
function toString(uint256 value) internal pure returns (string)
```

_Converts a `uint256` to its ASCII `string` decimal representation._

### toHexString

```solidity
function toHexString(uint256 value) internal pure returns (string)
```

_Converts a `uint256` to its ASCII `string` hexadecimal representation._

### toHexString

```solidity
function toHexString(uint256 value, uint256 length) internal pure returns (string)
```

_Converts a `uint256` to its ASCII `string` hexadecimal representation with fixed length._

### toHexString

```solidity
function toHexString(address addr) internal pure returns (string)
```

_Converts an `address` with fixed length of 20 bytes to its not checksummed ASCII `string` hexadecimal representation._

