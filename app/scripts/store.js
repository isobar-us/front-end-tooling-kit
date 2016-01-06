import {createStore} from 'redux';
import {Map} from 'immutable';
import reducer from './reducer';

var store;

export function makeStore(initial_state = Map()) {
    store = createStore(reducer, initial_state)
    return store;
}

export function getStore() {
    return store;
}