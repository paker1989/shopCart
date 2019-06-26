import { resolve } from "url";

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
    let promises = [];

    return new Promise((resolve) => {
        const readAsBlock = function (offset, length, file) {
            let slicedBlob = file.slice(offset, length + offset);
            let newFile = new File([slicedBlob], `${file.name}_chunk_${incre}`);

            offset += newFile.size;
            incre += 1;

            promises.push(cb(newFile, incre));

            if (offset >= totalSize) {
                return;
            }
            readAsBlock(offset, chunkSize, file);
        }

        readAsBlock(offset, chunkSize, file, promises);


        Promise
            .all(promises)
            .then(() => {
                resolve();
            })
    })
}