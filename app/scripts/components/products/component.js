import React from 'react';
import {connect} from 'react-redux';
import iso from '../../isomorphic';
import {getStore} from '../../store';
import {loadProducts} from './actions';
import {mountReducer} from './reducer';

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
        loadProducts(params.categoryId, query.sort, callbackFn);
        iso.unsubscribeAsyncFn(this.isoId);
      });
    }
  }
  componentDidMount() {
    let store = getStore();
    let state = store.getState().toJS();
    if (!state.products) loadProducts(state.url.params.categoryId, state.url.query.sort);
    this.unsubscribe = store.subscribe(() => {
      let state = store.getState().toJS();
      loadProducts(state.url.params.categoryId, state.url.query.sort);
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
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
    products: ((state.products) ? state.products.items : []),
    loading: ((state.products) ? state.products.loading : false)
  };
}

export default connect(select)(Products);