//import {combineReducers} from 'redux';
import {Map, is} from 'immutable';
import constants from './constants';
import products from './components/products/reducer';
import categories from './components/filtersList/reducer';

function url(state = Map(), action) {
  switch (action.type) {
    case constants.URL_CHANGE:
      return state.set('url', Map({params:action.params, query:action.query, path:action.path}));
  }
  return state;
}

let reducers = [categories, products, url];

export default function reducer(state = Map(), action) {
  for (let i=0; i<reducers.length; i++) {
    let nextState = reducers[i](state, action);
    if (!is(state, nextState)) return nextState;
  }
  return state;
}