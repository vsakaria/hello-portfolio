import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Loading from '../Loading/Loading';
import Skull from '../Ascii/Skull';
import Terminal from '../Terminal/Terminal';
var Wat = require('../../images/wat.css');



export default React.createClass({

  getInitialState() {
    return {
      loading: true
    }
  },

  componentDidMount() {
    var self = this;
    setTimeout(function() {
      self.setState({
        loading: false
      })
    }, 2000)
  },

  shouldScroll() {
    window.scrollTo(0,document.body.scrollHeight);
  },

  _setFocus() {
    document.getElementById("prompt").focus();
  },

  render() {
    return (
      <section onClick={this._setFocus}>
        <Loading loading={this.state.loading}/>
        {this.state.loading ? '' :
        <div>
        {Wat}
          <Skull/>
          <Terminal shouldScroll={this.shouldScroll}/>
        </div>
        }

      </section>
    );
  }
});
