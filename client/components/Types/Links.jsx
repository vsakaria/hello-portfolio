'use strict';
import React from 'react';

export default React.createClass({

  propTypes: {
    links: React.PropTypes.array
  },

  render() {
    return (
      <div>
        <ul>
          {this.props.links.map(function(link, i) {
            return (
              <li key={i}>
                <a href={link} target="_blank">{link}</a>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
});
