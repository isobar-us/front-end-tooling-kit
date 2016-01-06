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

var SortList = React.createClass({
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
				<Link to={href} href={href} className={sortClasses.alpha}>Alphabetically</Link>
				<Link to={href} query={{sort:'priceasc'}} href={href+'?sort=priceasc'} className={sortClasses.priceasc}>Price: Low to High</Link>
				<Link to={href} query={{sort:'pricedesc'}} href={href+'?sort=pricedesc'} className={sortClasses.pricedesc}>Price: High to Low</Link>
			</div>
		);
	}
});
  
var FilterItem = React.createClass({
	mixins: [PureRenderMixin],
	render: function() {
		const category = this.props.category;
		const sortObj = this.props.sortObj;
		const href = '/products/'+category.id;
		return (
			<Link to={href} query={sortObj.query} href={href+sortObj.search} className={this.props.className}>{category.name}</Link>
		);
	}
});

var FiltersList = React.createClass({
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
				<Link to={href} query={sortObj.query} href={href+sortObj.search} className={allClassName}>All Products</Link>
				{items}
			</nav>
		);
	}
});

var ProductItem = React.createClass({
	mixins: [PureRenderMixin],
	render: function() {
		const image = '/img/'+this.props.product.image;
		const price = 'Price.......$'+this.props.product.price;
		return (
			<li>
				<a href="#">
					<img src={image} alt="" />
					<h3>{ this.props.product.name }</h3>
					<span>{price}</span>
				</a>
			</li>
		);
	}
});

var ProductsList = React.createClass({
	mixins: [PureRenderMixin],
	render: function() {
		let items = [];
		this.props.products.forEach(product => {
			items.push(<ProductItem product={product} key={product.id} />);
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