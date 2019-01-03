import React from 'react';
import posed from 'react-pose';
import { commonProps, commonDefaultProps } from './props';

import styles from './reveal.css';

const EffectComponentFactory = ({
  containerConfig,
  imgConfig,
  containerStyles,
  imgStyles,
  hasWrapper,
  wrapperConfig,
  wrapperClass,
  wrapperStyles,
  hasBg,
  bgConfig,
  bgStyles
}) => {
  const ImgContainer = posed.div(containerConfig);
  const Img = posed.img(imgConfig);
  const Wrapper = posed.div(wrapperConfig || {});
  containerStyles = containerStyles || {};
  imgStyles = imgStyles || {};
  wrapperStyles = wrapperStyles || {};

  const EffectComponent = class EffectComponent extends React.PureComponent {
    static propTypes = commonProps;

    static defaultProps = commonDefaultProps;

    constructor(props) {
      super(props);
      this.onComplete = this.onComplete.bind(this);
    }

    onComplete() {
      const { shown, onShown, onHidden } = this.props;
      if (shown) {
        onShown && onShown();
      } else {
        onHidden && onHidden();
      }
    }

    render() {
      const { shown, imgSrc } = this.props;
      const poseConfig = {
        initialPose: 'initial',
        pose: shown ? 'show' : 'hide',
        onPoseComplete: this.onComplete
      };
      const content = (
        <ImgContainer
          style={containerStyles}
          className={styles.imgContainer}
          {...(hasWrapper ? {} : poseConfig)}
        >
          <Img src={imgSrc} style={imgStyles} className={styles.img} />
        </ImgContainer>
      );
      return hasWrapper ? (
        <Wrapper
          className={wrapperClass}
          style={wrapperStyles}
          {...poseConfig}
        >
          {content}
        </Wrapper>
      ) : (
        content
      );
    }
  };

  return EffectComponent;
};

export default EffectComponentFactory;
