let subscribers = [];
let subscribersReadyCt = 0;
let allSubscribersReady = function(){};

function subscriberReady () {
  subscribersReadyCt++;
  if (subscribersReadyCt === subscribers.length) allSubscribersReady();
}

export default {
  reset() {
    subscribers = [];
    subscribersReadyCt = 0;
  },
  subscribeAsyncFn(fn) {
    subscribers.push(fn);
    return subscribers.length;
  },
  unsubscribeAsyncFn(id) {
    subscribers[id] = null;
  },
  hasAsyncFns() {
    return ((subscribers.length !== 0) ? true : false);
  },
  doAsyncFns(path, params, query, callbackFn) {
    if (subscribers.length) {
      allSubscribersReady = callbackFn;
      subscribers.forEach(fn => {
        if (typeof fn === 'function') fn(path, params, query, subscriberReady);
      });
    } else {
      callbackFn();
    }
  }
}