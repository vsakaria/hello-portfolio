'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

export default React.createClass({
  getInitialState: function() {
    return {
      value: '',
      length: '',
      history: []
    };
  },

  componentDidMount(){
    ReactDOM.findDOMNode(this.refs.prompt).focus();
  },


  _handleChange(event) {
    this.setState({value: event.target.value});
  },

  _getLatestFromHistory(event) {
    if (event.key === 'ArrowUp' && this.state.length >= 0) {
      this.setState({
        value: this.state.history[this.state.length],
        length: this.state.length - 1
      });
    } else if (event.key === 'ArrowDown') {
      if (this.state.length >= 0 && this.state.length <= this.state.history.length - 1) {
        this.setState({
          value: this.state.history[this.state.length + 1],
          length: this.state.length + 1
        });
      }
    }
    // Set cursor on the end of input
    this.refs.prompt.setSelectionRange(this.state.value.length, this.state.value.length);
  },

  _handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.props.enter(event.target.value.trim())
      this.setState({
        value: '',
        history: this.state.history.concat([event.target.value.trim()]),
        length: this.state.history.length,
      });
    }
  },

  render() {
    return (
      <div className="terminal__prompt-container" onKeyDown={this._getLatestFromHistory}>
        $<span className="prompt__input-text">{this.state.value}</span> <span className="terminal__cursor a-blink"></span>
        <input id="prompt"
          className="terminal__input"
          ref="prompt"
          type="text"
          value={this.state.value}
          onChange={this._handleChange}
          onKeyPress={this._handleKeyPress}
          />
      </div>
    );
  }

});
