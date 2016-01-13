import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import FiltersList from '../components/filtersList';

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return (
      <header>
        <div><h1>&#60;codetest&#62;</h1></div>
        <FiltersList />
      </header>
    );
  }
});