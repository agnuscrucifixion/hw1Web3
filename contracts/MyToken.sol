// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyERC20Token is ERC20 {
    address public owner;
    uint256 public fee = 1; // 1% комиссия

    constructor() ERC20("MyERC20Token", "M20") {
        owner = msg.sender;
        _mint(msg.sender, 1000000 * 10 ** decimals()); // Минтим 1 миллион токенов
    }

    function setFee(uint256 _fee) external {
        require(msg.sender == owner, "Only owner can set fee");
        fee = _fee;
    }

    // Переопределение функции transfer для расчета комиссии
    function transfer(address recipient, uint256 amount) public override returns (bool) {
        uint256 feeAmount = (amount * fee) / 100; // Рассчитываем комиссию в 1%
        uint256 amountAfterFee = amount - feeAmount;

        // Переводим комиссию владельцу контракта
        super.transfer(owner, feeAmount);
        // Переводим оставшиеся средства получателю
        return super.transfer(recipient, amountAfterFee);
    }

    // Переопределение функции transferFrom для расчета комиссии
    function transferFrom(address sender, address recipient, uint256 amount) public override returns (bool) {
        uint256 feeAmount = (amount * fee) / 100; // Рассчитываем комиссию в 1%
        uint256 amountAfterFee = amount - feeAmount;

        // Переводим комиссию владельцу контракта
        super.transferFrom(sender, owner, feeAmount);
        // Переводим оставшиеся средства получателю
        return super.transferFrom(sender, recipient, amountAfterFee);
    }

    // Функция покупки токенов
    function buy() external payable {
        uint256 tokensToBuy = msg.value * 100; // Курс: 1 ETH = 100 токенов
        _mint(msg.sender, tokensToBuy);
    }
}
