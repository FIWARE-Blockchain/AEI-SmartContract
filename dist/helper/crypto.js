'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decrypt = exports.encrypt = undefined;

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const encrypt = text => {
    var cipher = _crypto2.default.createCipher((0, _config.getServiceConfig)().encyptionConfig.algorithm, (0, _config.getServiceConfig)().encyptionConfig.secret);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
};

const decrypt = hash => {
    var decipher = _crypto2.default.createDecipher((0, _config.getServiceConfig)().encyptionConfig.algorithm, (0, _config.getServiceConfig)().encyptionConfig.secret);
    var dec = decipher.update(hash, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};

exports.encrypt = encrypt;
exports.decrypt = decrypt;