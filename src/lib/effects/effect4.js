import React from 'react';
import posed from 'react-pose';
import { propsWithDeco, defaultPropsWithDeco } from './props';
import { expoEaseOut } from './cubic-bezier';
import { createTransitionConfig } from '../util';

import styles from './reveal.css';

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

const Bg = posed.div({
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
});

const ImgContainer = posed.div({
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
});

const Img = posed.img({
  show: createTransitionConfig({
    rotate: [-35, 0],
    scale: [2, 1]
  }, imgEnterTransition),
  hide: {}
});

export default class TransitionEffect extends React.PureComponent {
  static propTypes = propsWithDeco;

  static defaultProps = defaultPropsWithDeco;

  render() {
    const { shown, bgColor, onShown, onHidden, imgSrc } = this.props;
    return (
      <>
        <Bg
          initialPose='initial'
          pose={shown ? 'show' : 'hide'}
          className={styles.imgBg}
          style={{ backgroundColor: bgColor }}
        />
        <ImgContainer
          className={styles.imgContainerNoOverflow}
          initialPose='initial'
          pose={shown ? 'show' : 'hide'}
          onPoseComplete={() => {
            if (shown) onShown && onShown();
            else onHidden && onHidden();
          }}
        >
          <Img src={imgSrc} className={styles.img} />
        </ImgContainer>
      </>
    );
  }
}
