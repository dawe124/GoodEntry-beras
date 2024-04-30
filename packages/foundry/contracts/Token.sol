//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


/**
 * @notice ERC20 Token with 1B supply
 */
contract Token is ERC20{
  string public desc;
  
  constructor(string memory name, string memory symbol, string memory _desc, uint _totalSupply) ERC20(name, symbol) {
    desc = _desc;
    _mint(msg.sender, _totalSupply);
  }

}