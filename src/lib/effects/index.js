import React from 'react';
import PropTypes from 'prop-types';
import Effect1 from './effect1';
import Effect2 from './effect2';

const effectMap = {
  1: Effect1,
  2: Effect2
};

class Effect extends React.PureComponent {
  static propTypes = {
    effect: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }

  render() {
    const { effect, ...rest } = this.props;
    const EffectComp = effectMap[effect] || effectMap['1'];
    return <EffectComp {...rest} />
  }
}

export default Effect;
