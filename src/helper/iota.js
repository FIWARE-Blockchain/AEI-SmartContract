import Mam from '@iota/mam';
import { asciiToTrytes, trytesToAscii } from '@iota/converter';
import { IOTAConfig } from '../config';
let mamState = Mam.init(IOTAConfig.host);


const publishToIOTA = (payload) => {
    return new Promise((resolve, reject) => {
        const trytes = asciiToTrytes(JSON.stringify(payload));
        const message = Mam.create(mamState, trytes);
        mamState = message.state;
        // Attach the message to the Tangle
        Mam.attach(message.payload, message.address, 3, 9).then((res) => {
            resolve(message.root);
        }).catch((err) => {
            reject(err);
        });
    });
};

const getFromIOTA = (root) => {
    return new Promise((resolve, reject) => {
        Mam.fetch(root, IOTAConfig.mode).then((res) => {
            res.messages.forEach(message => {
                resolve(JSON.parse(trytesToAscii(message)));
            });
        }).catch((err) => {
            reject(err);
        });
    });
};

export { publishToIOTA, getFromIOTA }