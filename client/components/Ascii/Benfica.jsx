import React, { Component } from 'react';
import audioSrc from '../../images/slb.mp3';

class Benfica extends Component {
  render() {
    return (
      <audio src={audioSrc} autoPlay="true"/>
    );
  }
}

export default Benfica;
