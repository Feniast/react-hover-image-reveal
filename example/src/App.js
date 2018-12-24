import React, { Component } from 'react';

import ImageReveal from 'react-hover-image-reveal';

const images = [
  "./assets/1.jpg",
  "./assets/2.jpg"
];

export default class App extends Component {
  render() {
    return (
      <div className="content">
        <div className="section">
          <h2 className="section-title">Effect 1</h2>
          <div className="section-item-list">
            {images.map(((image, index) => (
              <ImageReveal key={index} imgSrc={image} className="section-item">
                <div>{`Item ${index+1}`}</div>
              </ImageReveal>
            )))}
          </div>
        </div>
      </div>
    );
  }
}
