import EffectFactory from './base-effect';
import { expoEaseOut } from './cubic-bezier';
import { injectTransition } from '../util';

import styles from './reveal.css';

const containerEnterTransition = {
  duration: 400,
  ease: expoEaseOut
};

const imgEnterTransition = {
  duration: 700,
  ease: expoEaseOut
};

const leaveTransition = {
  duration: 600,
  ease: expoEaseOut
};

const containerConfig = {
  show: {
    x: '0%',
    y: '0%',
    rotate: 0,
    transition: injectTransition({
      x: { from: '50%' },
      y: { from: '120%' },
      rotate: { from: 50 }
    }, containerEnterTransition)
  },
  hide: {
    y: '-120%',
    rotate: -5,
    transition: leaveTransition
  }
};

const imgConfig = {
  show: {
    x: '0%',
    y: '0%',
    rotate: 0,
    scale: 1,
    transition: {
      ...injectTransition({
        x: { from: '-50%' },
        y: { from: '-120%' },
        rotate: { from: -50 }
      }, containerEnterTransition),
      ...injectTransition({
        scale: { from: 2 }
      }, imgEnterTransition)
    }
  },
  hide: {
    y: '120%',
    rotate: 5,
    scale: 1.2,
    transition: leaveTransition
  }
};

export default EffectFactory({
  containerConfig,
  imgConfig,
  containerStyles: { transformOrigin: '50% 100%' },
  imgStyles: { transformOrigin: '50% 100%' },
  hasWrapper: true,
  wrapperClass: styles.imgContainer
});
