import React from 'react';
import Header from './header';
import Aside from './aside';
import Footer from './footer';

export default class extends React.Component {
  render() {
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
}