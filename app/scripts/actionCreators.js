import constants from './constants';
import {getStore} from './store';

let currentPath;

function getNormalizedPath(path) {
  let pathLen = path.length;
  let lastChar = path.charAt(pathLen-1);
  if (lastChar === '/') {
    path = path.substring(0, (pathLen-2));
  }
  return path;
}

export function setUrlState(params, query, path) {
  path = getNormalizedPath(path);
  let store = getStore();
  if (path !== currentPath) {
    currentPath = path;
    store.dispatch({type:constants.URL_CHANGE, params:params, query:query, path:path});
  }
}