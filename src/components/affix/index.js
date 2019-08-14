import React from "react";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";

import cx from "classnames";
import throttle from "lodash/throttle";

import getViewPortSize from "../../utils/getViewportSize";
import WindowEventHandler from "../../utils/components/windowEventHandler";

import "./affix.scss";

class Affix extends React.PureComponent {
  static propTypes = {
    offsetTop: PropTypes.number,
    offsetBottom: PropTypes.number,
    onPin: PropTypes.func,
    onUnpin: PropTypes.func,
    zIndex: PropTypes.number,
    className: PropTypes.string,
    placeHoldClassName: PropTypes.string,
    prefix: PropTypes.string
  };

  static defaultProps = {
    prefix: "bxu",
    zIndex: 10
  };

  constructor(props) {
    super(props);
    this.affix = false;
    this.state = {
      position: "static",
      left: 0
    };
  }

  pin() {
    const { onPin } = this.props;
    this.affix = true;
    this.setState({
      position: "fixed",
      // fixed位置会默认使用当前位置，而设置了fixed以后就失去了默认width属性，所以位置就会跳。
      // 所以显式的设置了width就ok了
      width: `${findDOMNode(this).offsetWidth}px`
    });
    onPin && onPin();
  }

  unPin() {
    const { onUnpin } = this.props;
    this.affix = false;
    this.setState({
      position: "static"
    });
    onUnpin && onUnpin();
  }

  updateAffix = () => {
    const { offsetTop, offsetBottom } = this.props;
    const node = findDOMNode(this);
    let realNum, propNum;

    if (offsetBottom) {
      // if bottom fix case
      realNum = getViewPortSize().height - node.getBoundingClientRect().bottom;
      propNum = offsetBottom;
    } else {
      // if top fix case
      realNum = node.getBoundingClientRect().top;
      propNum = offsetTop;
    }

    if (this.affix && realNum > propNum) {
      this.unPin();
    }
    if (!this.affix && realNum <= propNum) {
      this.pin();
    }
  };

  getAffixStyle = () => {
    const affix = this.affix;
    const { offsetTop, offsetBottom, zIndex } = this.props;
    const affixStyle = {};

    if (affix) {
      affixStyle.width = this.state.width;
      if (offsetTop) {
        affixStyle.top = `${offsetTop}px`;
      } else if (offsetBottom) {
        affixStyle.bottom = `${offsetTop}px`;
      }
    }

    return {
      position: this.state.position,
      zIndex,
      ...affixStyle
    };
  };

  handleEvent = throttle(this.updateAffix, 20);

  componentDidMount() {
    this.updateAffix();
  }

  render() {
    const { placeHoldClassName, className, prefix, children } = this.props;

    const wrapperClass = cx(
      {
        [`${prefix}-affix`]: true
      },
      className
    );

    return (
      <div className={placeHoldClassName}>
        <div className={wrapperClass} style={{ ...this.getAffixStyle() }}>
          {" "}
          {children}{" "}
        </div>{" "}
        <WindowEventHandler eventName="resize" callbackFn={this.handleEvent} />{" "}
        <WindowEventHandler eventName="scroll" callbackFn={this.handleEvent} />{" "}
      </div>
    );
  }
}

export default Affix;
