'use strict';
import React from 'react';
import GSAP from 'react-gsap-enhancer';
import {TimelineMax} from 'gsap';

function animateList(utils) {
  var items = utils.target.find({className: 'indent'}).findAllInChildren()

  return new TimelineMax()
  	.staggerFrom(items, 0.05, {x: -10, opacity: 0}, .12)
}

export default GSAP()(React.createClass({

  propTypes: {
    list: React.PropTypes.array.isRequired,
    title: React.PropTypes.string.isRequired
  },

  componentDidMount(){
      this.addAnimation(animateList)
  },

  render() {
    return (
      <div className="type__list">
        <code><p className="type__list__title">{this.props.title}</p></code>
        <pre className="indent">
        {this.props.list.map(function(item, i) {
          return (
            <span key={i} className="type__list__item">{item}</span>
          )
        })}
        </pre>
      </div>
    );
  }
}));
