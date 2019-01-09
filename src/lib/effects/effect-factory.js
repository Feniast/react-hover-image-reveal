import React from 'react';
import posed from 'react-pose';
import { pick, isFunction } from '../util';

const parseComponent = node => {
  if (Array.isArray(node)) {
    return node.map(n => parseComponent(n));
  }
  let { type, config = {}, children, ...rest } = node;
  if (!type) type = 'div';
  const component = posed[type](config);
  if (children && children.length > 0) {
    children = children.map(c => parseComponent(c));
  }

  return {
    component,
    children,
    ...rest
  };
};

const AnimEffectFactory = config => {
  const { initialPose, pose, component, propTypes, defaultProps } = config;
  if (!pose || !component) return null;

  let tree = parseComponent(component);
  tree = Array.isArray(tree) ? tree : [tree];
  let root;

  if (tree.length > 1) {
    root = {
      component: posed.div(),
      children: tree
    };
  }
  if (tree.length === 1) {
    root = tree[0];
  }
  if (tree.length === 0) {
    root = null;
  }

  const Component = class extends React.PureComponent {
    resolveProps(propsAccessor) {
      const props = this.props;
      if (Array.isArray(propsAccessor)) {
        return pick(props, propsAccessor);
      }
      if (isFunction(propsAccessor)) {
        return propsAccessor(props);
      }
      return {};
    }

    renderComp(node, key, isRoot = false) {
      const {
        component: Comp,
        style,
        className,
        children,
        props: propsAccessor
      } = node;
      const compProps = this.resolveProps(propsAccessor);
      const compChildren =
        children && children.length > 0
          ? children.map((c, idx) => this.renderComp(c, idx))
          : null;

      const styleProps = isFunction(style) ? style(this.props) : style;

      const otherProps = {};
      if (isRoot) {
        otherProps.initialPose = this.props.initialPose || initialPose;
        otherProps.pose = this.props.pose || pose(this.props);
        otherProps.onPoseComplete = this.props.onPoseComplete;
      } else {
        otherProps.key = key;
      }

      return (
        <Comp className={className} style={styleProps} {...compProps} {...otherProps}>
          {compChildren}
        </Comp>
      );
    }

    render() {
      if (!root) return null;
      return this.renderComp(root, '', true);
    }
  };

  if (propTypes) Component.propTypes = propTypes;
  if (defaultProps) Component.defaultProps = defaultProps;

  return Component;
};

export default AnimEffectFactory;
