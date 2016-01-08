// Require Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Map} from 'immutable';
import {Router, Route} from 'react-router';
import createHistory from 'history/lib/createBrowserHistory';
let history = createHistory();

// Require App Modules
import {makeStore} from './store';
import {loadProducts, setUrlState} from './creators';
import Wrapper from './layouts/wrapper';
import Products from './components/products';

// create store, prepopulate with server data
let state = JSON.parse(decodeURI(window.__INITIAL_STATE__));
let store = makeStore( Map({categories:Map(state.categories), products:Map(state.products), url:Map(state.url)}) );

let App = React.createClass({
  componentWillReceiveProps: function(props){
    //loadProducts(props.params.categoryId, props.location.query.sort);
    setUrlState(props.params, props.location.query);
  },
  render: function() {
    return (
      <Wrapper>
        {this.props.children}
      </Wrapper>
    );
  }
});

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route component={App} path="/">
        <Route component={Products} path="products(/:categoryId)" />
      </Route>
    </Router>
  </Provider>
), document.body);