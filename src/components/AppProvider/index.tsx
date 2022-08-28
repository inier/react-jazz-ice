import React, { useState, Children, ReactElement, ReactNode } from 'react';

import { ConfigProvider } from '@alifd/next';
import { Provider } from 'mobx-react';
import { AliveScope } from 'react-activation';

import ToastAndLoading from '@/modules/ToastAndLoading';
import stores from '@/stores';

import LocaleProvider from '../LocaleProvider';

interface IProps {
  keepAlive?: boolean;
  locale?: string;
  children: ReactElement | ReactNode;
}

// window resize
(() => {
  const throttle = (type: string, name: string, obj: Window = window) => {
    let running = false;

    const func = () => {
      if (running) return;

      running = true;
      requestAnimationFrame(() => {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };

    obj.addEventListener(type, func);
  };

  if (typeof window !== 'undefined') {
    throttle('resize', 'optimizedResize');
  }
})();

interface IGetDevice {
  (width: number): 'phone' | 'tablet' | 'desktop';
}

const getDevice: IGetDevice = (width) => {
  const isPhone = typeof navigator !== 'undefined' && navigator && navigator.userAgent.match(/phone/gi);

  if (width < 680 || isPhone) {
    return 'phone';
  } else if (width < 1280 && width > 680) {
    return 'tablet';
  } else {
    return 'desktop';
  }
};

const AppProvider = (props: IProps) => {
  const { keepAlive = true, locale = '', children } = props;
  const [device, setDevice] = useState(getDevice(NaN));

  // if (typeof window !== 'undefined') {
  //   window.addEventListener('optimizedResize', (e) => {
  //     const deviceWidth = (e && e.target && (e.target as Window).innerWidth) || NaN;

  //     setDevice(getDevice(deviceWidth));
  //   });
  // }

  const content = (
    <>
      {Children.only(children)}
      <ToastAndLoading />
    </>
  );

  return (
    <LocaleProvider locale={locale}>
      {/* 状态管理：服务类、函数组件 */}
      <Provider {...stores}>
        <ConfigProvider device={device}>{keepAlive ? <AliveScope>{content}</AliveScope> : content}</ConfigProvider>
      </Provider>
    </LocaleProvider>
  );
};

export default AppProvider;
