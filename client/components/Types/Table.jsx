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
    description: React.PropTypes.string.isRequired,
    experiments: React.PropTypes.array.isRequired
  },

  componentDidMount() {
    this.addAnimation(animateText, {text: 'I do this on my free time:'});
  },

  render() {
    return (
      <div>
        <p className="lol"></p>
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
            {this.props.experiments.slice(0).reverse().map(function(item, i) {
              return (
                <tr key={i}>
                  <td className="type__table__cell">{item.title}</td>
                  <td className="type__table__cell">{item.description}</td>
                  <td className="type__table__cell">{item.date}</td>
                  <td className="type__table__cell">
                    {item.links ?
                      item.links.map((item, index) => {
                        return (
                          <span>
                            {index > 0 && '/ '}
                            <a key={index} href={item.link} target="_blank">{item.value}</a>&nbsp;
                          </span>
                        )
                      })
                      :
                      <span>Soon</span>
                    }

                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p>{this.props.description}</p>
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
                  <td className="type__table__cell">
                    {item.links ?
                      item.links.map((item, index) => {
                        return (
                          <span>
                            {index > 0 && '/ '}
                            <a key={index} href={item.link} target="_blank">{item.value}</a>&nbsp;
                          </span>
                        )
                      })
                      :
                      <span>Soon</span>
                    }

                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p>I also do <Link to="/animation" style={{color: 'orange'}}>page transitions</Link></p>
      </div>
    );
  }
}));
