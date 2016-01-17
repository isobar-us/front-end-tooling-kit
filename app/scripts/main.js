// Require Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {fromJS} from 'immutable';
import {Router} from 'react-router';
import createHistory from 'history/lib/createBrowserHistory';
let history = createHistory();

// Require App Modules
import {makeStore} from './store';
import {routes} from './routes';
import pageTitle from '../scripts/pageTitle';

// create store, prepopulate with server data
let state = fromJS(JSON.parse(decodeURI(window.__INITIAL_STATE__)));
let store = makeStore(state);
pageTitle.init(store);

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>
), document.getElementById("container"));