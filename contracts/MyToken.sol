// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, ERC20Permit, Ownable {
    uint256 public constant pricePerToken = 0.001 ether;

    constructor(address initialOwner)
    ERC20("MyToken", "MTK")
    ERC20Permit("MyToken")
    Ownable(initialOwner)
    {

    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function buyToken() external payable {
        uint256 tokensToBuy = msg.value / pricePerToken;
        require(tokensToBuy > 0, "Not enough Ether sent");
        _mint(msg.sender, tokensToBuy);
    }

    function transfer(address to, uint256 amount) public override returns (bool) {
        uint256 fee = amount / 100;
        uint256 amountAfterFee = amount - fee;
        _transfer(_msgSender(), owner(), fee);
        return super.transfer(to, amountAfterFee);
    }

    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
        uint256 fee = amount / 100;
        uint256 amountAfterFee = amount - fee;
        _transfer(from, owner(), fee);
        return super.transferFrom(from, to, amountAfterFee);
    }
}
