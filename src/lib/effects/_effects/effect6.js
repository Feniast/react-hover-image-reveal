import AnimEffectFactory from '../effect-factory';
import { propsWithDeco, defaultPropsWithDeco } from '../props';
import { expoEaseOut, sineEaseOut, quintEaseOut } from '../cubic-bezier';
import { easeSineOut, easeQuadOut, elasticOutConfig } from '../easing';
import { createTransitionConfig } from '../../util';
import { registerEffect } from '../effectMap';

import styles from '../reveal.css';

const wrapperConfig = {
  show: createTransitionConfig(
    {
      x: ['-50%', '0%'],
      y: ['10%', '0%'],
      rotate: [-35, 15]
    },
    {
      duration: 1100,
      ease: quintEaseOut
    }
  )
};

const bgTransitionConfig = {
  scaleX: {
    type: 'keyframes',
    duration: 500,
    values: [0, 1, 0],
    times: [0, 0.4, 1],
    easings: [easeQuadOut, easeSineOut]
  },
  scaleY: {
    type: 'keyframes',
    duration: 500,
    values: [1, 0.8, 1],
    times: [0, 0.4, 1],
    easings: [easeQuadOut, easeSineOut]
  },
  originX: {
    type: 'keyframes',
    duration: 500,
    values: ['-5%', '-5%', '105%'],
    times: [0, 0.399, 0.4],
    easings: [t => 1, t => 1]
  },
  originY: {}
}

const bgConfig = {
  show: {
    scaleX: 0,
    scaleY: 1,
    originX: '-5%',
    originY: '50%',
    transition: ({ key }) => bgTransitionConfig[key]
  }
};

const imgContainerConfig = {
  initial: { scale: 0, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    applyAtStart: {
      scale: 0
    },
    transition: {
      scale: {
        from: 0,
        duration: 900,
        delay: 400,
        ease: elasticOutConfig(1, 0.6)
      },
      opacity: {
        from: 0,
        delay: 400,
        duration: 0
      }
    }
  },
  hide: {
    scale: 0.8,
    opacity: 0,
    transition: {
      duration: 130,
      ease: sineEaseOut
    }
  }
};

const imgConfig = {
  show: createTransitionConfig({
    rotate: [0, -15]
  }, {
    duration: 800,
    ease: expoEaseOut
  })
};

const effect = AnimEffectFactory({
  initialPose: 'initial',
  pose: props => (props.shown ? 'show' : 'hide'),
  component: {
    type: 'div',
    className: styles.imgWrapper,
    config: wrapperConfig,
    children: [
      {
        type: 'div',
        config: bgConfig,
        className: styles.imgBg,
        style: (props) => ({ backgroundColor: props.bgColor })
      },
      {
        type: 'div',
        config: imgContainerConfig,
        className: styles.imgContainer,
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

registerEffect('6', effect);
