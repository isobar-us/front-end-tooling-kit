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
  hasAsyncFns() {
    return (subscribers.length !== 0);
  },
  doAsyncFns(callbackFn) {
    allowSubscribe = false;
    if (subscribers.length) {
      allSubscribersReady = callbackFn;
      subscribers.forEach(obj => {
        obj.action(obj.dispatch, obj.getState, subscriberReady);
      });
    } else {
      callbackFn();
    }
  },
  middleware: store => next => action => {
    if (!action.async) {
      return next(action);
    } else if (allowSubscribe) {
      subscribers.push({action:action.async, dispatch:store.dispatch, getState:store.getState});
    } else {
      return action.async(store.dispatch, store.getState, function(){});
    }
  }
}