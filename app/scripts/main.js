// Require Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Map} from 'immutable';
import {Router,Route} from 'react-router';
import createHistory from 'history/lib/createBrowserHistory';
var history = createHistory();

// Require App Modules
import reducer from './reducer';
import Products from './products';
import {makeStore} from './store';
import {loadProducts} from './creators';

// create store, prepopulate with server data
let state = JSON.parse(decodeURI(window.__INITIAL_STATE__));
let store = makeStore( Map({categories:Map(state.categories), products:Map(state.products)}) );

var App = React.createClass({
    componentWillReceiveProps: function(props){
        loadProducts(props.params.categoryId, props.location.query.sort);
    },
    render: function() {
        return (<Products />);
	}
});

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <Route path="products(/:categoryId)" component={Products} />
            </Route>
        </Router>
    </Provider>
), document.getElementById("body"));