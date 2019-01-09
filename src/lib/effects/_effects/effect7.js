import AnimEffectFactory from '../effect-factory';
import { propsWithDeco, defaultPropsWithDeco } from '../props';
import { expoEaseOut, sineEaseOut, quintEaseOut, quadEaseOut } from '../cubic-bezier';
import { createTransitionConfig, mergeTransitionConfig } from '../../util';
import { registerEffect } from '../effectMap';

import styles from '../reveal.css';

const wrapperConfig = {
  show: {
    staggerChildren: 200
  }
};

const imgConfig = {
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
    duration: 500,
    ease: quadEaseOut
  }))
};

const finalImgConfig = {
  initial: { opacity: 0 },
  show: createTransitionConfig({
    x: ['30%', '10%'],
    y: ['160%', '10%'],
    rotate: [-30, -10],
    opacity: [1, 1]
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
};

const imgStyle = {
  position: 'absolute',
  top: 0,
  left: 0
};

const imgCount = 3;

const effect = AnimEffectFactory({
  initialPose: 'initial',
  pose: props => (props.shown ? 'show' : 'hide'),
  component: {
    type: 'div',
    className: styles.imgWrapper,
    config: wrapperConfig,
    children: [...new Array(imgCount)].map((_, i) => {
      return {
        type: 'img',
        style: imgStyle,
        className: styles.img,
        props: props => ({
          src: props.imgSrc
        }),
        config: i < imgCount - 1 ? imgConfig : finalImgConfig
      }
    })
  },
  propTypes: propsWithDeco,
  defaultProps: defaultPropsWithDeco
});

registerEffect('7', effect, {
  zIndex: -1
});
