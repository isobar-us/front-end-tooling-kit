import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return (
      <footer>
        <span>&copy; Lorem ipsum dolor sit amet.</span>
      </footer>
    );
  }
});