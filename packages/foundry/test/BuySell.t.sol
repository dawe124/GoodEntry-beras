// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import "forge-std/Test.sol";
import "../contracts/TokenController.sol";

contract BuySell_Test is Test {
  TokenController public tokenController;
  
  // Arbitrum Camelot v2 router
  address public constant ammRouter = 0xc873fEcbd354f5A56E00E710B90EF4201db2448d;
  address public token;
  
  fallback() external payable {}
  receive() external payable {}
  
  function setUp() public {
    tokenController = new TokenController(ammRouter);
    string memory name = "Las Beras";
    (token, ) = tokenController.createToken(name, name, '{"img":"QmPjxUWe9X8fpZWtr3YaWvb4x5iEBw3MBVXv46CWJCumVM","desc":"Dummy desc"}');
  }


  function test_BuyOnCreate() public {
    string memory name = "test";
    (, uint bought) = tokenController.createToken{value: 1e18}(name, name, '{"img":"QmPjxUWe9X8fpZWtr3YaWvb4x5iEBw3MBVXv46CWJCumVM","desc":"Dummy desc"}');
    assertGt(bought, 0);
  }

  function test_BuyOnCreateMore() public {
    string memory name = "test";
    (, uint bought) = tokenController.createToken{value: 100e18}(name, name, '{"img":"QmPjxUWe9X8fpZWtr3YaWvb4x5iEBw3MBVXv46CWJCumVM","desc":"Dummy desc"}');
    assertGt(bought, 0);
    console.log("Total bought", bought);
  }
  
  function test_BuySell() public {
    vm.expectRevert("Swap: Invalid buy amount");
    tokenController.buy{value: 0}(token, 0);
    
    // revert bc of slippage bc we ignore the tx fee that will reduce output
    uint expectAmount = tokenController.getBuyAmount(token, 1e18);
    vm.expectRevert("Swap: Excessive slippage");
    tokenController.buy{value: 1e18}(token, expectAmount);
    
    uint bought = tokenController.buy{value: 1e18}(token, 0);
    assertGt(bought, 0);
    // balance should be 1e18 - 1e15 fee
    assertEq(address(tokenController).balance, 1e18 - 1e15);
    
    // check balances
    (uint b, ) = tokenController.balances(token);
    assertEq(ERC20(token).balanceOf(address(this)) + b, tokenController.TOTAL_SUPPLY());
    
    // sale should return a bit less than the current controller balance
    //(99.9% with default fee of 0.1% to treasury (trading fee stays in jackpots))
    // there is a small difference bc of the missing funds on token creation
    assertApproxEqAbs(tokenController.getAmountSale(token, bought), address(tokenController).balance * 999 / 1000, 1e12);
    
    vm.expectRevert("ERC20: insufficient allowance");
    tokenController.sell(token, bought / 2);
    ERC20(token).approve(address(tokenController), type(uint).max);
    uint sold = tokenController.sell(token, bought / 2);
    console.log("sold, ", sold);
  }
  

  function testfuzz_JackpotSwapFees(uint amount) public {
    vm.assume(amount < 1e10 ether && amount > 0);
    tokenController.buy{value: amount}(token, 0);
    uint fees = amount / 1000;
    assertEq(tokenController.hourlyJackpot(tokenController.hhour()), fees / 2);
    assertEq(tokenController.dailyJackpot(tokenController.today()), fees - fees / 2);
  }
  
  
  function test_Mcap() public {
    console.log("Mcap0", tokenController.getMcap(token));
    tokenController.buy{value: 100e18}(token, 0);
    console.log("Mcap1", tokenController.getMcap(token));
    tokenController.buy{value: 1000e18}(token, 0);
    console.log("Mcap2", tokenController.getMcap(token));
    tokenController.buy{value: 10000e18}(token, 0);
    console.log("Mcap3", tokenController.getMcap(token));
    tokenController.buy{value: 100000e18}(token, 0);
    console.log("Mcap4", tokenController.getMcap(token));
  }
  
  function test_Prices() public {
    tokenController.buy{value: 1e18}(token, 0);
    console.log("price 1", tokenController.getPrice(token));
    tokenController.buy{value: 10e18}(token, 0);
    console.log("price 10", tokenController.getPrice(token));
    tokenController.buy{value: 100e18}(token, 0);
    console.log("price 100", tokenController.getPrice(token));
    tokenController.buy{value: 1000e18}(token, 0);
    console.log("price 1000", tokenController.getPrice(token));
    tokenController.buy{value: 10000e18}(token, 0);
    console.log("price 10000", tokenController.getPrice(token));
    tokenController.buy{value: 100000e18}(token, 0);
    console.log("price 100000", tokenController.getPrice(token));
  }  
  
  function test_ManyBuys() public {
    tokenController.buy{value: 1e18}(token, 0);
    tokenController.buy{value: 10e18}(token, 0);
    tokenController.buy{value: 100e18}(token, 0);
    tokenController.buy{value: 1000e18}(token, 0);
    tokenController.buy{value: 10000e18}(token, 0);
    tokenController.buy{value: 100000e18}(token, 0);
  }
  
  // somehow the CP has a very very small error that needs investigation
  function notest_BuyEquality() public {
    // first buy bc of the 1st time missing funds
    tokenController.buy{value: 1e18}(token, 0);
    
    uint buyAmount = tokenController.getBuyAmount(token, 10000e18) * 998 / 1000;
    uint bought1 = tokenController.buy{value: 5000e18}(token, 0);
    uint bought2 = tokenController.buy{value: 5000e18}(token, 0);
    assertEq(buyAmount, bought1 + bought2);
  }
  
  
  function testfuzz_BuyAmount(uint amount) public {
    vm.assume(amount < 1e10 ether && amount > 0);
    uint bought = tokenController.buy{value: amount}(token, 0);
    assertGt(bought, 0);
    assertLt(bought, tokenController.TOTAL_SUPPLY());
  }
  
  function testfuzz_getBuyAmount(uint amount) public view {
    vm.assume(amount < 1e30 ether);
    assertLt(tokenController.getBuyAmount(token, amount), 1_000_000_000e18);
  }
}
