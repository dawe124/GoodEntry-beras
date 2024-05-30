// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import "forge-std/Test.sol";
import "../contracts/TokenController.sol";

contract Eject_Test is Test {
  TokenController public tokenController;
  
  // Arbitrum Camelot v2 router
  address public constant ammRouter = 0xc873fEcbd354f5A56E00E710B90EF4201db2448d;
  address public token;
  
  fallback() external payable {}
  receive() external payable {}
  
  function setUp() public {
    tokenController = new TokenController(ammRouter);
    string memory name = "MyToken";
    (token, ) = tokenController.createToken(name, name, '{"img":"QmPjxUWe9X8fpZWtr3YaWvb4x5iEBw3MBVXv46CWJCumVM","desc":"Dummy desc"}');
  }
  
  function test_Eject() public {
    tokenController.buy{value: 50e18}(token, 0);
    vm.expectRevert("Insufficient Mcap");
    tokenController.ejectToAmm(token);
    
    tokenController.buy{value: 50_000e18}(token, 0);
    
    tokenController.ejectToAmm(token);
    tokenController.getBuyAmount(token, 1e9);

    assertEq(ERC20(token).balanceOf(address(tokenController)) /1e18, 0);
    
    vm.expectRevert("Swap: Cannot buy this token");
    tokenController.buy{value: 50e18}(token, 0);
    
    vm.expectRevert("Swap: Cannot sell this token");
    tokenController.sell(token, 1e18);
    
  }

}
