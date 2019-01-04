import React from 'react';
import posed from 'react-pose';
import { propsWithDeco, defaultPropsWithDeco } from './props';
import { expoEaseOut, sineEaseOut, quintEaseOut } from './cubic-bezier';
import { easeSineOut, easeExpoOut } from './easing';
import { createTransitionConfig } from '../util';

import styles from './reveal.css';

const leaveTransition = {
  duration: 100,
  ease: sineEaseOut
};

const Wrapper = posed.div({
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
});

const Bg = posed.div({
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
  },
  hide: {}
});

const ImgContainer = posed.div({
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
});

const Img = posed.img({
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
});

export default class TransitionEffect extends React.PureComponent {
  static propTypes = propsWithDeco;

  static defaultProps = defaultPropsWithDeco;

  render() {
    const { shown, bgColor, onShown, onHidden, imgSrc } = this.props;
    return (
      <Wrapper
        initialPose='initial'
        pose={shown ? 'show' : 'hide'}
        className={styles.imgWrapperNoOverflow}
        onPoseComplete={() => {
          if (shown) onShown && onShown();
          else onHidden && onHidden();
        }}
      >
        <Bg
          className={styles.imgBg}
          style={{ backgroundColor: bgColor }}
        />
        <ImgContainer
          className={styles.imgContainerNoOverflow}
        >
          <Img src={imgSrc} className={styles.img} />
        </ImgContainer>
      </Wrapper>
    );
  }
}
