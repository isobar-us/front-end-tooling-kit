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
import {bindStoreChange} from './creators';
import {routes} from './routes';

// create store, prepopulate with server data
let state = JSON.parse(decodeURI(window.__INITIAL_STATE__));
let store = makeStore( Map({categories:Map(state.categories), products:Map(state.products), url:Map(state.url)}) );
bindStoreChange(state.url.path);

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>
), document.getElementById("container"));