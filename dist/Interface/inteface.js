'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.removeRelation = exports.getRelations = exports.addRelation = exports.remoteMetaData = exports.getMetaData = exports.addMetaData = exports.removeAsset = exports.updateAsset = exports.getAsset = exports.createAsset = undefined;

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

var _web3EthContract = require('web3-eth-contract');

var _web3EthContract2 = _interopRequireDefault(_web3EthContract);

var _Assets = require('../../build/contracts/Assets.json');

var _Assets2 = _interopRequireDefault(_Assets);

var _merkle = require('../helper/merkle');

var _ipfs = require('../helper/ipfs');

var _iota = require('../helper/iota');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createAsset = (uuid, payload, address, callback) => {
    _web3EthContract2.default.setProvider(_config2.default.getServiceConfig().rpcEndpoint);
    const contract = new _web3EthContract2.default(_Assets2.default.abi, _config2.default.getServiceConfig().contractAddress);
    return Promise.resolve().then(() => {
        if (_config2.default.getServiceConfig().storageMode == _config2.default.storageType.IPFS) {
            console.log('here');
            return (0, _ipfs.uploadToIPFS)(payload);
        } else if (_config2.default.getServiceConfig().storageMode == _config2.default.storageType.IOTA) {
            console.log('here 1');
            return (0, _iota.publishToIOTA)(payload);
        } else {
            console.log('here 2');
            return (0, _merkle.getMerkelRoot)(payload);
        }
    }).then(value => {
        let uuidToByte32 = _web2.default.utils.fromAscii(uuid);
        return contract.methods.createAsset(uuidToByte32, value).send({
            from: address,
            gas: _config2.default.getServiceConfig().gasLimit
        });
    }).then(res => {
        callback({ TxRecipt: res, StorageType: _config2.default.getServiceConfig().storageMode });
    }).catch(err => {
        callback(err);
    });
};

const getAsset = (uuid, callback) => {
    _web3EthContract2.default.setProvider(_config2.default.getServiceConfig().rpcEndpoint);
    const contract = new _web3EthContract2.default(_Assets2.default.abi, _config2.default.getServiceConfig().contractAddress);
    let uuidToByte32 = _web2.default.utils.fromAscii(uuid);
    contract.methods.getAsset(uuidToByte32).call().then(response => {
        callback(response);
    }).catch(err => {
        callback(err);
    });
};

const updateAsset = (uuid, payload, address, callback) => {
    _web3EthContract2.default.setProvider(_config2.default.getServiceConfig().rpcEndpoint);
    const contract = new _web3EthContract2.default(_Assets2.default.abi, _config2.default.getServiceConfig().contractAddress);
    return Promise.resolve().then(() => {
        if (_config2.default.getServiceConfig().storageMode == _config2.default.storageType.IPFS) {
            return (0, _ipfs.uploadToIPFS)(payload);
        } else if (_config2.default.getServiceConfig().storageMode == _config2.default.storageType.IOTA) {
            return (0, _iota.publishToIOTA)(payload);
        } else {
            return (0, _merkle.getMerkelRoot)(payload);
        }
    }).then(value => {
        let uuidToByte32 = _web2.default.utils.fromAscii(uuid);
        return contract.methods.updateAsset(uuidToByte32, value).send({
            from: address,
            gas: _config2.default.getServiceConfig().gasLimit
        });
    }).then(res => {
        callback({ TxRecipt: res, StorageType: _config2.default.getServiceConfig().storageMode });
    }).catch(err => {
        callback(err);
    });
};

const removeAsset = (uuid, address, callback) => {
    _web3EthContract2.default.setProvider(_config2.default.getServiceConfig().rpcEndpoint);
    const contract = new _web3EthContract2.default(_Assets2.default.abi, _config2.default.getServiceConfig().contractAddress);
    var uuidToByte32 = _web2.default.utils.fromAscii(uuid);
    contract.methods.removeAsset(uuidToByte32).send({
        from: address
    }).then(response => {
        callback({ TxRecipt: response });
    }).catch(err => {
        callback(err);
    });
};

