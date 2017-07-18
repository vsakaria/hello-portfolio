'use strict';
import React from 'react';

export default React.createClass({

  propTypes: {
    awards: React.PropTypes.array.isRequired,
  },

  render() {
    return (
      <ul className="awards__list">
        {this.props.awards.map((award, index) => {
          return (
            <li>{award.site}: {award.description} (<a href={award.link} target="_blank">Open link</a>)</li>
          )
        })}
      </ul>
    );
  }
});
