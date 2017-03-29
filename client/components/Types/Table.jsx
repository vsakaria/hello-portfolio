'use strict';
import React from 'react';
import { Link } from 'react-router';
import GSAP from 'react-gsap-enhancer';
import {TweenMax} from 'gsap';
import TextPlugin from "gsap/TextPlugin";

function animateText(utils) {
  return TweenMax.to(utils.target.find({className: 'lol'}), 5, {text:utils.options.text, ease:Power3.easeOut});
}

export default GSAP()(React.createClass({

  propTypes: {
    header: React.PropTypes.array.isRequired,
    body: React.PropTypes.array.isRequired,
    description: React.PropTypes.string.isRequired
  },

  componentDidMount() {
    this.addAnimation(animateText, {text: this.props.description});
  },

  render() {
    return (
      <div>
        <Link to="/animation" className="lol"></Link>
        <table className="type__table">
          <thead>
            <tr>
              {this.props.header.map(function(item, i) {
                return (
                  <th key={i} className="type__table__header">{item}</th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {this.props.body.map(function(item, i) {
              return (
                <tr key={i}>
                  <td className="type__table__cell">{item.title}</td>
                  <td className="type__table__cell">{item.description}</td>
                  <td className="type__table__cell">{item.date}</td>
                  <td className="type__table__cell"><a href={item.link} target="_blank">{item.link}</a></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}));
