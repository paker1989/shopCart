const callbackList = [];

const find = (list, predict) => {
  for (let i=0; i < list.length; i++) {
    if (predict(list[i], i, list)) {
      return list[i];
    }
  }
  return null;
}

const findIndex = (list, predict) => {
  for (let i=0; i < list.length; i++) {
    if (predict(list[i], i, list)) {
      return i;
    }
  }
  return -1;
}


const raf =  (callback) => {
  const entry = find(callbackList, (item) => item.callback === callback);
  if (entry) {
    return entry.requestId;
  }

  const requestId = requestAnimationFrame((ts) => {
    const index = findIndex(callbackList, (item) => item.callback === callback);
    callbackList.splice(index, 1);
    callback(ts);
  })

  callbackList.push({
    requestId,
    callback
  })

  return requestId;
}

const caf = (requestId) => {
  const index = findIndex(callbackList, item => item.requestId === requestId)
  if (~index) {
      callbackList.splice(index, 1)
  }
  cancelAnimationFrame(requestId);
}

export {
  raf as requestAnimationFrame,
  caf as cancelAnimationFrame
}