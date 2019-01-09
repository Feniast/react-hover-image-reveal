import AnimEffectFactory from '../effect-factory';
import { propsWithDeco, defaultPropsWithDeco } from '../props';
import { expoEaseOut } from '../cubic-bezier';
import { createTransitionConfig } from '../../util';
import { registerEffect } from '../effectMap';

import styles from '../reveal.css';

const bgEnterTransition = {
  duration: 800,
  ease: expoEaseOut
};

const imgEnterTransition = {
  duration: 800,
  delay: 150,
  ease: expoEaseOut
};

const leaveTransition = {
  duration: 300,
  ease: expoEaseOut
};

const effect = AnimEffectFactory({
  initialPose: 'initial',
  pose: props => (props.shown ? 'show' : 'hide'),
  component: [
    {
      type: 'div',
      className: styles.imgBg,
      style: (props) => ({
        backgroundColor: props.bgColor
      }),
      config: {
        show: createTransitionConfig({
          opacity: [0, 1],
          rotate: [35, 0],
          scale: [0, 1]
        }, bgEnterTransition),
        hide: {
          opacity: 0,
          scale: 0.9,
          transition: leaveTransition
        }
      }
    },
    {
      type: 'div',
      className: styles.imgContainerNoOverflow,
      style: {
        position: 'absolute'
      },
      config: {
        initial: { opacity: 0 },
        show: createTransitionConfig({
          opacity: [0, 1],
          rotate: [35, 0],
          scale: [0, 1]
        }, imgEnterTransition),
        hide: {
          opacity: 0,
          scale: 0.9,
          transition: leaveTransition
        }
      },
      children: [
        {
          type: 'img',
          className: styles.img,
          config: {
            show: createTransitionConfig({
              rotate: [-35, 0],
              scale: [2, 1]
            }, imgEnterTransition),
            hide: {}
          },
          props: props => ({
            src: props.imgSrc
          })
        }
      ]
    }
  ],
  propTypes: propsWithDeco,
  defaultProps: defaultPropsWithDeco
});

registerEffect('4', effect);
