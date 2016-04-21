'use strict';
import React from 'react';

export default React.createClass({

  propTypes: {
    list: React.PropTypes.array.isRequired,
    title: React.PropTypes.string.isRequired
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
});
