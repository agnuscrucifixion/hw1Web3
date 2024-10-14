// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MyERC1155Token is ERC1155, Ownable, ERC1155Supply {
    constructor(address owner) ERC1155("https://ipfs.io/ipfs/QmSVpp9gvoh7L6XMtjUjKPLQV7Fg3EfHa1GnH4UV7pNE6k?filename=photo_2023-02-05_15-53-29.jpg") Ownable(owner) {
    }

    function newURI(string memory uri) public onlyOwner {
        _setURI(uri);
    }

    function _update(address from, address to, uint256[] memory ids, uint256[] memory values) internal override(ERC1155, ERC1155Supply)
    {
        super._update(from, to, ids, values);
    }
}
