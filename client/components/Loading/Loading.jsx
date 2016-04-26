'use strict';
import React from 'react';

export default React.createClass({
  propTypes: {
    loading: React.PropTypes.bool
  },

  getInitialState() {
    return {
      loadValue: '.'
    }
  },

  increment() {
    if (this.state.loadValue === '....') {
      this.setState({loadValue: ''});
    }
		this.setState({ loadValue: this.state.loadValue + '.' });
	},

  render() {
    return (
      <div>
        {this.props.loading ? <div><span className="loading">initiliazing</span> <span className="loading__indicator">{this.state.loadValue}</span></div> : ''}
      </div>
    );
  }
});
