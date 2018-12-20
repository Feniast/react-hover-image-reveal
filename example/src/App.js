import React, { Component } from 'react';

import ImageReveal from 'react-hover-image-reveal';

export default class App extends Component {
  render() {
    return <div>
        <ImageReveal imgSrc="./assets/bruno-kelzer-1236813.jpg">
          <div onMouseEnter={e => console.log(e.nativeEvent)}>dff</div>
        </ImageReveal>
        <ImageReveal imgSrc="./assets/matthew-t-rader-1226659.jpg">
          <div onMouseEnter={e => console.log(e.nativeEvent)}>ee</div>
        </ImageReveal>
      </div>;
  }
}
