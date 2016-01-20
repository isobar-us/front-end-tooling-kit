import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Map} from 'immutable';
import reducer from './reducer';

let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export function makeStore(initialState = Map()) {
  return createStoreWithMiddleware(reducer, initialState)
}