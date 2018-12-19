import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import memoize from 'lodash.memoize';

import styles from './styles.css'

const wrapFunc = (func, oldFunc) => {
  return (...args) => {
    if (oldFunc) oldFunc(...args);
    if (func) func(...args);
  };
};

const isNumberLike = (value) => {
  return (typeof value === 'number' && !isNaN(value)) || /^\d+$/.test(value);
};

const portalRoot = document.createElement('div');
document.body.appendChild(portalRoot);

export default class HoverImageReveal extends Component {
  constructor(props) {
    super(props);
    this.enter = this.enter.bind(this);
    this.move = this.move.bind(this);
    this.leave = this.leave.bind(this);
    this.bindEvents = memoize(this.bindEvents.bind(this));
    this.state = {
      shown: false,
      x: 0,
      y: 0
    };
  }

  static propTypes = {
    children: PropTypes.element,
    wrapperClass: PropTypes.string,
    imageSrc: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    zIndex: PropTypes.number
  }

  static defaultProps = {
    width: '100px',
    height: '100px',
    zIndex: 1000,
    wrapperClass: ''
  }

  enter(event) {
    const { x, y } = this.computePosition(event);
    this.setState({
      shown: true,
      x,
      y
    });
    console.log('enter');
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
      shown: false
    });
  }

  computePosition(event) {
    return {
      x: event.clientX + 20,
      y: event.clientY + 20
    };
  }

  imgWrapperStyles() {
    const { x, y, shown } = this.state;
    let { width, height, zIndex } = this.props;
    if (isNumberLike(width)) width = width + 'px';
    if (isNumberLike(height)) height = height + 'px';
    return {
      position: 'absolute',
      left: `${x}px`,
      top: `${y}px`,
      width,
      height,
      zIndex: shown ? zIndex : zIndex - 1
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
      wrapperClass
    } = this.props
    if (!children) return null;
    const { shown } = this.state;
    const clonedChildren = React.Children.map(children, (child) => {
      return this.bindEvents(child);
    });

    const imgEl = ReactDOM.createPortal(<div className={wrapperClass} style={this.imgWrapperStyles()}>
      {Date.now()}
    </div>, portalRoot);

    return <React.Fragment>{clonedChildren}{imgEl}</React.Fragment>;
  }
}
