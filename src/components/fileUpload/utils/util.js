export const _KB_LIMIT = 1024;
export const _MB_LIMIT = 1024 * _KB_LIMIT;
export const _GB_LIMIT = 1024 * _MB_LIMIT;


export const DEFAULT_ACCEPT = {
    image: 'image/gif, image/jpeg, image/png, image/bmp',
    text: 'text/plain, text/html'
}

export const UID_KEY = 'uid_key';

export function getAcceptFromArray(array) {
    return array.reduce(function (accepts, a) {
        if (DEFAULT_ACCEPT[a]) {
            accepts.push(DEFAULT_ACCEPT[a]);
            return accepts;
        }
    }, [])
        .join(', ');
}

export function checkTypeIncludes(type, target) {
    return typeof type === 'string' ? type == target :
        type.includes(target);
}

export function isValidFileType() {
    return true; // todo
}

export function isImage(target) {
    // console.log(target);
    const imageRexp = new RegExp(/image\/*/, 'i');
    return imageRexp.test(target.toLowerCase());
}

export function formatSize(rawSizeBytes, toFixed) {
    toFixed = toFixed || 1;
    let unit = rawSizeBytes > _GB_LIMIT ? 'GB'
        : rawSizeBytes > _MB_LIMIT ? 'MB'
            : rawSizeBytes > _KB_LIMIT ? 'KB'
                : 'B';

    switch (unit) {
        case 'GB':
            return (rawSizeBytes / _GB_LIMIT).toFixed(toFixed) + ' GB';
        case 'MB':
            return (rawSizeBytes / _MB_LIMIT).toFixed(toFixed) + ' MB';
        case 'KB':
            return (rawSizeBytes / _KB_LIMIT).toFixed(toFixed) + ' KB';
        default:
            return rawSizeBytes.toFixed(toFixed) + ' B';
    }
}

export function swapInArray(oldIndex, newIndex, array) {
    if (!array || !array.length)
        return;

    let temp = array[oldIndex];

    array[oldIndex] = array[newIndex];
    array[newIndex] = temp;

    return array;
}

// document.getElementById('get-time').onclick = function () {
//     let file = document.getElementById('file').files[0];
//     let fr = new FileReader();
//     let CHUNK_SIZE = 10 * 1024;
//     let startTime, endTime;
//     let reverse = false;
//     fr.onload = function () {
//         let buffer = new Uint8Array(fr.result);
//         let timeReg = /\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}/;
//         for (let i = reverse ? buffer.length - 1 : 0; reverse ? i > -1 : i < buffer.length; reverse ? i-- : i++) {
//             if (buffer[i] === 10) {
//                 let snippet = new TextDecoder('utf-8').decode(buffer.slice(i + 1, i + 20));
//                 if (timeReg.exec(snippet)) {
//                     if (!reverse) {
//                         startTime = snippet;
//                         reverse = true;
//                         seek();
//                     } else {
//                         endTime = snippet;
//                         alert(`Log time range: ${startTime} ~ ${endTime}`);
//                     }
//                     break;
//                 }
//             }
//         }
//     }
//     seek();
//     function seek() {
//         let start = reverse ? file.size - CHUNK_SIZE : 0;
//         let end = reverse ? file.size : CHUNK_SIZE;
//         let slice = file.slice(start, end);
//         fr.readAsArrayBuffer(slice);
//     }
// }