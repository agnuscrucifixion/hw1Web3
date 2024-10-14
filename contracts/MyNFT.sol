// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyERC721Token is ERC721URIStorage {
    uint256 public tokenCounter;

    constructor() ERC721("MyERC721Token", "M721") {
        tokenCounter = 0;
    }

    function createNFT(string memory tokenURI) public returns (uint256) {
        uint256 newItemId = tokenCounter;
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI); // Добавляем URI с метаданными
        tokenCounter++;
        return newItemId;
    }

    function buy() external payable {
        uint256 newItemId = tokenCounter;
        require(msg.value >= 0.01 ether, "Minimum price is 0.01 ETH");
        _safeMint(msg.sender, newItemId);
        tokenCounter++;
    }
}
