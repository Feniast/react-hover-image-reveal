import React from 'react';
import posed from 'react-pose';
import { propsWithDeco, defaultPropsWithDeco } from './props';
import { expoEaseOut, sineEaseOut, quintEaseOut } from './cubic-bezier';
import { easeSineOut, easeQuadOut, elasticOutConfig } from './easing';
import { createTransitionConfig } from '../util';
import { registerEffect } from './effectMap';

import styles from './reveal.css';

const Wrapper = posed.div({
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
});

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

const Bg = posed.div({
  show: {
    scaleX: 0,
    scaleY: 1,
    originX: '-5%',
    originY: '50%',
    transition: ({ key }) => bgTransitionConfig[key]
  },
  hide: {}
});

const ImgContainer = posed.div({
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
});

const Img = posed.img({
  show: createTransitionConfig({
    rotate: [0, -15]
  }, {
    duration: 800,
    ease: expoEaseOut
  })
});

class TransitionEffect extends React.PureComponent {
  static propTypes = propsWithDeco;

  static defaultProps = defaultPropsWithDeco;

  render() {
    const { shown, bgColor, onShown, onHidden, imgSrc } = this.props;
    return (
      <Wrapper
        initialPose='initial'
        pose={shown ? 'show' : 'hide'}
        className={styles.imgWrapper}
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
          className={styles.imgContainer}
        >
          <Img src={imgSrc} className={styles.img} />
        </ImgContainer>
      </Wrapper>
    );
  }
}

registerEffect('6', TransitionEffect);
