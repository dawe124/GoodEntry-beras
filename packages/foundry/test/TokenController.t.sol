// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../contracts/TokenController.sol";

contract TokenControllerTest is Test {
    TokenController public tokenController;
    address internal HONEY = 0x7EeCA4205fF31f947EdBd49195a7A88E6A91161B;

    function setUp() public {
        tokenController = new TokenController(HONEY);
    }
}
