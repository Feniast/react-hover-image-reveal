import React from 'react';
import PropTypes from 'prop-types';
import Effect1 from './effect1';
import Effect2 from './effect2';
import Effect3 from './effect3';
import Effect4 from './effect4';
import Effect5 from './effect5';
import Effect6 from './effect6';

const effectMap = {
  1: Effect1,
  2: Effect2,
  3: Effect3,
  4: Effect4,
  5: Effect5,
  6: Effect6
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
