'use strict';
import React from 'react';

export default React.createClass({

  propTypes: {
    value: React.PropTypes.string.isRequired,
  },

  render() {
    return (
      <p className="error">
        {this.props.value}
      </p>
    );
  }
});
