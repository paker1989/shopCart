/**
 * @see https://stackoverflow.com/questions/33537769/how-to-upload-a-file-with-ajax-in-small-chunks-and-check-for-fails-re-upload-th
 * @param {*} file 
 * @param {*} chunkSize 
 * @param {*} cb 
 */
export function sendFileByChunk(file, chunkSize, cb) {
    let offset = 0;
    let totalSize = file.size;
    let incre = 0;

    return new Promise(function (resolve) {
        const onload = function (evt) {
            if (evt.target.error) {
                console.log('read error: ' + evt.target.error);
                resolve();
                return;
            } else {
                offset += evt.target.result.length;
                cb(evt.target.result, ++incre);
            }

            if (offset >= totalSize) {
                console.log('read done');
                resolve();
                return;
            }

            console.log('read as block');
            readAsBlock(offset, chunkSize, file);
        }

        const readAsBlock = function (offset, length, file) {
            let fr = new FileReader();
            let slicedBlob = file.slice(offset, length + offset);

            fr.onload = onload;
            fr.readAsText(slicedBlob);
        }

        readAsBlock(offset, chunkSize, file);
    })
}

// function parseFile(file, callback) {
//     var fileSize   = file.size;
//     var chunkSize  = 64 * 1024; // bytes
//     var offset     = 0;
//     var self       = this; // we need a reference to the current object
//     var chunkReaderBlock = null;

//     var readEventHandler = function(evt) {
//         if (evt.target.error == null) {
//             offset += evt.target.result.length;
//             callback(evt.target.result); // callback for handling read chunk
//         } else {
//             console.log("Read error: " + evt.target.error);
//             return;
//         }
//         if (offset >= fileSize) {
//             console.log("Done reading file");
//             return;
//         }

//         // of to the next chunk
//         chunkReaderBlock(offset, chunkSize, file);
//     }

//     chunkReaderBlock = function(_offset, length, _file) {
//         var r = new FileReader();
//         var blob = _file.slice(_offset, length + _offset);
//         r.onload = readEventHandler;
//         r.readAsText(blob);
//     }

//     // now let's start the read with the first block
//     chunkReaderBlock(offset, chunkSize, file);
// }