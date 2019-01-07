import React from 'react';
import posed from 'react-pose';
import { propsWithDeco, defaultPropsWithDeco } from './props';
import { expoEaseOut, sineEaseOut, quintEaseOut, quadEaseOut } from './cubic-bezier';
import { createTransitionConfig, mergeTransitionConfig } from '../util';
import { registerEffect } from './effectMap';

import styles from './reveal.css';

const Wrapper = posed.div({
  show: {
    staggerChildren: 200
  }
});

const Img = posed.img({
  initial: { opacity: 0 },
  show: mergeTransitionConfig(createTransitionConfig({
    x: ['30%', '-15%'],
    y: ['160%', '-140%'],
    rotate: -10
  }, {
    duration: 700,
    ease: quintEaseOut
  }), createTransitionConfig({
    opacity: [1, 0]
  }, {
    duration: 700,
    ease: quadEaseOut
  })),
  hide: {}
});

const FinalImg = posed.img({
  initial: { opacity: 0 },
  show: createTransitionConfig({
    x: ['30%', '10%'],
    y: ['160%', '10%'],
    rotate: [-30, -10],
    opacity: 1
  }, {
    duration: 700,
    ease: expoEaseOut
  }),
  hide: {
    x: '-30%',
    y: '-240%',
    opacity: 0,
    transition: {
      duration: 150,
      ease: sineEaseOut
    }
  }
});

class TransitionEffect extends React.PureComponent {
  static propTypes = propsWithDeco;

  static defaultProps = defaultPropsWithDeco;

  render() {
    const { shown, onShown, onHidden, imgSrc } = this.props;
    const size = 3;
    const array = [...new Array(size)];
    return (
      <Wrapper
        initialPose='initial'
        pose={shown ? 'show' : 'hide'}
        className={styles.imgWrapper}
        onPoseComplete={() => {
          if (shown) onShown && onShown();
          // else onHidden && onHidden();
        }}
      >
        {array.map((_, idx) => {
          if (idx !== size - 1) {
            return <Img src={imgSrc} className={styles.img} key={idx} style={{position: 'absolute'}} />;
          } else {
            return <FinalImg src={imgSrc} className={styles.img} key={idx} style={{position: 'absolute'}} />;
          }
        })}
      </Wrapper>
    );
  }
}

registerEffect('7', TransitionEffect, {
  zIndex: -1
});
