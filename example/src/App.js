import React, { Component } from 'react';

import ImageReveal from 'react-hover-image-reveal';

const images = ['./assets/1.jpg', './assets/2.jpg'];

const effectNum = 5;

const extraPropsMap = {
  4: {
    bgColor: 'black'
  },
  5: {
    bgColor: 'white'
  }
};

export default class App extends Component {
  render() {
    return (
      <div className="content">
        {new Array(effectNum).fill(0).map((_, idx) => (
          <div className="section">
            <h2 className="section-title">{`Effect ${idx + 1}`}</h2>
            <div className="section-item-list">
              {images.map((image, index) => {
                let extraProps = extraPropsMap[idx + 1] || {};
                return (
                  <ImageReveal
                    key={index}
                    imgSrc={image}
                    className="section-item"
                    effect={idx + 1}
                    {...extraProps}
                  >
                    <div>{`Item ${index + 1}`}</div>
                  </ImageReveal>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }
}
