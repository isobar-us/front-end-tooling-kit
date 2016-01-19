import request from 'superagent';
import constants from '../../constants';
import {getStore} from '../../store';
import pageTitle from '../../pageTitle';

let productsReq = null;

function getNormalizedProp(prop) {
  if (typeof prop === 'undefined') prop = '';
  return prop;
}

export function loadProducts(categoryId, sort, cbFn) {
  categoryId = getNormalizedProp(categoryId);
  sort = getNormalizedProp(sort);
  let store = getStore();
  let state = store.getState().toJS();
  if (!state.products || ( (state.products.categoryId !== categoryId) || (state.products.sort !== sort) ) ) {
    if (productsReq !== null) productsReq.abort();
    store.dispatch({type:constants.LOAD_PRODUCTS, categoryId:categoryId, sort:sort});
    pageTitle.set(['Products', categoryId]);
    let url = constants.API_URL_DEV + 'products/' + categoryId;
    if (sort !== '') url = url + '?sort=' + sort;
    productsReq = request.get(url).end( (err, resp) => {
      store.dispatch({type:constants.LOAD_PRODUCTS_SUCCESS, items:resp.body});
      productsReq = null;
      if (typeof cbFn === 'function') cbFn();
    });
  }
}