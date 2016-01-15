// Require Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Map, List} from 'immutable';
import {Router} from 'react-router';
import createHistory from 'history/lib/createBrowserHistory';
let history = createHistory();

// Require App Modules
import {makeStore} from './store';
import {routes} from './routes';

// create store, prepopulate with server data
let state = JSON.parse(decodeURI(window.__INITIAL_STATE__));
let immutableState = Map();
Object.keys(state).forEach(key => {
  let value = state[key];
  if (Array.isArray(value)) {
    immutableState = immutableState.set(key, List(value));
  } else if ((value !== null) && (typeof value === 'object')) {
    immutableState = immutableState.set(key, Map(value));
  } else {
    immutableState = immutableState.set(key, value);
  }
});
let store = makeStore(immutableState);

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>
), document.getElementById("container"));