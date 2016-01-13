import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux'
import {Link} from 'react-router';
import constants from '../constants';
import {getSortObj} from '../creators';

let SortList = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    let href = '/products/';
    let sortClasses = { alpha:'', priceasc:'', pricedesc:'' };
    if (this.props.categoryId !== '') {
      href = href + this.props.categoryId;
    }
    switch (getSortObj(this.props.sort).str) {
      case 'priceasc':
        sortClasses.priceasc = constants.SELECTED;
        break;
      case 'pricedesc':
        sortClasses.pricedesc = constants.SELECTED;
        break;
      default:
        sortClasses.alpha = constants.SELECTED;
    }
    return (
      <div>
        Sort by:
        <Link className={sortClasses.alpha} href={href} to={href}>Alphabetically</Link>
        <Link className={sortClasses.priceasc} href={href+'?sort=priceasc'} query={{sort:'priceasc'}} to={href} >Price: Low to High</Link>
        <Link className={sortClasses.pricedesc} href={href+'?sort=pricedesc'} query={{sort:'pricedesc'}} to={href} >Price: High to Low</Link>
      </div>
    );
  }
});

function select(state) {
  state = state.toJS();
  return {
    categoryId: ((state.products) ? state.products.categoryId : ''),
    sort: ((state.products) ? state.products.sort : '')
  };
}

export default connect(select)(SortList);