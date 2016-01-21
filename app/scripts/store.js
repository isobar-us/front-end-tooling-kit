import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Map} from 'immutable';
import reducer from './reducer';
import iso from './isomorphic';

let createStoreWithMiddleware = applyMiddleware(thunk, iso.middleware)(createStore);

export function makeStore(initialState = Map()) {
  return createStoreWithMiddleware(reducer, initialState)
}