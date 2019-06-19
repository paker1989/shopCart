export const DEFAULT_ACCEPT = {
    image: 'image/gif, image/jpeg, image/png, image/bmp',
    text: 'text/plain, text/html'
}

export const UID_KEY = 'uid_key';

export function getAcceptFromArray(array) {
  return array.reduce(function(accepts, a) {
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