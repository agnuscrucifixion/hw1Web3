// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract MyMultiToken is ERC1155, Ownable, ERC1155Supply {
    uint256 public constant pricePerToken = 0.005 ether;
    uint256 public constant tokenID = 1;

    constructor(address initialOwner)
    ERC1155("https://my-multitoken-metadata-url.com/token/1.json")
    Ownable(initialOwner)
    {}

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function _update(address from, address to, uint256[] memory ids, uint256[] memory values)
    internal
    override(ERC1155, ERC1155Supply)
    {
        super._update(from, to, ids, values);
    }
}
