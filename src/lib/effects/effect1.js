import React from 'react';
import PropTypes from 'prop-types';
import { Transition, animated } from 'react-spring';
import { easeSinOut } from 'd3-ease';

import styles from './reveal.css';

// use reset to force the animation restart
// use unique to prevent the same items appear multiple times (it's something must be taken carefully and you don't want it to happen in most cases)
const TransitionEffect = props => {
  const { shown, imgSrc, onShown, onHidden } = props;
  return (
    <Transition
      native
      unique
      items={shown}
      reset
      config={{ duration: 200, easing: easeSinOut }}
      from={{ x1: '-100%', x2: '100%' }}
      enter={{ x1: '0%', x2: '0%' }}
      leave={{ x1: '100%', x2: '-100%' }}
      onRest={() => {
        if (shown) {
          onShown && onShown();
        } else {
          onHidden && onHidden();
        }
      }}
    >
      {/* eslint-disable */ shown =>
        shown &&
        (({ x1, x2 }) => (
          <animated.div
            className={styles.imgContainer}
            style={{ transform: x1.interpolate(x1 => `translate3d(${x1}, 0, 0)`) }}
          >
            <animated.img
              src={imgSrc}
              className={styles.img}
              style={{ transform: x2.interpolate(x2 => `translate3d(${x2}, 0, 0)`) }}
            />
          </animated.div>
        ))
      /* eslint-enable */
      }
    </Transition>
  );
};

TransitionEffect.propTypes = {
  shown: PropTypes.bool.isRequired,
  imgSrc: PropTypes.string.isRequired,
  onShown: PropTypes.func,
  onHidden: PropTypes.func
};

TransitionEffect.defaultProps = {
  shown: false
};

export default TransitionEffect;
