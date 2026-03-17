// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol"; // make Badge ownable

contract Badge is ERC721, ERC721URIStorage, Ownable {
    uint256 private _tokenIds;

    constructor(address inital_owner)
        ERC721("Badge", "BADGE")
        Ownable(inital_owner){}
    function safeMint(address recipient, string memory uri) public onlyOwner returns (uint256){
        uint256 _tokenID = _tokenIds++;
        _safeMint(recipient, _tokenID);
        _setTokenURI(_tokenID, uri);
        return _tokenID;
    }

// The following functions are overrides required by Solidity.
    function tokenURI(uint256 tokenId)public view override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
