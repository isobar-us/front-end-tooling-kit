// Require Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Map} from 'immutable';
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
  immutableState = immutableState.set(key, Map(state[key]));
});
let store = makeStore(immutableState);

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>
), document.getElementById("container"));