//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";


/**
 * @notice ERC20 Token with 1B supply
 */
contract Token is ERC20, ERC20Burnable {
  string public desc;
  address public immutable controller;
  
  constructor(string memory name, string memory symbol, string memory _desc, uint _totalSupply) ERC20(name, symbol) {
    desc = _desc;
    _mint(msg.sender, _totalSupply);
    controller = msg.sender;
  }
  
  function mint(address user, uint amount) public {
    require(msg.sender == controller, "Unauthorized minter");
    _mint(user, amount);
  }
}