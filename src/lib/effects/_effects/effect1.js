import AnimEffectFactory from '../effect-factory';
import { sineEaseOut } from '../cubic-bezier';
import { createTransitionConfig } from '../../util';
import { registerEffect } from '../effectMap';

import styles from '../reveal.css';

const transitionConfig = {
  duration: 200,
  ease: sineEaseOut
};

const containerConfig = {
  show: createTransitionConfig(
    {
      x: ['-100%', '0%']
    },
    transitionConfig
  ),
  hide: {
    x: '100%',
    transition: transitionConfig
  }
};

const imgConfig = {
  show: createTransitionConfig(
    {
      x: ['100%', '0%']
    },
    transitionConfig
  ),
  hide: {
    x: '-100%',
    transition: transitionConfig
  }
};

const animEffect = AnimEffectFactory({
  initialPose: 'initial',
  pose: props => (props.shown ? 'show' : 'hide'),
  component: {
    type: 'div',
    className: styles.imgContainerNoOverflow,
    config: containerConfig,
    children: [
      {
        type: 'img',
        className: styles.img,
        config: imgConfig,
        props: props => ({
          src: props.imgSrc
        })
      }
    ]
  }
});

registerEffect('1', animEffect);
