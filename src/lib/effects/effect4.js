import React from 'react';
import { animated, interpolate } from 'react-spring';
import { easeExpOut } from 'd3-ease';
import ShowTransitionEffect from './ShowTransitionEffect';
import { propsWithDeco, defaultPropsWithDeco } from './props';

import styles from './reveal.css';

const bgFrom = {
  opacity: 0,
  rotate: 35,
  scale: 0
};

const bgEnter = {
  opacity: 1,
  rotate: 0,
  scale: 1
};

const bgLeave = {
  opacity: 0,
  scale: 0.9
};

const imgFrom = {
  opacity: 0,
  rotate: 35,
  outerScale: 0,
  innerScale: 2
};

const imgEnter = {
  opacity: 1,
  rotate: 0,
  outerScale: 1,
  innerScale: 1
};

const imgLeave = {
  opacity: 0,
  outerScale: 0.9
};

export default class TransitionEffect extends React.PureComponent {
  static propTypes = propsWithDeco;

  static defaultProps = defaultPropsWithDeco;

  getBgTransitionConfig(_, type) {
    return type === 'enter'
      ? { duration: 800, easing: easeExpOut }
      : { duration: 200, easing: easeExpOut };
  }

  getImgTranstionConfig(_, type) {
    return type === 'enter'
      ? { duration: 800, easing: easeExpOut, delay: 150 }
      : { duration: 200, easing: easeExpOut };
  }

  render() {
    const { shown, bgColor, onShown, onHidden, imgSrc } = this.props;
    return (
      <>
        <ShowTransitionEffect
          from={bgFrom}
          enter={bgEnter}
          leave={bgLeave}
          config={this.getBgTransitionConfig}
          shown={shown}
        >
          {({ opacity, rotate, scale }) => (
            <animated.div
              className={styles.imgBg}
              style={{
                backgroundColor: bgColor,
                opacity,
                transform: interpolate(
                  [rotate, scale],
                  (rotate, scale) => { return `rotate(${rotate}deg) scale(${scale})`; }
                )
              }}
            />
          )}
        </ShowTransitionEffect>
        <ShowTransitionEffect
          shown={shown}
          from={imgFrom}
          enter={imgEnter}
          leave={imgLeave}
          config={this.getImgTranstionConfig}
          onShown={onShown}
          onHidden={onHidden}
        >
          {({ opacity, rotate, innerScale, outerScale }) => (
            <animated.div
              className={[styles.imgContainer, styles.hidden].join(' ')}
              style={{
                opacity,
                transform: interpolate(
                  [rotate, outerScale],
                  (rotate, outerScale) => {
                    console.log(rotate, outerScale);
                    return `rotate(${rotate}deg) scale(${outerScale})`
                  }
                )
              }}
            >
              <animated.img
                className={styles.img}
                src={imgSrc}
                style={{
                  transform: interpolate(
                    [rotate, innerScale],
                    (rotate, innerScale) =>
                      `rotate(${-rotate}deg) scale(${innerScale})`
                  )
                }}
              />
            </animated.div>
          )}
        </ShowTransitionEffect>
      </>
    );
  }
}
