import request from 'superagent';
import constants from './constants';
import {getStore} from './store';
import {loadProducts} from './components/products/actionCreators';

let currentPath;

function getNormalizedPath(path) {
  let pathLen = path.length;
  let lastChar = path.charAt(pathLen-1);
  if (lastChar === '/') {
    path = path.substring(0, (pathLen-2));
  }
  return path;
}

export function getSortObj(sort) {
  const sortObj = {str: '', search:'', query: {}};
  if (sort !== '') {
    sortObj.str = sort;
    sortObj.search = '?sort='+sort;
    sortObj.query = {sort:sort};
  }
  return sortObj;
}

function onStoreChange() {
  let store = getStore();
  let state = store.getState().toJS();
  loadProducts(state.url.params.categoryId, state.url.query.sort);
}

export function bindStoreChange(path) {
  currentPath = path;
  let store = getStore();
  store.subscribe(onStoreChange);
}

export function setUrlState(params, query, path) {
  path = getNormalizedPath(path);
  let store = getStore();
  if (path !== currentPath) {
    currentPath = path;
    store.dispatch({type:constants.URL_CHANGE, params:params, query:query, path:path});
  }
}

export function loadCategories(cbFn) {
  let store = getStore();
  store.dispatch({type:constants.LOAD_CATEGORIES});
  request.get(constants.API_URL_DEV+'categories').end( (err, resp) => {
    store.dispatch({type:constants.LOAD_CATEGORIES_SUCCESS, items:resp.body});
    if (typeof cbFn === 'function') cbFn();
  });
}