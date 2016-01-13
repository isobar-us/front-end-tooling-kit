import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SortList from '../components/sortList';

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return (
      <aside>
        <SortList />
      </aside>
    );
  }
});