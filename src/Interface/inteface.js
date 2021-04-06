import config from '../config';
import Web3 from 'web3';
import Contract from 'web3-eth-contract';
import AssetArtifact from '../../build/contracts/Assets.json';
import { getMerkelRoot } from '../helper/merkle';
import { uploadToIPFS } from '../helper/ipfs';
import { publishToIOTA } from '../helper/iota';


const createAsset = (uuid, payload, address, callback) => {
    Contract.setProvider(config.getServiceConfig().rpcEndpoint);
    const contract = new Contract(AssetArtifact.abi, config.getServiceConfig().contractAddress);
    return Promise.resolve().then(() => {
        if (config.getServiceConfig().storageMode == config.storageType.IPFS) {
            console.log('here');
            return uploadToIPFS(payload);
        }
        else if (config.getServiceConfig().storageMode == config.storageType.IOTA) {
            console.log('here 1');
            return publishToIOTA(payload);
        } else {
            console.log('here 2');
            return getMerkelRoot(payload);
        }
    }).then((value) => {
        let uuidToByte32 = Web3.utils.fromAscii(uuid);
        return contract.methods.createAsset(uuidToByte32, value).send({
            from: address,
            gas: config.getServiceConfig().gasLimit
        });
    }).then((res) => {
        callback({ TxRecipt: res, StorageType: config.getServiceConfig().storageMode });
    })
        .catch((err) => {
            callback(err);
        });
};

const getAsset = (uuid, callback) => {
    Contract.setProvider(config.getServiceConfig().rpcEndpoint);
    const contract = new Contract(AssetArtifact.abi, config.getServiceConfig().contractAddress);
    let uuidToByte32 = Web3.utils.fromAscii(uuid);
    contract.methods.getAsset(uuidToByte32).call().then((response) => {
        callback(response);
    }).catch((err) => {
        callback(err);
    });
};

const updateAsset = (uuid, payload, address, callback) => {
    Contract.setProvider(config.getServiceConfig().rpcEndpoint);
    const contract = new Contract(AssetArtifact.abi, config.getServiceConfig().contractAddress);
    return Promise.resolve().then(() => {
        if (config.getServiceConfig().storageMode == config.storageType.IPFS) {
            return uploadToIPFS(payload);
        }
        else if (config.getServiceConfig().storageMode == config.storageType.IOTA) {
            return publishToIOTA(payload);
        } else {
            return getMerkelRoot(payload);
        }
    }).then((value) => {
        let uuidToByte32 = Web3.utils.fromAscii(uuid);
        return contract.methods.updateAsset(uuidToByte32, value).send({
            from: address,
            gas: config.getServiceConfig().gasLimit
        });
    }).then((res) => {
        callback({ TxRecipt: res, StorageType: config.getServiceConfig().storageMode });
    })
        .catch((err) => {
            callback(err);
        });
};

const removeAsset = (uuid, address, callback) => {
    Contract.setProvider(config.getServiceConfig().rpcEndpoint);
    const contract = new Contract(AssetArtifact.abi, config.getServiceConfig().contractAddress);
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
    Contract.setProvider(config.getServiceConfig().rpcEndpoint);
    const contract = new Contract(AssetArtifact.abi, config.getServiceConfig().contractAddress);
    return Promise.resolve().then(() => {
        if (config.getServiceConfig().storageMode == config.storageType.IPFS) {
            return uploadToIPFS(metadataPayload);
        }
        else if (config.getServiceConfig().storageMode == config.storageType.IOTA) {
            return publishToIOTA(metadataPayload);
        } else {
            return getMerkelRoot(metadataPayload);
        }
    }).then((value) => {
        let uuidToByte32 = Web3.utils.fromAscii(uuid);
        return contract.methods.addMetadata(uuidToByte32, value).send({
            from: address,
            gas: config.getServiceConfig().gasLimit
        });
    }).then((res) => {
        callback({ TxRecipt: res, StorageType: config.getServiceConfig().storageMode });
    })
        .catch((err) => {
            callback(err);
        });
};


const getMetaData = (uuid, callback) => {
    Contract.setProvider(config.getServiceConfig().rpcEndpoint);
    const contract = new Contract(AssetArtifact.abi, config.getServiceConfig().contractAddress);
    var uuidToByte32 = Web3.utils.fromAscii(uuid);
    contract.methods.getMetadatas(uuidToByte32).call().then((res) => {
        callback(res);
    });
};

const remoteMetaData = (uuid, index, address, callback) => {
    Contract.setProvider(config.getServiceConfig().rpcEndpoint);
    const contract = new Contract(AssetArtifact.abi, config.getServiceConfig().contractAddress);
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
    Contract.setProvider(config.getServiceConfig().rpcEndpoint);
    const contract = new Contract(AssetArtifact.abi, config.getServiceConfig().contractAddress);
    return Promise.resolve().then(() => {
        if (config.getServiceConfig().storageMode == config.storageType.IPFS) {
            return uploadToIPFS(relationPayload);
        }
        else if (config.getServiceConfig().storageMode == config.storageType.IOTA) {
            return publishToIOTA(relationPayload);
        } else {
            return getMerkelRoot(relationPayload);
        }
    }).then((value) => {
        let uuidToByte32 = Web3.utils.fromAscii(uuid);
        return contract.methods.addRelation(uuidToByte32, value).send({
            from: address,
            gas: config.getServiceConfig().gasLimit
        });
    }).then((res) => {
        callback({ TxRecipt: res, StorageType: config.getServiceConfig().storageMode });
    })
        .catch((err) => {
            callback(err);
        });
};

const getRelations = (uuid, callback) => {
    Contract.setProvider(config.getServiceConfig().rpcEndpoint);
    const contract = new Contract(AssetArtifact.abi, config.getServiceConfig().contractAddress);
    var uuidToByte32 = Web3.utils.fromAscii(uuid);
    contract.methods.getRelations(uuidToByte32).call().then((res) => {
        callback(res);
    });
};

const removeRelation = (uuid, index, address, callback) => {
    Contract.setProvider(config.getServiceConfig().rpcEndpoint);
    const contract = new Contract(AssetArtifact.abi, config.getServiceConfig().contractAddress);
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