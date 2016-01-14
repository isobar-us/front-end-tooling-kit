import React from 'react';
import {Route, IndexRoute} from 'react-router';

// Require App Modules
import Wrapper from './layouts/wrapper';
import Home from './components/home';
import Products from './components/products/component';
import constants from './constants';
import {getStore} from './store';

let currentPath;

function getNormalizedPath(path) {
  let pathLen = path.length;
  let lastChar = path.charAt(pathLen-1);
  if (lastChar === '/') {
    path = path.substring(0, (pathLen-1));
  }
  return path;
}

let App = React.createClass({
  componentWillReceiveProps: function(props){
    let location = props.location;
    let path = getNormalizedPath(location.pathname + location.search);
    if (path !== currentPath) {
      currentPath = path;
      let store = getStore();
      store.dispatch({type:constants.URL_CHANGE, params:props.params, query:location.query, path:path});
    }
  },
  render: function() {
    return (
      <Wrapper>
        {this.props.children}
      </Wrapper>
    );
  }
});

export let routes = (
  <Route component={App} path="/">
    <IndexRoute component={Home} />
    <Route component={Products} path="products(/:categoryId)"/>
  </Route>
);