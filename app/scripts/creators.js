import request from 'superagent';
import constants from './constants';
import {getStore} from './store';

let productsReq = null;
let currentPath;

function getNormalizedProp(prop) {
  if (typeof prop === 'undefined') prop = '';
  return prop;
}

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
  if (state.url.path !== currentPath) {
    currentPath = state.url.path;
    loadProducts(state.url.params.categoryId, state.url.query.sort);
  }
}

export function bindStoreChange(path) {
  currentPath = path;
  let store = getStore();
  store.subscribe(onStoreChange);
}

export function setUrlState(params, query, path, cbFn) {
  path = getNormalizedPath(path);
  let store = getStore();
  store.dispatch({type:constants.URL_CHANGE, params:params, query:query, path:path});
  if (typeof cbFn === 'function') cbFn();
}

export function loadCategories(cbFn) {
  let store = getStore();
  store.dispatch({type:constants.LOAD_CATEGORIES});
  request.get(constants.API_URL_DEV+'categories').end( (err, resp) => {
    store.dispatch({type:constants.LOAD_CATEGORIES_SUCCESS, items:resp.body});
    if (typeof cbFn === 'function') cbFn();
  });
}

export function loadProducts(categoryId, sort, cbFn) {
  categoryId = getNormalizedProp(categoryId);
  sort = getNormalizedProp(sort);
  let store = getStore();
  let state = store.getState().toJS();
  if (!state.products || ( (state.products.categoryId !== categoryId) || (state.products.sort !== sort) ) ) {
    if (productsReq !== null) productsReq.abort();
    store.dispatch({type:constants.LOAD_PRODUCTS, categoryId:categoryId, sort:sort});
    let url = constants.API_URL_DEV + 'products/' + categoryId;
    if (sort !== '') url = url + '?sort=' + sort;
    productsReq = request.get(url).end( (err, resp) => {
      store.dispatch({type:constants.LOAD_PRODUCTS_SUCCESS, items:resp.body});
      productsReq = null;
      if (typeof cbFn === 'function') cbFn();
    });
  }
}