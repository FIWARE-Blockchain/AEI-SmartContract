var contractAddress = process.env.CONTRACT_ADDRESS || '0x57918eB7ab771ec7918eFbfDA9C1ecD576a12e2c';
var rpcEndpoint = process.env.RPC_ENDPOINT || 'http://localhost:8545';
var gasLimit = 3000000;
var encrpytionMode = true;
var encyptionConfig = {
    mode: false,
    algorithm: 'aes-256-ctr',
    secret: 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3'
}

//supported storage
var storageType = {
    IPFS : 'ipfs',
    MERKLETREE : 'merkletree',
    IOTA : 'iota',
    //In Future
    //DCB (decentralized context broker)
    //storj
};
var storageMode = storageType.MERKLETREE;

var ipfsConfig = {
    network: {
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
        headers: {
          authorization: ''
        }
    },
    dagOptions: { 
        format: 'dag-cbor', 
        hashAlg: 'sha2-256' 
    },
};

//IOTA MAM Transaction
var IOTAConfig = {
    host: 'https://nodes.devnet.iota.org',
    mode : 'public'
}


var txSignMode = false;

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
}