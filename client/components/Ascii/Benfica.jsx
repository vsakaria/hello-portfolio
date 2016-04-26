import React, { Component } from 'react';
var audioSrc = require('../../images/slb.mp3');


class Benfica extends Component {
  render() {
    return (
      <audio ref="audio_tag" src={audioSrc} autoPlay="true"/>
    );
  }
}

export default Benfica;
