import constants from './constants';

let titleDefault = 'Express App';
let titleDelimiter = ' - ';
let currentTitle;
let store;
let unsubscribe;

export default {
  init(storeInstance) {
    if (typeof unsubscribe !== 'undefined') unsubscribe();
    store = storeInstance;
    currentTitle = '';
    if (typeof window !== 'undefined') {
      unsubscribe = store.subscribe(function(){
        document.title = store.getState().toJS().title;
      });
    }
  },
  getDefault() {
    return titleDefault;
  },
  set(newTitle) {
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
};

