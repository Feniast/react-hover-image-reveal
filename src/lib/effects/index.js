import React from 'react';
import PropTypes from 'prop-types';
import { getEffectComponent, getEffectConfig } from './effectMap';
import './_effects'

class Effect extends React.PureComponent {
  static propTypes = {
    effect: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    shown: PropTypes.bool.isRequired,
    onShown: PropTypes.func,
    onHidden: PropTypes.func
  }

  onPoseComplete = () => {
    const { shown, onShown, onHidden } = this.props;
    if (shown && onShown) onShown();
    else if (onHidden) onHidden();
  }

  render() {
    const { effect, ...rest } = this.props;
    const EffectComp = getEffectComponent(effect);
    if (!EffectComp) return null;
    return <EffectComp {...rest} onPoseComplete={this.onPoseComplete} />
  }
}

export default Effect;

export {
  getEffectConfig
};
