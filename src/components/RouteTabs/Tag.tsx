import React from 'react';

import { Tag, Balloon } from '@alifd/next';
import classNames from 'classnames';

import styles from './Tag.module.scss';

const { Tooltip } = Balloon;
const { Closeable: CloseableTag } = Tag;

interface IProps {
  title: string;
  value: any;
  isEllipsis?: boolean;
  isClose?: boolean;
  isActive?: boolean;
  tagTextMaxLen?: number; // 标签文字最大字数, 单位em
  tagTextMinLen?: number; // 标签文字最小字数, 单位em
  onClick: (value, e) => void;
  onClose?: (value) => void;
  className?: string;
  style?: object;
}

// Tab标签
const TabTag: React.FC<IProps> = ({
  title = '',
  value = '',
  isEllipsis = false,
  isClose = true,
  isActive = false,
  tagTextMaxLen = 6,
  tagTextMinLen = 2,
  onClick,
  onClose,
  className = '',
  style = {},
}) => {
  /* title省略时的处理 */
  const maxLength = isEllipsis ? tagTextMinLen : tagTextMaxLen;
  const props = {
    'data-key': value,
    style: isActive ? style : { maxWidth: `${+maxLength + 3}em`, ...style },
    className: classNames(styles.tag, { [styles.active]: isActive }, className),
    onClick: (e) => {
      onClick && onClick(value, e);
    },
  };
  const tagElem = () => {
    const Child = (
      <span>
        {/* 小圆点 */}
        <span className={styles.icon} />
        <span>{title}</span>
      </span>
    );

    if (!isClose) {
      return <Tag {...props}>{Child}</Tag>;
    }

    return (
      <CloseableTag
        {...props}
        afterClose={() => {
          onClose && onClose(value);
        }}
      >
        {Child}
      </CloseableTag>
    );
  };

  /* title省略时的处理 */
  return isEllipsis ? (
    <Tooltip key={`tooltip_${value}`} trigger={tagElem()} align="b">
      {title}
    </Tooltip>
  ) : (
    tagElem()
  );
};

export default TabTag;
