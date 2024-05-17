// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import "forge-std/Test.sol";
import "../contracts/TokenController.sol";

contract Lottery_Test is Test {
  TokenController public tokenController;
  
  fallback() external payable {}
  receive() external payable {}
  
  function setUp() public {
    tokenController = new TokenController();
  }
  
  
  
  function test_BuyTicket() public {
    string memory name = "Las Beras";
    uint buyTicketAmount = 1e18;
    
    (address token,) = tokenController.createToken(name, name, '{"img":"QmPjxUWe9X8fpZWtr3YaWvb4x5iEBw3MBVXv46CWJCumVM","desc":"Dummy desc"}');
    
    console.log("Mcap0", tokenController.getMcap(token));
    vm.expectRevert("100xOrBust: Insufficient Mcap");
    tokenController.buyTicket{value: buyTicketAmount}(token);
    
    tokenController.buy{value: 10e18}(token, 0);
    console.log("Mcap1", tokenController.getMcap(token));
    vm.expectRevert("100xOrBust: Insufficient Mcap");
    tokenController.buyTicket{value: buyTicketAmount}(token);
    
    // reach sufficient mcap > 0, then skip ahead for empty jackpot
    tokenController.buy{value: 15000e18}(token, 0);
    skip(7 * 86400);
    console.log("Mcap3", tokenController.getMcap(token));
    
    vm.expectRevert("100xOrBust: Invalid amount");
    tokenController.buyTicket(token);
    tokenController.buyTicket{value: buyTicketAmount}(token);
    
    // check lottery settings
    (uint strike, uint payoutPerTicket, uint totalOI) = tokenController.getLotterySettings(token, tokenController.today()+1);
    assertEq(tokenController.getPrice(token) * 5, strike);
    assertGt(payoutPerTicket, 0);
    assertEq(1e18 * totalOI / payoutPerTicket, 1e18);
    
    assertEq(tokenController.dailyJackpot(tokenController.today()+1), buyTicketAmount * 999 / 1000);
    
    vm.expectRevert("100xOrBust: Round ongoing");
    tokenController.splitJackpot(uint32(block.timestamp / 86400));
    
    // Skip 2 days: process jackpot + claims
    tokenController.depositLotteryJackpot{value: 1e18}();
    skip(2 * 86400);
    assertEq(tokenController.dailyJackpot(tokenController.today() - 1), 1999e15);
    
    uint dailyJackpot = tokenController.dailyJackpot(tokenController.today());
    assertEq(dailyJackpot, 0);
    // jackpot should be spent as 40% on current token, 60% rolled over to next day as no other winner token
    (,uint quoteBal) = tokenController.balances(token);
    tokenController.splitJackpot(tokenController.today()-1);
    (,uint quoteBal2) = tokenController.balances(token);
    console.log("bef aft", quoteBal, quoteBal2);
    console.log("gfd", tokenController.dailyJackpot(tokenController.today()));
    // there should be 60% not distributed and added to today's jackpot
    assertEq(tokenController.dailyJackpot(tokenController.today()), 1999e15 * 60 / 100);
  }  
  
  
  function test_BuyTicket_NoWin() public {
    string memory name = "Las Beras";
    uint buyTicketAmount = 1e18;
    
    (address token,) = tokenController.createToken(name, name, '{"img":"QmPjxUWe9X8fpZWtr3YaWvb4x5iEBw3MBVXv46CWJCumVM","desc":"Dummy desc"}');

    // reach sufficient mcap > 0, then skip ahead for empty jackpot
    tokenController.buy{value: 15000e18}(token, 0);
    uint price = tokenController.getPrice(token);
    skip(7 * 86400);

    tokenController.buyTicket{value: buyTicketAmount}(token);
    assertEq(tokenController.dailyJackpot(tokenController.today()+1), buyTicketAmount * 999 / 1000);
    
    // Skip 1 day and buy a large order to push price up, but not a 5x, not enough for a win
    skip(86400);
    tokenController.buy{value: 15000e18}(token, 0);
    assertGt(price * 5, tokenController.getPrice(token));
    console.log("prices", price, tokenController.getPrice(token));
    
    // Skip 1 day: process jackpot + claims
    tokenController.depositLotteryJackpot{value: 1e18}();
    skip(86400);
    
    // Process claim (in 2 steps for tracking)
    tokenController.splitJackpot(tokenController.today()-1);
    uint tokenBalance = ERC20(token).balanceOf(address(this));
    uint payout = tokenController.claim(token);
    assertEq(payout, 0);
    assertEq(tokenBalance, ERC20(token).balanceOf(address(this)));
  }
  
  
  function test_BuyTicket_Win() public {
    string memory name = "Las Beras";
    uint buyTicketAmount = 1e18;
    
    (address token,) = tokenController.createToken(name, name, '{"img":"QmPjxUWe9X8fpZWtr3YaWvb4x5iEBw3MBVXv46CWJCumVM","desc":"Dummy desc"}');

    // reach sufficient mcap > 0, then skip ahead for empty jackpot
    console.log("price", tokenController.getPrice(token));
    tokenController.buy{value: 10000e18}(token, 0);
    uint price = tokenController.getPrice(token);
    skip(7 * 86400);

    (uint payout, uint strike) = tokenController.buyTicket{value: buyTicketAmount}(token);
    assertEq(strike, 5 * tokenController.getPrice(token));
    // proper payout with small division error allowed
    assertApproxEqAbs(20e36 / price, tokenController.getUserLotteryPayout(token, tokenController.today()+ 1, address(this)), 1e8);
    assertEq(tokenController.dailyJackpot(tokenController.today()+1), buyTicketAmount * 999 / 1000);
    
    // Skip 1 day and buy a large order to push price up 5+x (but careful cant buy too much cuz ticket supply reserved)
    skip(86400);
    tokenController.buy{value: 100000e18}(token, 0);
    assertLt(price * 5, tokenController.getPrice(token));
    console.log("prices", price, tokenController.getPrice(token));
    
    // Skip 1 day: process jackpot + claims
    tokenController.depositLotteryJackpot{value: 1e18}();
    skip(86400);
    
    // Process claim (in 2 steps for tracking)
    tokenController.splitJackpot(tokenController.today()-1);
    uint tokenBalance = ERC20(token).balanceOf(address(this));
    payout = tokenController.claim(token);
    assertGt(payout, 0);
    assertGt(ERC20(token).balanceOf(address(this)), tokenBalance);
  }
}
