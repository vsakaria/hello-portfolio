'use strict';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Prompt from './Prompt';
import Output from './Output';
import Commands from '../../common/commands';
import CONST from '../../common/constants';
import ga from 'react-ga';

export default React.createClass({

  getInitialState() {
    return {
      sad: false,
      entries: [{
        command: '',
        output: ''
      }]
    }
  },

  componentDidMount() {
    ga.initialize(CONST.GA_TRACK_CODE);
  },

  onPromptEnter: function(value) {
    this.setState({entries: this.state.entries.concat([{command: value, output: 'asdasd'}])});
    new Commands(value, this._newEntry, this._clearEntries, this._showPepe);
  },

  _clearEntries() {
    this.setState({
      entries: []
    })
  },

  _newEntry(command, output) {
    this.setState({
      entries: this.state.entries.concat([{
        command: '$ ' + command,
        output: output
      }])
    });
    ga.event({
      category: 'Entered command',
      action: command || 'no-command-entered',
    });
    this.props.shouldScroll();
  },

  _showPepe() {
    this.setState({
      sad: true
    })
  },

  componentDidUpdate: function(){
    this.props.shouldScroll();
  },

  shouldScroll(){

  },

  render() {
    return (
      <div ref="container" style={(this.state.sad) ? {paddingBottom: '150px'} : {}}>
        <Output entries={this.state.entries} scroll={this.shouldScroll} />
        <Prompt enter={this.onPromptEnter} scroll={this.shouldScroll}/>
        { this.state.sad ? <div className="sad"/> : '' }
      </div>
    );
  }

});
