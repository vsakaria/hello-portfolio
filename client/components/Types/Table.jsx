'use strict';
import React from 'react';

export default React.createClass({

  propTypes: {
    header: React.PropTypes.array.isRequired,
    body: React.PropTypes.array.isRequired
  },

  render() {
    return (
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
    );
  }
});
