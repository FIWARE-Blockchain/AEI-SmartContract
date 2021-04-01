// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";

contract Assets is ERC721Full, Ownable{
    constructor() ERC721Full('NGSIASSET', 'NGA') public {}
  
  struct Asset {
        address owner;
        bytes32 _hash;
        Relationships[] relation;
    }

    struct Relationships {
        address _owner;
        bytes32 _hash;
    }

    mapping (bytes32 => Asset) private payloadHash;
    
    event AssetCreated (address owner, bytes32 uuid, uint timestamp, bytes32 filehash);
    event RelationAdded (address owner, bytes32 uuid, uint timestamp,bytes32 metadatahash);


    function createAsset(bytes32 uuid, bytes32 _newHash) public returns (bytes32) {
        if(payloadHash[uuid].owner == msg.sender) {
            revert("Asset exists");
        }
        payloadHash[uuid].owner = msg.sender;
        payloadHash[uuid]._hash = _newHash;
        emit AssetCreated(msg.sender, uuid, block.timestamp, _newHash);
    }

    function getAsset(bytes32 uuid) public view returns (bytes32) {
        return payloadHash[uuid]._hash;
    }
    
        function addRelation(bytes32 uuid, bytes32 _metadatahash) public {
        //check either uuid exist or not
        Relationships memory rel = Relationships(msg.sender, _metadatahash);
        payloadHash[uuid].relation.push(rel);
        emit RelationAdded(msg.sender, uuid, block.timestamp, _metadatahash);
    }
    
    function getRelations(bytes32 uuid) public view returns (address[] memory, bytes32[] memory) {
        address[] memory adds = new address[](payloadHash[uuid].relation.length);
        bytes32[] memory metadataHash = new bytes32[](payloadHash[uuid].relation.length);
        
        for(uint i=0; i<payloadHash[uuid].relation.length; i++) {
            Relationships storage relation = payloadHash[uuid].relation[i];
            adds[i] = relation._owner;
            metadataHash[i] = relation._hash;
            
        }
        return (adds, metadataHash);
    }
}