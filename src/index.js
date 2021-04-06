import { 
    createAsset, 
    getAsset, 
    updateAsset, 
    removeAsset, 
    addMetaData, 
    getMetaData, 
    remoteMetaData, 
    addRelation, 
    getRelations, 
    removeRelation 
} from './Interface/inteface';

import { decrypt, encrypt } from './helper/crypto';
import { getMerkelRoot, verify } from './helper/merkle';
import { publishToIOTA, getFromIOTA } from './helper/iota';
import { uploadToIPFS, getFromIPFS } from './helper/ipfs';
import { getIOTAMaMConfig, setIOTAMaMConfig, getIPFSConfig, setIPFSConfig, getServiceConfig, setServiceConfig, storageType} from './config';

export {
    createAsset, 
    getAsset, 
    updateAsset, 
    removeAsset, 
    addMetaData, 
    getMetaData, 
    remoteMetaData, 
    addRelation, 
    getRelations, 
    removeRelation,
    decrypt, 
    encrypt,
    getMerkelRoot, 
    verify,
    publishToIOTA, 
    getFromIOTA,
    uploadToIPFS, 
    getFromIPFS,
    getServiceConfig,
    setServiceConfig,
    getIOTAMaMConfig,
    setIOTAMaMConfig,
    getIPFSConfig,
    setIPFSConfig,
    storageType
}


// setServiceConfig({
//     contractAddress: '0x6D8a94Aa1098bc9feB9BC3083f5074013369540b',
//     rpcEndpoint: 'http://localhost:8545',
//     gasLimit: 3000000,
//     encrpytionMode: false,
//     encyptionConfig: { algorithm: 'aes-256-ctr', secret: '' },
//     storageMode: 'ipfs',
//     txSignMode: false
//   });

// console.log(getServiceConfig());

// setIOTAMaMConfig({ host: 'https://nodes.devnet.iota.org', mode: 'private' });

// console.log(getIOTAMaMConfig());

// setIPFSConfig({
//     host: 'ipfs.infura.io',
//     port: 5001,
//     protocol: 'https',
//     headers: { authorization: '' },
//     dagOptions: { format: 'dag-cbor', hashAlg: 'sha2-256' }
//   });
// console.log(getIPFSConfig());

// let asset = {
//     "id": "device-9841q",
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

// // let metaData = {
// //     'test': 'test'
// // };

// createAsset(asset.id, asset, '0x810c640F1854e9EDf7Fd2578C746F54712C88fc6', (res) => {
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