const addMetaData = (uuid, metadataPayload, address, callback) => {
    _web3EthContract2.default.setProvider(_config2.default.getServiceConfig().rpcEndpoint);
    const contract = new _web3EthContract2.default(_Assets2.default.abi, _config2.default.getServiceConfig().contractAddress);
    return Promise.resolve().then(() => {
        if (_config2.default.getServiceConfig().storageMode == _config2.default.storageType.IPFS) {
            return (0, _ipfs.uploadToIPFS)(metadataPayload);
        } else if (_config2.default.getServiceConfig().storageMode == _config2.default.storageType.IOTA) {
            return (0, _iota.publishToIOTA)(metadataPayload);
        } else {
            return (0, _merkle.getMerkelRoot)(metadataPayload);
        }
    }).then(value => {
        let uuidToByte32 = _web2.default.utils.fromAscii(uuid);
        return contract.methods.addMetadata(uuidToByte32, value).send({
            from: address,
            gas: _config2.default.getServiceConfig().gasLimit
        });
    }).then(res => {
        callback({ TxRecipt: res, StorageType: _config2.default.getServiceConfig().storageMode });
    }).catch(err => {
        callback(err);
    });
};

const getMetaData = (uuid, callback) => {
    _web3EthContract2.default.setProvider(_config2.default.getServiceConfig().rpcEndpoint);
    const contract = new _web3EthContract2.default(_Assets2.default.abi, _config2.default.getServiceConfig().contractAddress);
    var uuidToByte32 = _web2.default.utils.fromAscii(uuid);
    contract.methods.getMetadatas(uuidToByte32).call().then(res => {
        callback(res);
    });
};

const remoteMetaData = (uuid, index, address, callback) => {
    _web3EthContract2.default.setProvider(_config2.default.getServiceConfig().rpcEndpoint);
    const contract = new _web3EthContract2.default(_Assets2.default.abi, _config2.default.getServiceConfig().contractAddress);
    var uuidToByte32 = _web2.default.utils.fromAscii(uuid);
    contract.methods.removeMetadata(uuidToByte32, index).send({
        from: address
    }).then(response => {
        callback({ TxRecipt: response });
    }).catch(err => {
        callback(err);
    });
};

const addRelation = (uuid, relationPayload, callback) => {
    _web3EthContract2.default.setProvider(_config2.default.getServiceConfig().rpcEndpoint);
    const contract = new _web3EthContract2.default(_Assets2.default.abi, _config2.default.getServiceConfig().contractAddress);
    return Promise.resolve().then(() => {
        if (_config2.default.getServiceConfig().storageMode == _config2.default.storageType.IPFS) {
            return (0, _ipfs.uploadToIPFS)(relationPayload);
        } else if (_config2.default.getServiceConfig().storageMode == _config2.default.storageType.IOTA) {
            return (0, _iota.publishToIOTA)(relationPayload);
        } else {
            return (0, _merkle.getMerkelRoot)(relationPayload);
        }
    }).then(value => {
        let uuidToByte32 = _web2.default.utils.fromAscii(uuid);
        return contract.methods.addRelation(uuidToByte32, value).send({
            from: address,
            gas: _config2.default.getServiceConfig().gasLimit
        });
    }).then(res => {
        callback({ TxRecipt: res, StorageType: _config2.default.getServiceConfig().storageMode });
    }).catch(err => {
        callback(err);
    });
};

const getRelations = (uuid, callback) => {
    _web3EthContract2.default.setProvider(_config2.default.getServiceConfig().rpcEndpoint);
    const contract = new _web3EthContract2.default(_Assets2.default.abi, _config2.default.getServiceConfig().contractAddress);
    var uuidToByte32 = _web2.default.utils.fromAscii(uuid);
    contract.methods.getRelations(uuidToByte32).call().then(res => {
        callback(res);
    });
};

const removeRelation = (uuid, index, address, callback) => {
    _web3EthContract2.default.setProvider(_config2.default.getServiceConfig().rpcEndpoint);
    const contract = new _web3EthContract2.default(_Assets2.default.abi, _config2.default.getServiceConfig().contractAddress);
    var uuidToByte32 = _web2.default.utils.fromAscii(uuid);
    contract.methods.removeRelation(uuidToByte32, index).send({
        from: address
    }).then(response => {
        callback({ TxRecipt: response });
    }).catch(err => {
        callback(err);
    });
};

exports.createAsset = createAsset;
exports.getAsset = getAsset;
exports.updateAsset = updateAsset;
exports.removeAsset = removeAsset;
exports.addMetaData = addMetaData;
exports.getMetaData = getMetaData;
exports.remoteMetaData = remoteMetaData;
exports.addRelation = addRelation;
exports.getRelations = getRelations;
exports.removeRelation = removeRelation;