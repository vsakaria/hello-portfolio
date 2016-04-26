import React, { Component } from 'react';


class SkullASCII extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouthOpen: false
    };
    this.openMouth = this.openMouth.bind(this);
  }

  openMouth() {
		this.setState({ mouthOpen: !this.state.mouthOpen });
	}
	componentDidMount() {
		this.interval = setInterval(this.openMouth, 500);
	}
  componentWillUnmount() {
		clearInterval(this.interval);
	}

  render() {
    let mouthClosed = `
   _..---..__
 ,'          ´-.
.'´ .          )
|     ´;.__.._.'
 \\ .´--.(##)(#).
  ´-->;--' pWq´>
   < <"v\\,,,,]
    ´\\´^-''''7   welcome to my little space, stranger.
      ´~"--^-'   try writing something below
      `;

    let mouthOpen = `
   _..---..__
 ,'          ´-.
.'´ .          )
|     ´;.__.._.'
 \\ .´--.(##)(#).
  ´-->;--' pWq´>
   < <"v\\,,,,]
                 welcome to my little space, stranger.
    ´\\´^-''''7   try writing something below
      ´~"--^-'   `;


    return (
      <pre>
        <code>
          {this.state.mouthOpen ? mouthClosed : mouthOpen}
        </code>
      </pre>
    );
  }
}

export default SkullASCII;
