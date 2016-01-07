let creatorsCt = 0;
let creatorsReadyCt = 0;
let allCreatorsReady = function(){};

function creatorReady () {
  creatorsReadyCt++;
  if (creatorsReadyCt === creatorsCt) allCreatorsReady();
}

// Loop through and dispatch all actions passed in required to render on server
export function loadStoreData(creators, callbackFn ) {
  allCreatorsReady = callbackFn;
  creators.forEach((creator) => {
    creatorsCt++;
    if (typeof creator.data === 'object' && creator.data.length) {
      creator.fn(...creator.data, creatorReady);
    } else {
      creator.fn(creatorReady);
    }
  });
}