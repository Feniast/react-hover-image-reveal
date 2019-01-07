import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import memoize from 'lodash.memoize';
import Effect, { getEffectConfig } from './effects';

const wrapFunc = (func, oldFunc) => {
  return (...args) => {
    if (oldFunc) oldFunc(...args);
    if (func) func(...args);
  };
};

const isNumberLike = value => {
  return (typeof value === 'number' && !isNaN(value)) || /^\d+$/.test(value);
};

const portalRoot = document.createElement('div');
document.body.appendChild(portalRoot);

const VISIBLE_STATE = {
  HIDDEN: 0,
  ENTER: 1,
  SHOWN: 2,
  LEAVE: 3
};

export default class HoverImageReveal extends Component {
  constructor(props) {
    super(props);
    this.enter = this.enter.bind(this);
    this.move = this.move.bind(this);
    this.leave = this.leave.bind(this);
    this.onShown = this.onShown.bind(this);
    this.onHidden = this.onHidden.bind(this);
    this.bindEvents = memoize(this.bindEvents.bind(this));
    this.state = {
      shown: false,
      x: 0,
      y: 0,
      visible: VISIBLE_STATE.HIDDEN
    };
  }

  static propTypes = {
    tag: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    position: PropTypes.oneOf(['top-left', 'bottom-left', 'top-right', 'bottom-right', 'center']),
    imgWrapperClass: PropTypes.string,
    imgSrc: PropTypes.string.isRequired,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    zIndex: PropTypes.number,
    effect: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };

  static defaultProps = {
    tag: 'div',
    className: '',
    position: 'bottom-right',
    width: '200px',
    height: '150px',
    zIndex: 1000,
    imgWrapperClass: '',
    effect: 1
  };

  enter(event) {
    const pos = this.computePosition(event);
    this.setState({
      shown: true,
      visible: VISIBLE_STATE.ENTER,
      ...pos
    });
  }

  onShown() {
    this.setState({
      visible: VISIBLE_STATE.SHOWN
    });
  }

  move(event) {
    const pos = this.computePosition(event);
    this.setState({
      ...pos
    });
  }

  leave() {
    this.setState({
      shown: false,
      visible: VISIBLE_STATE.LEAVE
    });
  }

  onHidden() {
    this.setState({
      visible: VISIBLE_STATE.HIDDEN
    });
  }

  computePosition(event) {
    const { clientX, clientY } = event;
    const { position } = this.props;
    switch (position) {
      case 'center':
        return {
          x: `${clientX}px`,
          y: `${clientY}px`,
          transform: 'translate(-50%, -50%)'
        }
      case 'top-left':
        return {
          x: `${clientX - 20}px`,
          y: `${clientY - 20}px`,
          transform: 'translate(-100%, -100%)'
        };
      case 'top-right':
        return {
          x: `${clientX + 20}px`,
          y: `${clientY - 20}px`,
          transform: 'translate(0%, -100%)'
        };
      case 'bottom-left':
        return {
          x: `${clientX - 20}px`,
          y: `${clientY + 20}px`,
          transform: 'translate(-100%, 0%)'
        };
      case 'bottom-right':
      default:
        return {
          x: `${clientX + 20}px`,
          y: `${clientY + 20}px`
        };
    }
  }

  getZIndex() {
    const { zIndex, effect } = this.props;
    const { visible } = this.state;
    const effectConfig = getEffectConfig(effect) || {};
    if (effectConfig.zIndex != null) {
      return effectConfig.zIndex;
    }
    switch (visible) {
      case VISIBLE_STATE.ENTER:
      case VISIBLE_STATE.SHOWN:
        return zIndex;
      case VISIBLE_STATE.LEAVE:
        return zIndex - 1;
      case VISIBLE_STATE.HIDDEN:
      default:
        return '';
    }
  }

  imgWrapperStyles() {
    const { x, y, transform } = this.state;
    let { width, height } = this.props;
    if (isNumberLike(width)) width = width + 'px';
    if (isNumberLike(height)) height = height + 'px';
    return {
      position: 'fixed',
      left: x,
      top: y,
      width,
      height,
      transform: transform || 'none',
      zIndex: this.getZIndex()
    };
  }

  bindEvents(child) {
    const {
      onMouseMove: oldMouseMove,
      onMouseEnter: oldMouseEnter,
      onMouseLeave: oldMouseLeave
    } = child.props;
    const onMouseMove = wrapFunc(this.move, oldMouseMove);
    const onMouseEnter = wrapFunc(this.enter, oldMouseEnter);
    const onMouseLeave = wrapFunc(this.leave, oldMouseLeave);
    return React.cloneElement(child, {
      onMouseEnter,
      onMouseMove,
      onMouseLeave
    });
  }

  render() {
    const {
      children,
      imgWrapperClass,
      className,
      tag: Tag,
      ...rest
    } = this.props;
    if (!children) return null;
    const { shown, visible } = this.state;
    const imgEl =
      visible === VISIBLE_STATE.HIDDEN
        ? null
        : ReactDOM.createPortal(
          <div className={imgWrapperClass} style={this.imgWrapperStyles()}>
            <Effect
              shown={shown}
              onShown={this.onShown}
              onHidden={this.onHidden}
              {...rest}
            />
          </div>,
          portalRoot
        );

    return (
      <React.Fragment>
        {
          <Tag
            className={className}
            onMouseMove={this.move}
            onMouseEnter={this.enter}
            onMouseLeave={this.leave}
          >
            {children}
          </Tag>
        }
        {imgEl}
      </React.Fragment>
    );
  }
}
