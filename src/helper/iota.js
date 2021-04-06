import Mam from '@iota/mam';
import { asciiToTrytes, trytesToAscii } from '@iota/converter';
import { getIOTAMaMConfig } from '../config';
let mamState = Mam.init(getIOTAMaMConfig().host);


const publishToIOTA = (payload) => {
    return new Promise((resolve, reject) => {
        Mam.changeMode(mamState, getIOTAMaMConfig().mode);
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
        Mam.fetch(root, getIOTAMaMConfig().mode).then((res) => {
            res.messages.forEach(message => {
                resolve(JSON.parse(trytesToAscii(message)));
            });
        }).catch((err) => {
            reject(err);
        });
    });
};

export { publishToIOTA, getFromIOTA }