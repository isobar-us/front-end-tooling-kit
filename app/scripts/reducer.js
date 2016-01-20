import {Map, is} from 'immutable';
import constants from './constants';

let reducers = {};

export function combineReducer(obj) {
  if (typeof reducers[obj.key] === 'undefined') {
    reducers[obj.key] = obj.fn;
  } else {
    console.warn('A reducer with the key "'+obj.key+'" already exists');
  }
}

export default function reducer(state = Map(), action) {
  switch (action.type) {
    case constants.DOC_TITLE_CHANGE:
      return state.set('title', action.title);
  }
  for (let key in reducers) {
    if(reducers.hasOwnProperty(key)) {
      let nextState = reducers[key](state, action);
      if (!is(state, nextState)) return nextState;
    }
  }
  return state;
}