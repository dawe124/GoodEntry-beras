// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import "forge-std/Test.sol";
import "../contracts/TokenController.sol";

contract TokenControllerTest is Test {
  TokenController public tokenController;
  address internal USDC = 0x6581e59A1C8dA66eD0D313a0d4029DcE2F746Cc5;
  address internal MUCH_USDC = 0x8a73D1380345942F1cb32541F1b19C40D8e6C94B;
  address internal HONEY = 0x7EeCA4205fF31f947EdBd49195a7A88E6A91161B;
  address internal bHONEY = 0x95c5B81Fb99c91D4EAE15a28302c0200607b9D4e;
  address internal MUCH_HONEY = 0xc63FAb87Cb00249190577937Ab6E04dA0AE69633;
  
  address internal MIM = 0xB734c264F83E39Ef6EC200F99550779998cC812d;
  address internal MUCH_MIM = 0x34504A1E7b9161c8C615f9c5F023312bBA030354;
  
  address internal MUCH_BERA = 0x5806E416dA447b267cEA759358cF22Cc41FAE80F;
  
  address internal token;
  
  fallback() external payable {}
  receive() external payable {}


  function setUp() public {
    tokenController = new TokenController();
    // give ourselves some eth
    console.log('erthb', address(this).balance);
  }
  
  
  function test_Creation_NoBuy() public {
    string memory name = "Las Beras";
    token = tokenController.createToken(name, name, '{"img":"QmPjxUWe9X8fpZWtr3YaWvb4x5iEBw3MBVXv46CWJCumVM","desc":"Dummy desc"}');
    assertEq(ERC20(token).name(), name);
    assertEq(ERC20(token).symbol(), name);
  }
  
  
  function test_BuySell() public {
    string memory name = "Las Beras";

    token = tokenController.createToken(name, name, '{"img":"QmPjxUWe9X8fpZWtr3YaWvb4x5iEBw3MBVXv46CWJCumVM","desc":"Dummy desc"}');
    uint bought = tokenController.buy{value: 1e18}(token, 0);
    assertGt(bought, 0);
    // balance should be 1e18 - 1e15 fee
    assertEq(address(tokenController).balance, 1e18 - 1e15);
    
    // sale should return a bit less than the current controller balance (99.9% with default fee of 0.1%)
    assertEq(tokenController.getAmountSale(token, bought), address(tokenController).balance * 999 / 1000);
    
    vm.expectRevert("ERC20: insufficient allowance");
    tokenController.sell(token, bought / 2);
    ERC20(token).approve(address(tokenController), type(uint).max);
    uint sold = tokenController.sell(token, bought / 2);
    console.log("sold, ", sold);
  }
}
