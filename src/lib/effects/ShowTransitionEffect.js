import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-spring';

export default class ShowTransitionEffect extends React.PureComponent {
  static propTypes = {
    shown: PropTypes.bool.isRequired,
    from: PropTypes.object,
    enter: PropTypes.object,
    leave: PropTypes.object,
    config: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    onShown: PropTypes.func,
    onHidden: PropTypes.func,
    children: PropTypes.func
  };

  render() {
    const { shown, onShown, onHidden, children, ...rest } = this.props;
    return (
      <Transition
        native
        unique
        reset
        items={shown}
        {...rest}
        onRest={() => {
          if (shown) {
            onShown && onShown();
          } else {
            onHidden && onHidden();
          }
        }}
      >
        {shown => shown && children}
      </Transition>
    );
  }
}
