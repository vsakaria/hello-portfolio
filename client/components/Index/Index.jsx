import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Loading from '../Loading/Loading.jsx';
import Skull from '../Ascii/Skull.jsx';
import Terminal from '../Terminal/Terminal.jsx';



export default React.createClass({

  getInitialState() {
    return {
      loading: true
    }
  },

  componentDidMount() {
    var self = this;
    // lol
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
      <main onClick={this._setFocus}>
        <Loading loading={this.state.loading} />
        {this.state.loading ? '' :
          <div>
            <Skull/>
            <Terminal shouldScroll={this.shouldScroll}/>
          </div>
        }
      </main>
    );
  }
});
