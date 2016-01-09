import {Map} from 'immutable';
import constants from './constants';

export default function reducer(state = Map(), action) {
  switch (action.type) {
    case constants.URL_CHANGE:
      return state.set('url', Map({params:action.params, query:action.query, path:action.path}));
    case constants.LOAD_CATEGORIES:
      return state.set('categories', Map({items:[], loading:true}));
    case constants.LOAD_PRODUCTS:
      return state.set('products', Map({items:[], categoryId:action.categoryId, sort:action.sort, loading:true}));
    case constants.LOAD_CATEGORIES_SUCCESS:
      return state.set('categories', Map({items:action.items, loading:false}));
    case constants.LOAD_PRODUCTS_SUCCESS:
      return state.update('products', products => products.merge(Map({items:action.items, loading:false})));
  }
  return state;
}