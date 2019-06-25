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
            // let fr = new FileReader();
            // let slicedBlob = file.slice(offset, length + offset);

            // fr.onload = onload;
            // fr.readAsText(slicedBlob);
            let slicedBlob = file.slice(offset, length + offset);
            let newFile = new File([slicedBlob], `${file.name}_${incre}`);
            console.log(newFile);
            offset += newFile.size;
            incre += 1;
            console.log('offset = ' + offset);

            cb(newFile, incre);

            if (offset >= totalSize) {
                console.log('read done');
                resolve();
                return;
            }

            console.log('read as block');
            readAsBlock(offset, chunkSize, file); 
        }

        readAsBlock(offset, chunkSize, file);
    })
}