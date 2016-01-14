import {createStore} from 'redux';
import {Map} from 'immutable';
import reducer from './reducer';

let store;

export function makeStore(initialState = Map()) {
  store = createStore(reducer, initialState);
  return store;
}

export function getStore() {
  return store;
}