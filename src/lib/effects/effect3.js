import React from 'react';
import { animated, interpolate } from 'react-spring';
import { easeExpOut, easeSinOut } from 'd3-ease';
import ShowTransitionEffect from './ShowTransitionEffect';
import { commonProps, commonDefaultProps } from './props';

import styles from './reveal.css';

const from = {
  opacity: 0,
  y: 50,
  rotate: -15,
  outerScale: 0,
  innerScale: 2
};

const enter = {
  opacity: 1,
  y: 0,
  rotate: 0,
  outerScale: 1,
  innerScale: 1
};

const leave = {
  opacity: 0,
  y: -40,
  rotate: 10,
  outerScale: 0.9,
  innerScale: 1.5
};

export default class TransitionEffect extends React.PureComponent {
  static propTypes = commonProps;

  static defaultProps = commonDefaultProps;

  getTransitionConfig(_, type) {
    const duration = type === 'enter' ? 800 : 150;
    const easing = type === 'enter' ? easeExpOut : easeSinOut;
    return { duration, easing };
  }

  render() {
    const { shown, imgSrc, onShown, onHidden } = this.props;
    return (
      <ShowTransitionEffect
        from={from}
        enter={enter}
        leave={leave}
        config={this.getTransitionConfig}
        shown={shown}
        onHidden={onHidden}
        onShown={onShown}
      >
        {({ opacity, y, rotate, outerScale, innerScale }) => (
          <animated.div
            className={styles.imgContainer}
            style={{
              opacity,
              transform: interpolate(
                [y, rotate, outerScale],
                (y, rotate, outerScale) =>
                  `translate3d(0, ${y}%, 0) rotate(${rotate}deg) scale(${outerScale})`
              )
            }}
          >
            <animated.img
              src={imgSrc}
              className={styles.img}
              style={{
                transform: interpolate(
                  [rotate, innerScale],
                  (rotate, innerScale) => {
                    return `rotate(${-rotate}deg) scale(${innerScale})`;
                  }
                )
              }}
            />
          </animated.div>
        )}
      </ShowTransitionEffect>
    );
  }
}
