import React, { useRef, useLayoutEffect, useEffect, useCallback, useState, ReactElement } from 'react';

import classNames from 'classnames';
import { debounce } from 'lodash-es';

import styles from './index.module.scss';
import TTabOptionArea from './TabOptionArea';

interface IProps {
  panes: string[];
  itemRender: ({ value: any, index: number, isEllipsis: boolean }) => ReactElement;
  TabOptionArea?: ReactElement;
  handleMenuClick?: (e) => void;
  className?: string;
  style?: object;
}

// Tab标签区
const TabTagArea: React.FC<IProps> = ({
  panes,
  itemRender,
  TabOptionArea,
  handleMenuClick,
  children,
  className,
  style,
}) => {
  const ref = useRef(null);
  const [isEllipsis, setIsEllipsis] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const autoAdjust = useCallback(
    debounce(() => {
      const dom: any = ref.current;
      if (dom && dom.scrollWidth > dom.offsetWidth) {
        setIsEllipsis(true);
      } else {
        setIsEllipsis(false);
      }
    }, 200),
    [setIsEllipsis, ref],
  );
  useLayoutEffect(() => {
    autoAdjust();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [panes.length]);

  useEffect(() => {
    window.addEventListener('resize', autoAdjust);
    return () => {
      window.removeEventListener('resize', autoAdjust);
    };
  }, [autoAdjust]);

  const cls = classNames(styles['router-tabs-tags'], className);

  const tags = panes.map((pathname, index) => {
    if (itemRender) {
      return itemRender({ value: pathname, index, isEllipsis });
    }

    return null;
  });

  return (
    <div className={cls} style={{ ...style }}>
      {/* tabs的tags容器 */}
      <div className={`${styles['router-tabs-tags-box']}`}>
        <div className={`${styles['router-tabs-tags-cont']}`} ref={ref}>
          {children || tags}
        </div>
      </div>
      {/* 快捷功能 */}
      {TabOptionArea || <TTabOptionArea tags={tags} onClick={handleMenuClick} />}
    </div>
  );
};

export default TabTagArea;
