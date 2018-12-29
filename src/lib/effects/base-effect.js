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
  wrapperClass,
  wrapperStyles
}) => {
  const ImgContainer = posed.div(containerConfig);
  const Img = posed.img(imgConfig);
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
      const content = (
        <ImgContainer
          initialPose='initial'
          pose={shown ? 'show' : 'hide'}
          style={containerStyles}
          className={styles.imgContainer}
          onPoseComplete={this.onComplete}
        >
          <Img src={imgSrc} style={imgStyles} className={styles.img} />
        </ImgContainer>
      );
      return hasWrapper ? (
        <div className={wrapperClass} style={wrapperStyles}>
          {content}
        </div>
      ) : content;
    }
  };

  return EffectComponent;
};

export default EffectComponentFactory;
