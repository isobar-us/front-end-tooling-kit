import React from 'react';
import {connect} from 'react-redux';
import {loadProducts, getNormalizedProp} from './actions';
import reducer from './reducer';
import {combineReducer} from '../../reducer';

export class ProductItem extends React.Component {
  render() {
    const image = '/img/'+this.props.product.image;
    const price = 'Price.......$'+this.props.product.price;
    return (
      <li>
        <a href="#">
          <img alt="" src={image} />
          <h3>{ this.props.product.name }</h3>
          <span>{price}</span>
        </a>
      </li>
    );
  }
}

export class Products extends React.Component {
  componentWillMount() {
    combineReducer(reducer);
    if (this.props.products.length === 0) {
      this.props.dispatch( loadProducts(this.props.params.categoryId, this.props.location.query.sort) );
    }
  }
  componentWillReceiveProps(nextProps) {
    let categoryId = getNormalizedProp(nextProps.params.categoryId);
    let sort = getNormalizedProp(nextProps.location.query.sort);
    if ( (categoryId !== nextProps.categoryId) || (sort !== nextProps.sort) ) {
      this.props.dispatch( loadProducts(categoryId, sort) );
    }
  }
  render() {
    let items = [];
    this.props.products.forEach(product => {
      items.push(<ProductItem key={product.id} product={product} />);
    });
    return (
      <ul className="products clearfix">
        {items}
      </ul>
    );
  }
}

function select(state) {
  state = state.toJS();
  return {
    categoryId: ((state.products) ? state.products.categoryId : ''),
    sort: ((state.products) ? state.products.sort : ''),
    products: ((state.products) ? state.products.items : []),
    loading: ((state.products) ? state.products.loading : false)
  };
}

export default connect(select)(Products);