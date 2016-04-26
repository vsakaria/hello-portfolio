'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

export default React.createClass({

  propTypes: {
    entries: React.PropTypes.array
  },

  render() {
    return (
      <div>
      {this.props.entries.map(function(entry, i) {
        return (
          <div key={i} className="prompt">
            <pre className="prompt__entry">{entry.command}</pre>
            <pre className="prompt__entry">{entry.output}</pre>
          </div>
        );
      })}
      </div>
    );
  }

});
