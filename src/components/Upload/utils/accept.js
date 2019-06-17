export const DEFAULT_ACCEPT = {
    image: 'image/gif, image/jpeg, image/png, image/bmp',
    text: 'text/plain, text/html'
}

export function getAcceptFromArray(array) {
  return array.reduce(function(accepts, a) {
    if (DEFAULT_ACCEPT[a]) {
        accepts.push(DEFAULT_ACCEPT[a]);
        return accepts;
    }
  }, [])
  .join(',');
}
  