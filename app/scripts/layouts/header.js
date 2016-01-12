import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux'
import {getSortObj, loadCategories} from '../creators';
import {subscribe, unsubscribe} from '../isomorphic';
import FiltersList from '../components/filtersList';

let Header = React.createClass({
  mixins: [PureRenderMixin],
  componentWillMount: function() {
    this.subscribeId = subscribe((path, params, query, callbackFn) => {
      loadCategories(callbackFn);
    });
  },
  componentDidMount: function() {
    unsubscribe(this.subscribeId);
  },
  render: function() {
    const sortObj = getSortObj(this.props.sort);
    return (
      <header>
        <div><h1>&#60;codetest&#62;</h1></div>
        <FiltersList categories={this.props.categories} categoryId={this.props.categoryId} sortObj={sortObj} />
      </header>
    );
  }
});

function select(state) {
  state = state.toJS();
  return {
    categories: ((state.categories) ? state.categories.items : []),
    categoryId: ((state.products) ? state.products.categoryId : ''),
    sort: ((state.products) ? state.products.sort : '')
  };
}

export default connect(select)(Header);