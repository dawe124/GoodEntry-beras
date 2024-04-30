//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "../interfaces/ITokenAction.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";



/// @notice Send a share of tokens to an AMM
/// @dev Bera ERC20 DEX	0x0D5862FDBDD12490F9B4DE54C236CFF63B038074
contract DepositOptionsVault is ITokenAction {
  address public optionsController;
  
  constructor (address _optionsController){
    require(_optionsController != address(0), "Invalid address");
    optionsController = _optionsController;
  }

  /// @notice Main action is to deposit 
  function doSomething(address baseToken, uint baseAmount, address quoteToken, uint quoteAmount) public {
    // TODO
  }
}