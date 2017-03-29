import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GSAP from 'react-gsap-enhancer';
import {TimelineMax, TweenMax} from 'gsap';

function moveAnimation(utils) {
  return TweenMax.to(utils.target, 1, {x: utils.options.x, onComplete: utils.options.callback && utils.options.callback})
}

function leaveAnimation(utils) {
  const timeline = new TimelineMax({onComplete: utils.options.callback && utils.options.callback})
  timeline.to(utils.target, 4, {scale: 0, rotation: 1200, opacity: utils.options.opacity, ease:Power2.easeIn})
  // .to('body', 1, {backgroundColor: '#000', onComplete: utils.options.callback && utils.options.callback})
  return timeline;
}

function enterAnimation(utils) {
  console.log('passa');
  var tl = new TimelineMax();
  return tl.fromTo(utils.target, 4, {scale: 0, rotation: 1200, ease:Power2.easeOut}, {scale: 1, rotation: 0, ease:Power2.easeOut})
}

export default GSAP()(React.createClass({

  getInitialState() {
    return {
      loading: true
    }
  },

  componentWillLeave(callback) {
    console.log('Home will leave');
    this.addAnimation(leaveAnimation, {callback, x: 1000})
  },

  componentDidEnter() {
    console.log('Home will enter');
    setTimeout(() => {
      this.setState({
        loading: false
      });
      this.addAnimation(enterAnimation)
    }, 4000)
  },
  render() {
    return (
      <div className="super-animated-text">
        {!this.state.loading &&
          <h1>hey, that's pretty good</h1>
        }
      </div>
    );
  }
}));
