'use strict';

global.config = {
    service: {
        contractAddress: '',
        rpcEndpoint: '',
        gasLimit: 3000000,
        encrpytionMode: false,
        encyptionConfig: {
            algorithm: 'aes-256-ctr',
            secret: ''
        },
        storageMode: 'merkletree',
        txSignMode: false
    },
    ipfsConfig: {
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
        headers: {
            authorization: ''
        },
        dagOptions: {
            format: 'dag-cbor',
            hashAlg: 'sha2-256'
        }
    },
    IOTAMaMConfig: {
        host: 'https://nodes.devnet.iota.org',
        mode: 'public'
    }
};

//supported storage
var storageType = {
    IPFS: 'ipfs',
    MERKLETREE: 'merkletree',
    IOTA: 'iota'
    //In Future
    //DCB (decentralized context broker)
    //storj
};

const getServiceConfig = () => global.config.service;
const setServiceConfig = config => {

    if (typeof config.contractAddress === 'undefined' || config.contractAddress === '') {
        throw new Error('contractAddress is missing');
    }
    if (typeof config.rpcEndpoint === 'undefined' || config.rpcEndpoint === '') {
        throw new Error('rpcEndpoint is missing');
    }
    if (config.encrpytionMode) {
        if (typeof config.encyptionConfig.secret === 'undefined' || config.encyptionConfig.secret === '') {
            throw new Error('encryption secret is missing');
        }
    }
    if (config.storageMode) {
        if (!Object.values(storageType).includes(config.storageMode)) {
            throw new Error('storageMode is incorrect');
        }
    }
    global.config.service = config;
};

const getIPFSConfig = () => global.config.ipfsConfig;

const setIPFSConfig = config => {
    global.config.ipfsConfig = config;
};

const getIOTAMaMConfig = () => global.config.IOTAMaMConfig;
const setIOTAMaMConfig = config => {
    global.config.IOTAMaMConfig = config;
};

module.exports = {
    getServiceConfig,
    setServiceConfig,
    getIPFSConfig,
    setIPFSConfig,
    getIOTAMaMConfig,
    setIOTAMaMConfig,
    storageType
};