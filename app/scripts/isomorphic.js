let subscribers = [];
let subscribersReadyCt = 0;
let allSubscribersReady = function(){};

function subscriberReady () {
  subscribersReadyCt++;
  if (subscribersReadyCt === subscribers.length) allSubscribersReady();
}

export function subscribe(fn) {
  subscribers.push(fn);
  return subscribers.length;
}

export function unsubscribe(id) {
  subscribers[id] = null;
}

export function hasSubscribers() {
  return ((subscribers.length !== 0) ? true : false);
}

export function publish(path, params, query, callbackFn) {
  if (subscribers.length) {
    allSubscribersReady = callbackFn;
    subscribers.forEach(fn => {
      if (typeof fn === 'function') fn(path, params, query, subscriberReady);
    });
  } else {
    callbackFn();
  }
}