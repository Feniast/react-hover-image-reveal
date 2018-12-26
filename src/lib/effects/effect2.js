import React from 'react';
import { animated, interpolate } from 'react-spring';
import { easeExpOut } from 'd3-ease';
import ShowTransitionEffect from './ShowTransitionEffect';
import { commonProps, commonDefaultProps } from './props';

import styles from './reveal.css';

const containerFrom = {
  x: 50,
  y: 120,
  rotate: 50
};

const containerEnter = {
  x: 0,
  y: 0,
  rotate: 0
};

const containerLeave = {
  y: -120,
  rotate: -5
};

const imageFrom = {
  scale: 2
};

const imageEnter = {
  scale: 1
};

const imageLeave = {
  scale: 1.2
};

class TransitionEffect extends React.PureComponent {
  static propTypes = commonProps;

  static defaultProps = commonDefaultProps;

  getContainerTransitionConfig(_, type) {
    const duration = type === 'enter' ? 400 : 200;
    return { duration, easing: easeExpOut };
  }

  getImageTransitionConfig(_, type) {
    const duration = type === 'enter' ? 700 : 200;
    return { duration, easing: easeExpOut };
  }

  render() {
    const { shown, imgSrc, onShown, onHidden } = this.props;
    return (
      <ShowTransitionEffect
        config={this.getContainerTransitionConfig}
        from={containerFrom}
        enter={containerEnter}
        leave={containerLeave}
        shown={shown}
        onShown={onShown}
        onHidden={onHidden}
      >
        {({ x, y, rotate }) => {
          return (
            <div className={styles.imgContainer}>
              <animated.div
                className={styles.imgContainer}
                style={{
                  transformOrigin: '50% 100%',
                  transform: interpolate(
                    [x, y, rotate],
                    (x, y, rotate) =>
                      `translate(${x}%, ${y}%) rotate(${rotate}deg)`
                  )
                }}
              >
                <ShowTransitionEffect
                  config={this.getImageTransitionConfig}
                  from={imageFrom}
                  enter={imageEnter}
                  leave={imageLeave}
                  shown={shown}
                >
                  {({ scale }) => (
                    <animated.img
                      src={imgSrc}
                      className={styles.img}
                      style={{
                        transformOrigin: '50% 100%',
                        transform: interpolate(
                          [x, y, rotate, scale],
                          (x, y, rotate, scale) => {
                            return `translate(${-x}%, ${-y}%) rotate(${-rotate}deg) scale(${scale})`;
                          }
                        )
                      }}
                    />
                  )}
                </ShowTransitionEffect>
              </animated.div>
            </div>
          );
        }}
      </ShowTransitionEffect>
    );
  }
}

export default TransitionEffect;
