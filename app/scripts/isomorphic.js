let allowSubscribe;
let subscribers;
let subscribersReadyCt;
let allSubscribersReady;

function subscriberReady() {
  subscribersReadyCt++;
  if (subscribersReadyCt === subscribers.length) allSubscribersReady();
}

export default {
  init() {
    allowSubscribe = true;
    subscribers = [];
    subscribersReadyCt = 0;
  },
  async(fn) {
    if (allowSubscribe) {
      subscribers.push(fn);
    } else {
      fn();
    }
  },
  hasAsyncFns() {
    return (subscribers.length !== 0);
  },
  doAsyncFns(callbackFn) {
    allowSubscribe = false;
    if (subscribers.length) {
      allSubscribersReady = callbackFn;
      subscribers.forEach(fn => {
        if (typeof fn === 'function') fn(subscriberReady);
      });
    } else {
      callbackFn();
    }
  }
}