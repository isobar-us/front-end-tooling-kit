//import {combineReducers} from 'redux';
import {Map, is} from 'immutable';
import constants from './constants';

let reducers = [];

export function combineReducer(fn) {
  if (typeof fn === 'function') reducers.push(fn);
}

export default function reducer(state = Map(), action) {
  switch (action.type) {
    case constants.URL_CHANGE:
      return state.set('url', Map({params:action.params, query:action.query, path:action.path}));
    case constants.DOC_TITLE_CHANGE:
      return state.set('title', action.title);
  }
  for (let i=0; i<reducers.length; i++) {
    let nextState = reducers[i](state, action);
    if (!is(state, nextState)) return nextState;
  }
  return state;
}