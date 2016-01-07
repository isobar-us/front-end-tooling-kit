import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux'

let ProductItem = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
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
});

let Products = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
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
});

function select(state) {
  state = state.toJS();
  return {
    products: state.products.items,
    loading: state.products.loading
  };
}

export default connect(select)(Products);