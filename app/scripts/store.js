import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Map} from 'immutable';
import reducer from './reducer';

let store;
let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export function makeStore(initialState = Map()) {
  store = createStoreWithMiddleware(reducer, initialState)
  return store;
}

export function getStore() {
  return store;
}