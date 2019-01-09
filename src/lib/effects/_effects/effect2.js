import AnimEffectFactory from '../effect-factory';
import { expoEaseOut } from '../cubic-bezier';
import { injectTransition, createTransitionConfig } from '../../util';
import { registerEffect } from '../effectMap';

import styles from '../reveal.css';

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
  show: createTransitionConfig({
    x: ['50%', '0%'],
    y: ['120%', '0%'],
    rotate: [50, 0]
  }, containerEnterTransition),
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

const effect = AnimEffectFactory({
  initialPose: 'initial',
  pose: props => (props.shown ? 'show' : 'hide'),
  component: {
    type: 'div',
    className: styles.imgWrapperNoOverflow,
    children: [
      {
        type: 'div',
        className: styles.imgContainerNoOverflow,
        style: { transformOrigin: '50% 100%' },
        config: containerConfig,
        children: [
          {
            type: 'img',
            className: styles.img,
            style: { transformOrigin: '50% 100%' },
            config: imgConfig,
            props: props => ({
              src: props.imgSrc
            })
          }
        ]
      }
    ]
  }
});

registerEffect('2', effect);
