import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux'
import {getSortObj} from '../creators';
import SortList from '../components/sortList';

let Aside = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const sortObj = getSortObj(this.props.sort);
    return (
      <aside>
        <SortList categoryId={this.props.categoryId} sortObj={sortObj} />
      </aside>
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

export default connect(select)(Aside);