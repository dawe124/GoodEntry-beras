//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../interfaces/ITokenAction.sol";
import "../TokenController.sol";


/**
  @notice Buy a random shitcoin among the last 20 to reach that level
  
  MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWNXK00OOkkkkOO00KXNWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
  MMMMMMMMMMMMMMMMMMMMMMMMMMMMWXOdc,.....,:codxkkOo;;oOkkxdol:,.....,cdOXWMMMMMMMMMMMMMMMMMMMMMMMMMMMM
  MMMMMMMMMMMMMMMMMMMMMMNOl'...:dOXWMMMMMWNXKOkxddc,,cdxxkO0XNWMMMMMWXOd:. .'lONMMMMMMMMMMMMMMMMMMMMMM
  MMMMMMMMMMMMMMMMMNk:. .lONMMMMNOdc;''..';;.'.':;,,,';:;,,,:;...'';cdONWMMMNOl. .:ONMMMMMMMMMMMMMMMMM
  MMMMMMMMMMMMMWO:. .;xNMMNOl,',;''',:;,,;cc....,:;;;,:c'.';,,cll:,,,',;,.,lONMMNx;. .:OWMMMMMMMMMMMMM
  MMMMMMMMMMWk, .oXMMMXl..,:,',:c:::;,;c;..'c,. ,,   .;. .;:..':c,''cl:;c:';:'..lXMMMXo. ,kWMMMMMMMMMM
  MMMMMMMMXl. :KMMMXl.':'..,'';:,'',;.  .,.  ,'.,c,..;:..,'  .,   ',''';:;,,;,',:'.oXMMMK: .lXMMMMMMMM
  MMMMMMXl .lNMMWO,.;..;;c:,,;'. .'.  ;od0XKO0NMMMMMMMMMMMMMWXkdl'  .'. .,:;,,;:,..;.,OWMMNl  lNMMMMMM
  MMMMWO. ,KMMM0,.,..:lc;,:;.  .'',dXMMMMWO;  '0MMMMMMMMMMMMMMMMMMW0c'...  .;:'';:;..,.,0MMMK; .OMMMMM
  MMMMx. :XMMWd.';;:;,:;;;   ..,dNMMMMMMMMMMNl..lNMMMMMMMMMMMMMMMMMMWW0l'..  .::;cc;;,,'.dWMMX: .xMMMM
  MMM0' ,KMMMx.,:,::::','   ..oXMMMMMMMMMMMMMM0, .lO00KNMMMMWN0dc,.  .dW0;.    ';.,::;':'.xMMMK, '0MMM
  MMWd. oWMMX:.,..,,,..,    .:KMMMMMMMMMMMMMMXocc'.  ..:c. .':dOXWMMMMMMWk.     ,..ccc..,.:XMMWo .dWMM
  MMWo  lXNN0;.;',;,'.,;.    ;KMMMMMMMMMMNKkl',l'      .llxWMMMMMMMMMMMMMk.     ,,.;;;..,.;0NNXl  oWMM
  MMMO. :XMMWd.,;';;;;;c,..  .oNMKc''.. .;ldOXWXkxxxxl..:XMMMMMMMMMMMMMMK;   ..,c;::,'':;.dWMMX: .OMMM
  MMMWo  oWMMNc.,''::c:;c;..  .:0N0xkXWMMMMMMMMMMMMMMM0; .xWMMMMMMMMMMNx'   ..;c;;::;..,.cNMMWo  oWMMM
  MMMMWo. lNMMWd.''.;c:c;;l;.   .,o0WMMMMMMMMMMMMMMMMMMWk. 'xXMMMMMNkc'.   .;l;,:::;.''.dWMMNl  oWMMMM
  MMMMMM0' 'OWMMXl.,:..'...,cc'  .''..lOXWMMMMMMMMMMMMMMWOc;cOXKk;..'.   ,cc,,cl:'':,.lNMMWO' 'OMMMMMM
  MMMMMMMWk' .kWMMWx'.;;'',,'.,::'...'.  ,. .cc;lxolldd:;l; .,.  .,. .,c:..;;..';;.'xNMMWk' .kWMMMMMMM
  MMMMMMMMMMK: .cKWMMNk,.',;,;ll:;c:,'':c...,'  .'   .,.  ,. .,c;'';:::;;;,,,,'.,kNMMW0:  :KMMMMMMMMMM
  N0XWMMMMMMMMW0c. ,ooxKWNk:''';:',::;,.,:.,:,,;c;.,'':;.'';;,,,;::::',:,'.':kNWKxoo, .c0WMMMMMMMMMMMM
  N0KWMMMMMMMMMMMMNk;. 'oKWMMMN0d:,','..'';;',,,;..:;.''....;:'..','',:d0NMMMWKo' .;kNMMMMMMMMMMMMMMMM
  WKXWMMMMMMMMMMMMMMMMWKx:. .;dONWMMMMWX0kdoc::;;;,'',;;;:clodk0XWMMMMWNOd;. .;xXWMMMMMMMMMMMMMMMMMMMM
  N0KWMMMMMMMMMMMMMMMMMMMMMMWXOo:....':ldxOKXNNWWWOllOWWWNNXKOkdl:'....:oOXWMMMMMMMMMMMMMMMMMMMMMMMMMM
*/
contract ShitcoinRoulette is ITokenAction {
  uint8 public constant MAX_TOKENS = 20;
  address[] recentTokens = new address[](MAX_TOKENS);
  uint public lastAdded;
  address public tokenController;
  
  event NewRouletoken(address indexed token);
  event ElRoulettooor(address indexed token, address indexed user, uint baseAmount, uint quoteAmount);
  
  constructor (address controller) {
    require (controller != address(0), "Invalid controller");
    tokenController = controller;
  }

  /// @notice Main action is to list token 
  function doSomething(address baseToken, uint baseAmount, address quoteToken, uint quoteAmount) public {
    lastAdded = lastAdded + 1 % MAX_TOKENS;
    recentTokens[lastAdded] = baseToken;
    emit NewRouletoken(baseToken);
  }
  
  
  /// @notice Roulette buy
  function spin(uint quoteAmount) public returns (address token, uint baseAmount) {
    // totally unsafe random num generator
    token = recentTokens[uint(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % MAX_TOKENS];
    baseAmount = TokenController(tokenController).buy(token, quoteAmount, 0);
    IERC20(token).transfer(msg.sender, baseAmount);
    emit ElRoulettooor(token, msg.sender, baseAmount, quoteAmount);
  }
}