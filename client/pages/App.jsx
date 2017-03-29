import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactTransitionGroup from 'react-addons-transition-group'

export default React.createClass({
  render() {
    return (
      <ReactTransitionGroup>
        {React.cloneElement(this.props.children, { key: this.props.location.pathname })}
      </ReactTransitionGroup>
    );
  }
});
