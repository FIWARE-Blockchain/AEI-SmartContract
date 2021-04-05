'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getFromIPFS = exports.uploadToIPFS = exports.getFromIOTA = exports.publishToIOTA = exports.verify = exports.getMerkelRoot = exports.encrypt = exports.decrypt = exports.removeRelation = exports.getRelations = exports.addRelation = exports.remoteMetaData = exports.getMetaData = exports.addMetaData = exports.removeAsset = exports.updateAsset = exports.getAsset = exports.createAsset = undefined;

var _inteface = require('./Interface/inteface');

var _crypto = require('./helper/crypto');

var _merkle = require('./helper/merkle');

var _iota = require('./helper/iota');

var _ipfs = require('./helper/ipfs');

exports.createAsset = _inteface.createAsset;
exports.getAsset = _inteface.getAsset;
exports.updateAsset = _inteface.updateAsset;
exports.removeAsset = _inteface.removeAsset;
exports.addMetaData = _inteface.addMetaData;
exports.getMetaData = _inteface.getMetaData;
exports.remoteMetaData = _inteface.remoteMetaData;
exports.addRelation = _inteface.addRelation;
exports.getRelations = _inteface.getRelations;
exports.removeRelation = _inteface.removeRelation;
exports.decrypt = _crypto.decrypt;
exports.encrypt = _crypto.encrypt;
exports.getMerkelRoot = _merkle.getMerkelRoot;
exports.verify = _merkle.verify;
exports.publishToIOTA = _iota.publishToIOTA;
exports.getFromIOTA = _iota.getFromIOTA;
exports.uploadToIPFS = _ipfs.uploadToIPFS;
exports.getFromIPFS = _ipfs.getFromIPFS;

// let asset = {
//     "id": "device-9845B",
//     "type": "Device",
//     "category": {
//         "value": ["sensor"]
//     },
//     "batteryLevel": {
//         "value": 0.74
//     },
//     "deviceState": {
//         "value": "ok"
//     }
// }

// let metaData = {
//     'test': 'test'
// };

// createAsset(asset.id, asset, '0x33f66b868A140F082af190f7b8Cd1eb9BAfdD801', (res) => {
//     console.log(JSON.stringify(res));
// });
// getAsset(asset.id, (res)=> {
//     console.log(JSON.stringify(res));
// });

// updateAsset(asset.id, asset, '0x33f66b868A140F082af190f7b8Cd1eb9BAfdD801', (res) => {
//         console.log(JSON.stringify(res));
//     });

// removeAsset(asset.id, '0x33f66b868A140F082af190f7b8Cd1eb9BAfdD801', (res) => {
//             console.log(JSON.stringify(res));
// });

// addMetaData(asset.id, metaData,'0x33f66b868A140F082af190f7b8Cd1eb9BAfdD801', (res) => {
//                 console.log(JSON.stringify(res));
//     });

// getMetaData(asset.id, (res) => {
//                     console.log(JSON.stringify(res));
//         });

// remoteMetaData(asset.id, 0, '0x33f66b868A140F082af190f7b8Cd1eb9BAfdD801', (res) => {
//                     console.log(JSON.stringify(res));
//         });