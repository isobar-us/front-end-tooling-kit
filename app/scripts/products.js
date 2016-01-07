import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux'
import {Link} from 'react-router';

const SELECTED = 'selected';

let Products = React.createClass({
  mixins: [PureRenderMixin],

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
    const sortObj = this.getSortObj(this.props.sort);
    return (
      <div id="wrapper">
        <header>
          <div><h1>&#60;codetest&#62;</h1></div>
          <FiltersList categories={this.props.categories} categoryId={this.props.categoryId} sortObj={sortObj} />
        </header>
        <div id="main">
          <section id="content">
            <ProductsList products={this.props.products} />
          </section>
          <aside>
            <SortList categoryId={this.props.categoryId} sortObj={sortObj} />
          </aside>
        </div>
        <footer>
          <span>&copy; Lorem ipsum dolor sit amet.</span>
        </footer>
      </div>
    );
  }
});

let SortList = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const SELECTED = 'selected';
    let href = '/products/';
    let sortClasses = { alpha:'', priceasc:'', pricedesc:'' };
    if (this.props.categoryId !== '') {
      href = href + this.props.categoryId;
    }
    switch (this.props.sortObj.str) {
      case 'priceasc':
        sortClasses.priceasc = SELECTED;
        break;
      case 'pricedesc':
        sortClasses.pricedesc = SELECTED;
        break;
      default:
        sortClasses.alpha = SELECTED;
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
  render: function() {
    let items = [];
    const sortObj = this.props.sortObj;
    const href = '/products/';
    const categoryId = this.props.categoryId;
    const allClassName = (categoryId === '') ? SELECTED : '';
    this.props.categories.forEach(category => {
      let className = (parseInt(categoryId, 10) === category.id) ? SELECTED : '';
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

let ProductsList = React.createClass({
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
    categories: state.categories.items,
    products: state.products.items,
    categoryId: state.products.categoryId,
    sort: state.products.sort,
    loading: state.products.loading
  };
}

export default connect(select)(Products);