import React from 'react';
import {Route, IndexRoute} from 'react-router';

// Require App Modules
import Wrapper from './layouts/wrapper';
import Home from './components/home';
import Products from './components/products/component';

class App extends React.Component {
  render() {
    return (
      <Wrapper>
        {this.props.children}
      </Wrapper>
    );
  }
}

export let routes = (
  <Route component={App} path="/">
    <IndexRoute component={Home} />
    <Route component={Products} path="products(/:categoryId)"/>
  </Route>
);