import config from '../config';
import Web3 from 'web3';
import Contract from 'web3-eth-contract';
import AssetArtifact from '../../build/contracts/Assets.json';
import { getMerkelRoot } from '../helper/merkle';
import { uploadToIPFS } from '../helper/ipfs';
import { publishToIOTA } from '../helper/iota';

Contract.setProvider(config.rpcEndpoint);
const contract = new Contract(AssetArtifact.abi, config.contractAddress);

const createAsset = (uuid, payload, address, callback) => {
    return Promise.resolve().then(() => {
        if (config.storageMode == config.storageType.IPFS) {
            return uploadToIPFS(payload);
        }
        else if (config.storageMode == config.storageType.IOTA) {
            return publishToIOTA(payload);
        } else {
            return getMerkelRoot(payload);
        }
    }).then((value) => {
        let uuidToByte32 = Web3.utils.fromAscii(uuid);
        return contract.methods.createAsset(uuidToByte32, value).send({
            from: address,
            gas: config.gasLimit
        });
    }).then((res) => {
        callback({ TxRecipt: res, StorageType: config.storageMode });
    })
        .catch((err) => {
            callback(err);
        });
};

const getAsset = (uuid, callback) => {
    let uuidToByte32 = Web3.utils.fromAscii(uuid);
    contract.methods.getAsset(uuidToByte32).call().then((response) => {
        callback(response);
    }).catch((err) => {
        callback(err);
    });
};

const updateAsset = (uuid, payload, address, callback) => {
    return Promise.resolve().then(() => {
        if (config.storageMode == config.storageType.IPFS) {
            return uploadToIPFS(payload);
        }
        else if (config.storageMode == config.storageType.IOTA) {
            return publishToIOTA(payload);
        } else {
            return getMerkelRoot(payload);
        }
    }).then((value) => {
        let uuidToByte32 = Web3.utils.fromAscii(uuid);
        return contract.methods.updateAsset(uuidToByte32, value).send({
            from: address,
            gas: config.gasLimit
        });
    }).then((res) => {
        callback({ TxRecipt: res, StorageType: config.storageMode });
    })
        .catch((err) => {
            callback(err);
        });
};

const removeAsset = (uuid, address, callback) => {
    var uuidToByte32 = Web3.utils.fromAscii(uuid);
    contract.methods.removeAsset(uuidToByte32).send({
        from: address
    }).then((response) => {
        callback({ TxRecipt: response });
    }).catch((err) => {
        callback(err);
    });
};

const addMetaData = (uuid, metadataPayload, address, callback) => {
    return Promise.resolve().then(() => {
        if (config.storageMode == config.storageType.IPFS) {
            return uploadToIPFS(metadataPayload);
        }
        else if (config.storageMode == config.storageType.IOTA) {
            return publishToIOTA(metadataPayload);
        } else {
            return getMerkelRoot(metadataPayload);
        }
    }).then((value) => {
        let uuidToByte32 = Web3.utils.fromAscii(uuid);
        return contract.methods.addMetadata(uuidToByte32, value).send({
            from: address,
            gas: config.gasLimit
        });
    }).then((res) => {
        callback({ TxRecipt: res, StorageType: config.storageMode });
    })
        .catch((err) => {
            callback(err);
        });
};


const getMetaData = (uuid, callback) => {
    var uuidToByte32 = Web3.utils.fromAscii(uuid);
    contract.methods.getMetadatas(uuidToByte32).call().then((res) => {
        callback(res);
    });
};

const remoteMetaData = (uuid, index, address, callback) => {
    var uuidToByte32 = Web3.utils.fromAscii(uuid);
    contract.methods.removeMetadata(uuidToByte32, index).send({
        from: address
    }).then((response) => {
        callback({ TxRecipt: response });
    }).catch((err) => {
        callback(err);
    });
};

const addRelation = (uuid, relationPayload, callback) => {
    return Promise.resolve().then(() => {
        if (config.storageMode == config.storageType.IPFS) {
            return uploadToIPFS(relationPayload);
        }
        else if (config.storageMode == config.storageType.IOTA) {
            return publishToIOTA(relationPayload);
        } else {
            return getMerkelRoot(relationPayload);
        }
    }).then((value) => {
        let uuidToByte32 = Web3.utils.fromAscii(uuid);
        return contract.methods.addRelation(uuidToByte32, value).send({
            from: address,
            gas: config.gasLimit
        });
    }).then((res) => {
        callback({ TxRecipt: res, StorageType: config.storageMode });
    })
        .catch((err) => {
            callback(err);
        });
};

const getRelations = (uuid, callback) => {
    var uuidToByte32 = Web3.utils.fromAscii(uuid);
    contract.methods.getRelations(uuidToByte32).call().then((res) => {
        callback(res);
    });
};

const removeRelation = (uuid, index, address, callback) => {
    var uuidToByte32 = Web3.utils.fromAscii(uuid);
    contract.methods.removeRelation(uuidToByte32, index).send({
        from: address
    }).then((response) => {
        callback({ TxRecipt: response });
    }).catch((err) => {
        callback(err);
    });
};

export {
    createAsset,
    getAsset,
    updateAsset,
    removeAsset,
    addMetaData,
    getMetaData,
    remoteMetaData,
    addRelation,
    getRelations,
    removeRelation
};