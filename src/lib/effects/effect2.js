import React from 'react';
import PropTypes from 'prop-types';
import { Keyframes, animated, interpolate } from 'react-spring';
import { easeExpOut } from 'd3-ease';

import styles from './reveal.css';

const Animation = Keyframes.Spring({
  show: async next => {
    const translate = next({
      from: {
        x: '50%',
        y: '120%',
        rotate: 50
      },
      x: '0%',
      y: '0%',
      rotate: 0,
      config: {
        duration: 400,
        ease: easeExpOut
      },
      reset: true
    });

    const scale = next({
      from: { scale: 2 },
      scale: 1,
      config: {
        duration: 700,
        ease: easeExpOut
      },
      reset: true
    });

    await Promise.all([translate, scale]);
  },
  hide: {
    y: '120%',
    rotate: 5,
    scale: 1.2,
    config: {
      duration: 600,
      ease: easeExpOut
    }
  }
});

const Effect = props => {
  const { shown, imgSrc, onShown, onHidden } = props;
  return (
    <Animation
      native
      state={shown ? 'show' : 'hide'}
      onRest={() => {
        if (shown) {
          onShown && onShown();
        } else {
          onHidden && onHidden();
        }
      }}
    >
      {({ x, y, rotate, scale }) => (
        <animated.div
          className={styles.imgContainer}
          style={{
            transformOrigin: '50% 100%',
            transform: interpolate(
              [x, y, rotate],
              (x, y, rotate) => `translate(${x}, ${y}) rotate(${rotate}deg)`
            )
          }}
        >
          <animated.img
            src={imgSrc}
            className={styles.img}
            style={{
              transformOrigin: '50% 100%',
              transform: interpolate(
                [x, y, rotate, scale],
                (x, y, rotate, scale) =>
                  `translate(-${x}, -${y}) rotate(-${rotate}deg) scale(${scale})`
              )
            }}
          />
        </animated.div>
      )}
    </Animation>
  );
};

Effect.propTypes = {
  shown: PropTypes.bool.isRequired,
  imgSrc: PropTypes.string.isRequired,
  onShown: PropTypes.func,
  onHidden: PropTypes.func
};

Effect.defaultProps = {
  shown: false
};

export default Effect;
