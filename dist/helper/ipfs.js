'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getFromIPFS = exports.uploadToIPFS = undefined;

var _ipfsApi = require('ipfs-api');

var _ipfsApi2 = _interopRequireDefault(_ipfsApi);

var _config = require('../config');

var _crypto = require('./crypto');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ipfs = new _ipfsApi2.default((0, _config.getIPFSConfig)());

const uploadToIPFS = payload => {
    return new Promise((resolve, reject) => {
        let data;
        if ((0, _config.getServiceConfig)().encrpytionMode) {
            data = (0, _crypto.encrypt)(JSON.stringify(payload));
        } else {
            data = payload;
        }
        ipfs.dag.put(data, (0, _config.getIPFSConfig)().dagOptions).then(cid => {
            resolve(cid.toString());
        }).catch(err => {
            reject(err);
        });
    });
};

const getFromIPFS = cid => {
    return new Promise((resolve, reject) => {
        let data;
        ipfs.dag.get(cid).then(res => {
            if ((0, _config.getServiceConfig)().encrpytionMode) {
                data = JSON.parse((0, _crypto.decrypt)(res.value));
            } else {
                data = JSON.parse(res.value);
            }
            resolve(data);
        }).catch(err => {
            reject(err);
        });
    });
};

exports.uploadToIPFS = uploadToIPFS;
exports.getFromIPFS = getFromIPFS;