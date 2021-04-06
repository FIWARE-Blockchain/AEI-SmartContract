'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getFromIOTA = exports.publishToIOTA = undefined;

var _mam = require('@iota/mam');

var _mam2 = _interopRequireDefault(_mam);

var _converter = require('@iota/converter');

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let mamState = _mam2.default.init((0, _config.getIOTAMaMConfig)().host);

const publishToIOTA = payload => {
    return new Promise((resolve, reject) => {
        _mam2.default.changeMode(mamState, (0, _config.getIOTAMaMConfig)().mode);
        const trytes = (0, _converter.asciiToTrytes)(JSON.stringify(payload));
        const message = _mam2.default.create(mamState, trytes);
        mamState = message.state;
        // Attach the message to the Tangle
        _mam2.default.attach(message.payload, message.address, 3, 9).then(res => {
            resolve(message.root);
        }).catch(err => {
            reject(err);
        });
    });
};

const getFromIOTA = root => {
    return new Promise((resolve, reject) => {
        _mam2.default.fetch(root, (0, _config.getIOTAMaMConfig)().mode).then(res => {
            res.messages.forEach(message => {
                resolve(JSON.parse((0, _converter.trytesToAscii)(message)));
            });
        }).catch(err => {
            reject(err);
        });
    });
};

exports.publishToIOTA = publishToIOTA;
exports.getFromIOTA = getFromIOTA;