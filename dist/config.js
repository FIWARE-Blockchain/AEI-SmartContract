'use strict';

var contractAddress = process.env.CONTRACT_ADDRESS || '0x57918eB7ab771ec7918eFbfDA9C1ecD576a12e2c';
var rpcEndpoint = process.env.RPC_ENDPOINT || 'http://localhost:8545';
var gasLimit = process.env.GAS_LIMIT || 3000000;
var encrpytionMode = process.env.ENCYPTION_MODE || false;
var encyptionConfig = {
    algorithm: process.env.ENCYPTION_ALGORITHM || 'aes-256-ctr',
    secret: process.env.ENCYPTION_SECRET || 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3'

    //supported storage
};var storageType = {
    IPFS: 'ipfs',
    MERKLETREE: 'merkletree',
    IOTA: 'iota'
    //In Future
    //DCB (decentralized context broker)
    //storj
};
var storageMode = process.env.STORAGE_MODE || storageType.MERKLETREE;

var ipfsConfig = {
    network: {
        host: process.env.IPFS_HOST || 'ipfs.infura.io',
        port: process.env.IPFS_PORT || 5001,
        protocol: process.env.IPFS_PROTOCOL || 'https',
        headers: {
            authorization: process.env.IPFS_TOKEN || ''
        }
    },
    dagOptions: {
        format: process.env.IPFS_HOST || 'dag-cbor',
        hashAlg: process.env.IPFS_HASHALGO || 'sha2-256'
    }
};

//IOTA MAM Transaction
var IOTAConfig = {
    host: process.env.IOTA_HOST || 'https://nodes.devnet.iota.org',
    mode: process.env.IOTA_MODE || 'public'

    // Tx Sign will be added soon
};var txSignMode = process.env.TX_SIGN_MODE = false;

module.exports = {
    contractAddress,
    rpcEndpoint,
    ipfsConfig,
    IOTAConfig,
    encrpytionMode,
    encyptionConfig,
    storageMode,
    storageType,
    txSignMode,
    gasLimit
};