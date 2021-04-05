import crypto from 'crypto';
import { encyptionConfig } from '../config';

const encrypt = (text) => {
    var cipher = crypto.createCipher(encyptionConfig.algorithm, encyptionConfig.secret)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
};

const decrypt = (hash) => {
    var decipher = crypto.createDecipher(encyptionConfig.algorithm, encyptionConfig.secret)
    var dec = decipher.update(hash, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
};

export { encrypt, decrypt }