//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

interface ITokenAction {
  function doSomething(address baseToken, uint baseAmount) external payable;
}