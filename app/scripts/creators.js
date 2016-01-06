import request from 'superagent';
import constants from './constants';
import {getStore} from './store';

let products_req = null;

function getNormalizedProp(prop) {
    if (typeof prop === 'undefined') prop = '';
    return prop;
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
        if (products_req !== null) products_req.abort();
        store.dispatch({type:constants.LOAD_PRODUCTS, categoryId:categoryId, sort:sort});
        let url = constants.API_URL_DEV + 'products/' + categoryId;
        if (sort !== '') url = url + '?sort=' + sort;
        products_req = request.get(url).end( (err, resp) => {
            store.dispatch({type:constants.LOAD_PRODUCTS_SUCCESS, items:resp.body});
            products_req = null;
            if (typeof cbFn === 'function') cbFn();
        });
    }
}