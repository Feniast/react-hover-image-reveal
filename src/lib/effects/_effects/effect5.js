import AnimEffectFactory from '../effect-factory';
import { propsWithDeco, defaultPropsWithDeco } from '../props';
import { expoEaseOut, sineEaseOut, quintEaseOut } from '../cubic-bezier';
import { easeSineOut, easeExpoOut } from '../easing';
import { createTransitionConfig } from '../../util';
import { registerEffect } from '../effectMap';

import styles from '../reveal.css';

const leaveTransition = {
  duration: 100,
  ease: sineEaseOut
};

const wrapperConfig = {
  show: createTransitionConfig(
    {
      x: ['20%', '0%'],
      rotate: [10, 0]
    },
    {
      duration: 800,
      ease: quintEaseOut
    }
  )
};

const bgConfig = {
  show: {
    scaleX: 0,
    originX: '100%',
    applyAtEnd: {
      scaleX: 0 // the end value will be little over zero because of easing function
    },
    transition: ({ key }) => {
      if (key === 'scaleX') {
        return {
          type: 'keyframes',
          duration: 600,
          values: [0, 1, 0],
          times: [0, 0.5, 1],
          easings: [easeSineOut, easeExpoOut]
        };
      }
      if (key === 'originX') {
        return {
          type: 'keyframes',
          duration: 600,
          values: ['100%', '100%', '0%'],
          times: [0, 0.499, 0.5],
          easings: [t => 1, t => 1]
        };
      }
    }
  }
};

const imgContainerConfig = {
  initial: { x: '100%' },
  show: createTransitionConfig(
    {
      x: ['100%', '0%']
    },
    {
      duration: 600,
      delay: 450,
      ease: easeExpoOut
    }
  ),
  hide: {
    x: '-100%',
    transition: leaveTransition
  }
};

const imgConfig = {
  show: {
    x: '0%',
    scale: 1,
    transition: {
      x: {
        from: '-100%',
        duration: 600,
        delay: 450,
        ease: expoEaseOut
      },
      scale: {
        from: 1.3,
        duration: 1000,
        delay: 450,
        exse: expoEaseOut
      }
    }
  },
  hide: {
    x: '100%',
    transition: leaveTransition
  }
};

const effect = AnimEffectFactory({
  initialPose: 'initial',
  pose: props => (props.shown ? 'show' : 'hide'),
  component: {
    type: 'div',
    className: styles.imgWrapperNoOverflow,
    config: wrapperConfig,
    children: [
      {
        type: 'div',
        className: styles.imgBg,
        style: (props) => ({
          backgroundColor: props.bgColor
        }),
        config: bgConfig
      },
      {
        type: 'div',
        className: styles.imgContainerNoOverflow,
        config: imgContainerConfig,
        children: [
          {
            type: 'img',
            config: imgConfig,
            className: styles.img,
            props: props => ({
              src: props.imgSrc
            })
          }
        ]
      }
    ]
  },
  propTypes: propsWithDeco,
  defaultProps: defaultPropsWithDeco
});

registerEffect('5', effect);
