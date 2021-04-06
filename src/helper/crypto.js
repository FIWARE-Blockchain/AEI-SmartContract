import crypto from 'crypto';
import { getServiceConfig } from '../config';

const encrypt = (text) => {
    var cipher = crypto.createCipher(getServiceConfig().encyptionConfig.algorithm, getServiceConfig().encyptionConfig.secret)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
};

const decrypt = (hash) => {
    var decipher = crypto.createDecipher(getServiceConfig().encyptionConfig.algorithm, getServiceConfig().encyptionConfig.secret)
    var dec = decipher.update(hash, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
};

export { encrypt, decrypt }