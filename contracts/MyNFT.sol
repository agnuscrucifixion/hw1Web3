// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, Ownable {
    uint256 public constant pricePerNFT = 0.01 ether;
    uint256 public tokenCounter;

    constructor(address initialOwner)
    ERC721("MyNFT", "MNFT")
    Ownable(initialOwner)
    {
        tokenCounter = 0;
    }

    /// @notice Покупка NFT за эфир
    /// @dev Мятается новый NFT за эфир
    function buyNFT() external payable {
        require(msg.value >= pricePerNFT, "Not enough Ether sent");
        _safeMint(msg.sender, tokenCounter);
        tokenCounter++;
    }

    /// @notice Установка метаданных для токенов
    /// @dev Этот метод можно переопределить для динамического URI
    function _baseURI() internal pure override returns (string memory) {
        return "https://my-nft-metadata-url.com/token/";
    }
}
