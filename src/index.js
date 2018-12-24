import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import memoize from 'lodash.memoize';
import Effect from './lib/effects/effect1';
import Effect2 from './lib/effects/effect2';

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
    imgWrapperClass: PropTypes.string,
    imgSrc: PropTypes.string.isRequired,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    zIndex: PropTypes.number
  };

  static defaultProps = {
    tag: 'div',
    className: '',
    width: '200px',
    height: '150px',
    zIndex: 1000,
    imgWrapperClass: ''
  };

  enter(event) {
    const { x, y } = this.computePosition(event);
    this.setState({
      shown: true,
      visible: VISIBLE_STATE.ENTER,
      x,
      y
    });
  }

  onShown() {
    this.setState({
      visible: VISIBLE_STATE.SHOWN
    });
  }

  move(event) {
    const { x, y } = this.computePosition(event);
    this.setState({
      x,
      y
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
    return {
      x: event.clientX + 20,
      y: event.clientY + 20
    };
  }

  getZIndex() {
    const { zIndex } = this.props;
    const { visible } = this.state;
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
    const { x, y } = this.state;
    let { width, height } = this.props;
    if (isNumberLike(width)) width = width + 'px';
    if (isNumberLike(height)) height = height + 'px';
    return {
      position: 'absolute',
      left: `${x}px`,
      top: `${y}px`,
      width,
      height,
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
      imgSrc,
      className,
      tag: Tag
    } = this.props;
    if (!children) return null;
    const { shown, visible } = this.state;
    const imgEl =
      visible === VISIBLE_STATE.HIDDEN
        ? null
        : ReactDOM.createPortal(
          <div className={imgWrapperClass} style={this.imgWrapperStyles()}>
            <Effect2
              shown={shown}
              imgSrc={imgSrc}
              onShown={this.onShown}
              onHidden={this.onHidden}
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
