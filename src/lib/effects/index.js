import React from 'react';
import PropTypes from 'prop-types';
import { getEffectComponent, getEffectConfig } from './effectMap';
import './effect1'
import './effect2'
import './effect3'
import './effect4'
import './effect5'
import './effect6'
import './effect7'

class Effect extends React.PureComponent {
  static propTypes = {
    effect: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }

  render() {
    const { effect, ...rest } = this.props;
    const EffectComp = getEffectComponent(effect);
    if (!EffectComp) return null;
    return <EffectComp {...rest} />
  }
}

export default Effect;

export {
  getEffectConfig
};
