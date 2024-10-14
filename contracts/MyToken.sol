// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract MyERC20Token is ERC20 , Ownable, ERC20Permit{
    uint256 public fee = 1;

    constructor(address owner) ERC20("MyERC20Token", "M20") Ownable(owner) ERC20Permit("MyERC20Token"){
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function transfer(address recipient, uint256 amount) public override returns (bool) {
        _transfer(msg.sender, recipient, amount);
        _burn(msg.sender, fee);
        return true;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function transferFrom(address from, address to, uint256 value) public override returns (bool) {
        _spendAllowance(from, _msgSender(), value);
        transfer(to, value);
        return true;
    }

    function buy(address to) external payable {
        _mint(to, msg.value);
    }
}
