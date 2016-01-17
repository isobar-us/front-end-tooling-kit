let server;
let subscribers;
let subscribersCt;
let subscribersReadyCt;
let allSubscribersReady;

function subscriberReady () {
  subscribersReadyCt++;
  if (subscribersReadyCt === subscribersCt) allSubscribersReady();
}

export default {
  init() {
    server = true;
    subscribers = {};
    subscribersCt = 0;
    subscribersReadyCt = 0;
    allSubscribersReady = function(){};
  },
  isServer() {
    return server || false;
  },
  subscribeAsyncFn(fn) {
    subscribersCt++;
    subscribers[subscribersCt] = fn;
    return subscribersCt;
  },
  unsubscribeAsyncFn(key) {
    delete subscribers[key];
  },
  hasAsyncFns() {
    return ((subscribersCt !== 0) ? true : false);
  },
  doAsyncFns(path, params, query, callbackFn) {
    let keys = Object.keys(subscribers);
    if (keys.length) {
      allSubscribersReady = callbackFn;
      keys.forEach(key => {
        let fn = subscribers[key];
        if (typeof fn === 'function') fn(path, params, query, subscriberReady);
      });
    } else {
      callbackFn();
    }
  }
}