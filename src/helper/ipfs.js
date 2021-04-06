import IPFS from 'ipfs-api';
import { getIPFSConfig, getServiceConfig } from '../config';
import { encrypt, decrypt } from './crypto';
const ipfs = new IPFS(getIPFSConfig());

const uploadToIPFS = (payload) => {
    return new Promise((resolve, reject) => {
        let data;
        if (getServiceConfig().encrpytionMode) {
            data = encrypt(JSON.stringify(payload));
        } else {
            data = payload;
        }
        ipfs.dag.put(data, getIPFSConfig().dagOptions).then((cid) => {
            resolve(cid.toString());
        }).catch((err) => {
            reject(err);
        });
    });
};

const getFromIPFS = (cid) => {
    return new Promise((resolve, reject) => {
        let data;
        ipfs.dag.get(cid).then((res) => {
            if (getServiceConfig().encrpytionMode) {
                data = JSON.parse(decrypt(res.value));
            } else {
                data = JSON.parse(res.value);
            }
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
};

export { uploadToIPFS, getFromIPFS }



