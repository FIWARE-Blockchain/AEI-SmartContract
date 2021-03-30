// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";

contract Assets is ERC721Full, Ownable{
    constructor() ERC721Full('NGSIASSET', 'NGA') public {}
  
    struct Asset {
        address owner;
        string ddoHash;
    }

    mapping (bytes32 => Asset) private didToHash;
    event AssetCreated (address owner, bytes32 uuid, uint timestamp, string filehash);

    function createAsset(bytes32 uuid, string memory _newHash) public {
        bytes memory emptyTest = bytes(didToHash[uuid].ddoHash); 
        if (emptyTest.length != 0 && didToHash[uuid].owner != msg.sender) {
            revert("Asset creation failed. Invalid user.");
        }

        didToHash[uuid] = Asset(msg.sender, _newHash);
        emit AssetCreated(msg.sender, uuid, block.timestamp, _newHash);
    }

    function getAsset(bytes32 uuid) public view returns (string memory) {
        return didToHash[uuid].ddoHash;
    }
}