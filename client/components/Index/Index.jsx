import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Loading from '../Loading/Loading';
import Skull from '../Ascii/Skull';
import Terminal from '../Terminal/Terminal';
import {IndexRoute, Route, Router, browserHistory} from 'react-router';

import Home from '../../pages/Home';
import Animation from '../../pages/Animation';
import Intro from '../../pages/Intro';
import App from '../../pages/App';

export default React.createClass({

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App} >
          { /* Home (main) route */ }
          <IndexRoute component={Intro}/>
          <Route path="welcome" component={Home} />
          <Route path="animation" component={Animation} />
          { /* Catch all route  - 404 */ }
          <Route path="*" component={Home} status={404} />
        </Route>
      </Router>
    );
  }
});
