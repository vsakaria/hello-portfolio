'use strict';
import React from 'react';

export default React.createClass({

  propTypes: {
    link: React.PropTypes.string.isRequired,
    before: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <div>
        {this.props.before} <a href={this.props.link} target="blank">{this.props.link}</a>
      </div>
    );
  }
});
