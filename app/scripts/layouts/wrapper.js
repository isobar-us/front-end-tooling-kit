import React from 'react';
import Header from './header';
import Aside from './aside';
import Footer from './footer';

export default React.createClass({
  render: function() {
    return (
      <div id="wrapper">
        <Header />
        <div id="main">
          <section id="content">
            {this.props.children}
          </section>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
});