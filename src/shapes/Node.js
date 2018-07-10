import React, { PropTypes } from 'react';
import Shape from './Shape';
import ReactART from 'react-art';
const Group = ReactART.Group;
const Transform = ReactART.Transform;

class Node extends Shape {
  renderTreeNode(child, index) {
    const props = this.props;
    const cloneProps = {
      key: child.props.key || index,
      width: child.props.width || props.width,
      height: child.props.height || props.height,
      fill: child.props.fill || props.fill || window.NODE_DEFAULT_FILL,
      stroke: child.props.stroke || props.stroke || window.NODE_DEFAULT_STROKE,
      strokeWidth: child.props.strokeWidth || props.strokeWidth || window.NODE_DEFAULT_STROKE_WIDTH,
    };
    if (child.type.name === 'Circle') {
      cloneProps.radius = child.props.radius || Math.min(cloneProps.width, cloneProps.height);
    }
    if (child.type.name === 'Text') {
      cloneProps.color = child.props.color || props.fill || window.TEXT_DEFAULT_COLOR;
    }

    return React.cloneElement(child, cloneProps);
  }

  nodeClick() {
    if (this.props.onClick) {
      this.props.onClick.call(this, this.props.data.__data);
    }
  }
  render() {
    const { children, offset } = this.props;
    const groupTransform = new Transform();
    groupTransform.translate(offset[0], offset[1]);
    return (<Group className="node" transform={groupTransform} onClick={this.nodeClick.bind(this)}>
      {React.Children.map(children, this.renderTreeNode, this)}
    </Group>);
  }
}

Node.propTypes = {
  width: PropTypes.any.isRequired,
  height: PropTypes.any.isRequired,
};

export default Node;
