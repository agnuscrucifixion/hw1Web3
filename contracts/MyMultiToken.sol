// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol"; // Для использования Strings

contract MyERC1155Token is ERC1155 {
    uint256 public constant ITEM_ID = 0;

    constructor() ERC1155("https://myapi.com/metadata/{id}.json") {
        _mint(msg.sender, ITEM_ID, 100, "");
    }

    function buy(uint256 amount) external payable {
        require(msg.value >= amount * 0.01 ether, "Insufficient ETH for purchase");
        _mint(msg.sender, ITEM_ID, amount, "");
    }

    // Переопределение функции для формирования правильного URI
    function uri(uint256 tokenId) public view override returns (string memory) {
        return string(abi.encodePacked("https://myapi.com/metadata/", Strings.toString(tokenId), ".json"));
    }
}
