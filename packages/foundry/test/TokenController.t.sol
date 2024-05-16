// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import "forge-std/Test.sol";
import "../contracts/TokenController.sol";

contract TokenController_Test is Test {
  TokenController public tokenController;

  
  fallback() external payable {}
  receive() external payable {}


  function setUp() public {
    tokenController = new TokenController();
  }
  
  
  function test_Creation_NoBuy() public {
    string memory name = "Las Beras";
    assertEq(tokenController.getTokensLength(), 0);
    (address token, ) = tokenController.createToken(name, name, '{"img":"QmPjxUWe9X8fpZWtr3YaWvb4x5iEBw3MBVXv46CWJCumVM","desc":"Dummy desc"}');
    assertEq(tokenController.getTokensLength(), 1);
    assertEq(ERC20(token).name(), name);
    assertEq(ERC20(token).symbol(), name);
    
    address[] memory lt = tokenController.getLastTokens();
    assertEq(lt.length, 1);
    assertEq(lt[0], token);
    
    vm.expectRevert("Create: Already registered");
    tokenController.createToken(name, name, '{"img":"QmPjxUWe9X8fpZWtr3YaWvb4x5iEBw3MBVXv46CWJCumVM","desc":"Dummy desc"}');
  }
  
  
  function testfuzz_DepositJackpot(uint amount) public {
    vm.assume(amount < 1e10 ether);
    tokenController.depositJackpot{value: amount}();
    assertEq(tokenController.dailyJackpot(tokenController.today()+1), amount);
  }
  
  
  //////////////// SETTERS
  
  function test_setTradingFee() public {
    vm.expectRevert("Trading fee too high");
    tokenController.setTradingFees(220, 80);
    vm.expectRevert("Trading fee too high");
    tokenController.setTradingFees(80, 270);
    
    tokenController.setTradingFees(80, 50);
    assertEq(tokenController.tradingFee(), 80);
    assertEq(tokenController.treasuryFee(), 50);
  }
  
  function test_setTreasury() public {
    vm.expectRevert("Invalid treasury");
    tokenController.setTreasury(address(0));
    tokenController.setTreasury(address(123));
    assertEq(tokenController.treasury(), address(123));
  }
  
  function test_setSlope() public {
    vm.expectRevert("Invalid slope");
    tokenController.setSlope(1e17);
    tokenController.setSlope(1e20);
    assertEq(tokenController.slope(), 1e20);
  }
  
  function test_setMcapToAmm() public {
    vm.expectRevert("Invalid Mcap");
    tokenController.setMcapToAmm(10e18);
    vm.expectRevert("Invalid Mcap");
    tokenController.setMcapToAmm(100_000_000e18);
    
    tokenController.setMcapToAmm(100_000e18);
    assertEq(tokenController.mcapToAmm(), 100_000e18);
    
  }
}
