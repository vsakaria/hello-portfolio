import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Loading from '../components/Loading/Loading';
import Skull from '../components/Ascii/Skull';
import Terminal from '../components/Terminal/Terminal';
import GSAP from 'react-gsap-enhancer';
import {TimelineMax} from 'gsap';

function moveAnimation(utils) {
  const timeline = new TimelineMax()
  timeline.to(utils.target, 1, {x: utils.options.x, opacity: utils.options.opacity, onComplete: utils.options.callback && utils.options.callback})
  return timeline;
}

function leaveAnimation(utils) {
  const timeline = new TimelineMax({onComplete: utils.options.callback && utils.options.callback})
  timeline.to(utils.target, 4, {scale: 0, rotation: 1200, opacity: utils.options.opacity, ease:Power2.easeIn})
  // .to('body', 1, {backgroundColor: '#fff', onComplete: utils.options.callback && utils.options.callback})
  return timeline;
}

export default GSAP()(React.createClass({

  getInitialState() {
    return {
      loading: true,
      entered: false,
      passedIntro: false
    }
  },

  componentWillLeave(callback) {
    this.addAnimation(leaveAnimation, {callback, x: 1000, opacity: 1})
  },

  componentWillEnter(callback) {
    if ((this.props.routes.length === 2 && this.props.routes[0].path === '/') && this.props.location.action !== 'POP') {
      this.setState({
        entered: true,
        passedIntro : true
      })
      this.addAnimation(moveAnimation, {callback, x: 0, opacity: 1})
    } else {
      setTimeout(() => {
        this.setState({
          entered: true
        })
        this.addAnimation(moveAnimation, {callback, x: 0, opacity: 1})
      }, 4000)
    }
  },

  componentDidAppear() {
    this.setState({
      entered: true,
      passedIntro: true
    });
    this.addAnimation(moveAnimation, {x: 0, opacity: 1})
  },

  componentDidMount() {
    var self = this;
    document.addEventListener("click", function(event) {
      document.getElementById("prompt").focus();
    }, false);
    setTimeout(function() {
      self.setState({
        loading: false
      })
    }, 0)
  },

  shouldScroll() {
    window.scrollTo(0,document.body.scrollHeight);
  },

  _setFocus() {
    document.getElementById("prompt").focus();
  },

  render() {
    return (
      <div style={{opacity: 0}}>
        {this.state.entered &&
          <section onClick={this._setFocus}>
            <div>
              <Skull/>
              <Terminal shouldScroll={this.shouldScroll}/>
            </div>
          </section>
        }
      </div>
    );
  }
}));
