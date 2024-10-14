// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyERC721Token is ERC721, Ownable {
    uint256 public tokenCounter;

    constructor(address owner) ERC721("MyERC721Token", "M721") Ownable(owner){
        tokenCounter = 0;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://ipfs.io/ipfs/QmSVpp9gvoh7L6XMtjUjKPLQV7Fg3EfHa1GnH4UV7pNE6k?filename=photo_2023-02-05_15-53-29.jpg";
    }

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }
}


