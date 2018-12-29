import EffectFactory from './base-effect';
import { expoEaseOut, sineEaseOut } from './cubic-bezier';
import { injectTransition } from '../util';

const enterTransition = {
  duration: 800,
  ease: expoEaseOut
};

const leaveTransition = {
  duration: 150,
  ease: sineEaseOut
};

const containerConfig = {
  initial: {},
  show: {
    opacity: 1,
    rotate: 0,
    y: '0%',
    scale: 1,
    transition: injectTransition({
      opacity: { from: 0 },
      rotate: { from: -15 },
      y: { from: '50%' },
      scale: { from: 0 }
    }, enterTransition)
  },
  hide: {
    opacity: 0,
    y: '-40%',
    rotate: 10,
    scale: 0.9,
    transition: leaveTransition
  }
};

const imgConfig = {
  initial: {},
  show: {
    rotate: 0,
    scale: 1,
    transition: injectTransition({
      rotate: { from: 15 },
      scale: { from: 2 }
    }, enterTransition)
  },
  hide: {
    rotate: -10,
    scale: 1.5,
    transition: leaveTransition
  }
};

export default EffectFactory({
  containerConfig,
  imgConfig
});
