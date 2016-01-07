import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Link} from 'react-router';
import constants from '../constants';

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

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    let items = [];
    const sortObj = this.props.sortObj;
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