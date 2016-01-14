import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {subscribe, unsubscribe} from '../../isomorphic';
import constants from '../../constants';
import {loadCategories} from './actionCreators';

let FilterItem = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const category = this.props.category;
    const sortObj = this.props.sortObj;
    const href = '/products/'+category.id;
    return (
      <Link className={this.props.className} href={href+sortObj.search} query={sortObj.query} to={href}>{category.name}</Link>
    );
  }
});

let FiltersList = React.createClass({
  mixins: [PureRenderMixin],
  componentWillMount: function() {
    this.subscribeId = subscribe((path, params, query, callbackFn) => {
      loadCategories(callbackFn);
    });
  },
  componentDidMount: function() {
    unsubscribe(this.subscribeId);
  },
  getSortObj: function(sort) {
    const sortObj = {str: '', search:'', query: {}};
    if (sort !== '') {
      sortObj.str = sort;
      sortObj.search = '?sort='+sort;
      sortObj.query = {sort:sort};
    }
    return sortObj;
  },
  render: function() {
    let items = [];
    const sortObj = this.getSortObj(this.props.sort);
    const href = '/products/';
    const categoryId = this.props.categoryId;
    const allClassName = (categoryId === '') ? constants.SELECTED : '';
    this.props.categories.forEach(category => {
      let className = (parseInt(categoryId, 10) === category.id) ? constants.SELECTED : '';
      items.push(<FilterItem category={category} className={className} key={category.id} sortObj={sortObj} />);
    });
    return (
      <nav>
        <Link className={allClassName} href={href+sortObj.search} query={sortObj.query} to={href}>All Products</Link>
        {items}
      </nav>
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

export default connect(select)(FiltersList);