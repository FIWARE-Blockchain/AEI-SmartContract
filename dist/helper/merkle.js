'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.verify = exports.getMerkelRoot = undefined;

var _merkletreejs = require('merkletreejs');

var _cryptoJs = require('crypto-js');

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getMerkelRoot = payload => {
    return new Promise((resolve, reject) => {
        let keys = [];
        let ObjMd5 = [];
        for (var key in payload) {
            ObjMd5.push((0, _md2.default)(JSON.stringify(payload[key])));
            keys.push(key);
        }
        const leaves = ObjMd5.map(x => (0, _cryptoJs.SHA256)(x));
        const tree = new _merkletreejs.MerkleTree(leaves, _cryptoJs.SHA256);
        const root = tree.getRoot().toString('hex');
        let Obj = {
            MerkleRoot: root,
            depth: tree.getDepth(),
            keys: keys
        };
        resolve(Obj.MerkleRoot);
    });
};

const verify = (payload, keyToBeVerified, merkleRoot) => {
    return new Promise((resolve, reject) => {
        let ObjMd5 = [];
        let leaf = (0, _md2.default)(JSON.stringify(payload[keyToBeVerified]));
        leaf = (0, _cryptoJs.SHA256)(leaf);
        for (var key in payload) {
            ObjMd5.push((0, _md2.default)(JSON.stringify(payload[key])));
        }
        const leaves = ObjMd5.map(x => (0, _cryptoJs.SHA256)(x));
        const tree = new _merkletreejs.MerkleTree(leaves, _cryptoJs.SHA256);
        const proof = tree.getProof(leaf);
        resolve(tree.verify(proof, leaf, merkleRoot));
    });
};

exports.getMerkelRoot = getMerkelRoot;
exports.verify = verify;