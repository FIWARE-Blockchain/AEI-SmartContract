import { createAsset, getAsset, updateAsset, removeAsset, addMetaData, getMetaData, remoteMetaData } from './Interface/inteface';
// var helper = require('./helper/merkle');
// var ipfs = require('./helper/ipfs');
// var iota = require('./helper/iota');
let asset = {
    "id": "device-9845B",
    "type": "Device",
    "category": {
        "value": ["sensor"]
    },
    "batteryLevel": {
        "value": 0.74
    },
    "deviceState": {
        "value": "ok"
    }
}

let metaData = {
    'test': 'test'
};


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

getMetaData(asset.id, (res) => {
                    console.log(JSON.stringify(res));
        });

// remoteMetaData(asset.id, 0, '0x33f66b868A140F082af190f7b8Cd1eb9BAfdD801', (res) => {
//                     console.log(JSON.stringify(res));
//         });
    