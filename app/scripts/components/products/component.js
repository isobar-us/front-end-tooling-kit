import React from 'react';
import {connect} from 'react-redux';
import iso from '../../isomorphic';
import {loadProducts} from './actions';
import {mountReducer} from './reducer';

function getNormalizedProp(prop) {
  if (typeof prop === 'undefined') prop = '';
  return prop;
}

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
    mountReducer();
    if (iso.isServer()) {
      this.isoId = iso.subscribeAsyncFn((path, params, query, callbackFn) => {
        this.props.dispatch( loadProducts(getNormalizedProp(params.categoryId), getNormalizedProp(query.sort), callbackFn) );
        iso.unsubscribeAsyncFn(this.isoId);
      });
    }
  }
  componentDidMount() {
    if (this.props.products.length === 0) this.props.dispatch( loadProducts(getNormalizedProp(this.props.params.categoryId), getNormalizedProp(this.props.location.query.sort)) );
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