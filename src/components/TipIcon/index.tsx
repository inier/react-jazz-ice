import React from 'react';

import { Balloon, Icon } from '@alifd/next';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const { Tooltip } = Balloon;

// 图标组件
const TipIcon = ({ disabled, trigger, className, onClick, ...restProps }) => {
  return (
    <Tooltip
      v2
      trigger={
        <span className={classnames(className, styles.iconWrapper)} onClick={disabled ? () => {} : onClick}>
          {trigger || <Icon {...restProps} />}
        </span>
      }
      align="tl"
    >
      {}
    </Tooltip>
  );
};

TipIcon.displayName = 'TipIcon';

TipIcon.propTypes = {
  /**
   * 鼠标经过时的 tooltips 提示
   */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * 禁用, 会禁用 click 事件
   */
  disabled: PropTypes.bool,
  /**
   * 自定义 className
   */
  className: PropTypes.string,
  /**
   * click 事件
   */
  onClick: PropTypes.func,
};

TipIcon.defaultProps = {
  disabled: false,
  onClick: null,
};

export default TipIcon;
