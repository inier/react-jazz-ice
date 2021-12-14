import React, { Children, ReactElement, ReactNode } from 'react';

import { Provider } from 'mobx-react';
import { AliveScope } from 'react-activation';

import stores, { StoresContext } from '@/stores';

import LocaleProvider from '../LocaleProvider';

interface Props {
  locale: string;
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

function AppProvider(props: Props) {
  const { locale, children } = props;

  return (
    <LocaleProvider locale={locale}>
      {/* 状态管理：服务类、函数组件 */}
      <Provider {...stores}>
        {/* 状态管理：服务函数组件 */}
        <StoresContext.Provider value={{ ...stores }}>
          {/* keep-alive 必要组件 */}
          {/* <AliveScope> */}
          {Children.only(children)}
          {/* </AliveScope> */}
        </StoresContext.Provider>
      </Provider>
    </LocaleProvider>
  );
}

export default AppProvider;
