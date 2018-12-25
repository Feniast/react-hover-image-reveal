import React from 'react';
import PropTypes from 'prop-types';
import { Transition, animated, interpolate } from 'react-spring';
import { easeExpOut } from 'd3-ease';

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

class ShowTransitionEffect extends React.PureComponent {
  static propTypes = {
    shown: PropTypes.bool.isRequired,
    from: PropTypes.object,
    enter: PropTypes.object,
    leave: PropTypes.object,
    config: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    onShown: PropTypes.func,
    onHidden: PropTypes.func,
    children: PropTypes.func
  };

  render() {
    const { shown, onShown, onHidden, children, ...rest } = this.props;
    return (
      <Transition
        native
        unique
        reset
        items={shown}
        {...rest}
        onRest={() => {
          if (shown) {
            onShown && onShown();
          } else {
            onHidden && onHidden();
          }
        }}
      >
        {shown => shown && children}
      </Transition>
    );
  }
}

class TransitionEffect extends React.PureComponent {
  static propTypes = {
    shown: PropTypes.bool.isRequired,
    imgSrc: PropTypes.string.isRequired,
    onShown: PropTypes.func,
    onHidden: PropTypes.func
  };

  static defaultProps = {
    shown: false
  };

  getContainerTransitionConfig(_, type) {
    const duration = type === 'enter' ? 300 : 200;
    return {
      duration,
      ease: easeExpOut
    };
  }

  getImageTransitionConfig(_, type) {
    const duration = type === 'enter' ? 400 : 200;
    return {
      duration,
      ease: easeExpOut
    };
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
                            return `translate(${-x}%, ${-y}%) rotate(${-rotate}deg) scale(${scale})`
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
