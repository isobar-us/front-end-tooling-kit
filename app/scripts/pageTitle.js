import constants from './constants';
import {getStore} from './store';

export let titleDefault = 'Express App';
let titleDelimiter = ' - ';
let currentTitle;
let store;

function init() {
  store = getStore();
  store.subscribe(function(){
    if (typeof window !== 'undefined') document.title = store.getState().toJS().title;
  });
}

export function setPageTitle(newTitle) {
  if (typeof store === 'undefined') init();
  let title = titleDefault;
  if (typeof newTitle === 'string') {
    title = title + titleDelimiter + newTitle;
  } else {
    newTitle.forEach((titlePart) => {
      if (titlePart !== '') title = title + titleDelimiter + titlePart;
    });
  }
  if (currentTitle !== title) {
    currentTitle = title;
    store.dispatch({type:constants.DOC_TITLE_CHANGE, title:title});
  }
}