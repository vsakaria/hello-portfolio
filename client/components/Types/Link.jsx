'use strict';
import React from 'react';

export default React.createClass({

  propTypes: {
    link: React.PropTypes.string.isRequired,
    before: React.PropTypes.string.isRequired
  },

  componentDidMount() {
    console.log(this.props.link);
  },

  render() {
    console.log(this.props.link);
    return (
      <div>
        {this.props.before} <a href={this.props.link} target="blank">{this.props.link}</a>
      </div>
    );
  }
});
