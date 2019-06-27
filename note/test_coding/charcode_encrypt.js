function encrpt(text, offset) {
    const size = text.length || 0;
    const encryptTexts = new Array(size);
    for (let i = 0; i < size; i++) {
        encryptTexts[i] = String.prototype.charCodeAt.call(text, i) + offset;
    }

    return String.fromCharCode(...encryptTexts);
}

function decrypt(encryptedTexts, offset) {
    const size = encryptedTexts.length || 0;
    const decrypted = new Array(size);
    for (let i = 0; i < size; i++) {
        decrypted[i] = String.prototype.charCodeAt.call(encryptedTexts, i) - offset;
    }
    return String.fromCharCode(...decrypted);
}

const _offset_ = 200;

let encrypted = encrpt('hello world', _offset_);
console.log(encrypted);
console.log('===========');
let decrypted = decrypt(encrypted, _offset_);
console.log('decrypted = ' + decrypted);

