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
  async(dispatch, fn, data) {
    if (!Array.isArray(data)) data = [];
    if (allowSubscribe) {
      subscribers.push({dispatch, fn, data});
    } else {
      dispatch(fn(...data));
    }
  },
  hasAsyncFns() {
    return (subscribers.length !== 0);
  },
  doAsyncFns(callbackFn) {
    allowSubscribe = false;
    if (subscribers.length) {
      allSubscribersReady = callbackFn;
      subscribers.forEach(obj => {
        obj.dispatch(obj.fn(...obj.data, subscriberReady));
      });
    } else {
      callbackFn();
    }
  }
}