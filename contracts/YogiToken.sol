// contracts/OurToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract YogiToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("YogiToken", "YT") {
        _mint(msg.sender, initialSupply);
    }
}
