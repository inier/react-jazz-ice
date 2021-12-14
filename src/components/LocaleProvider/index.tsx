import React from 'react';

import { ConfigProvider } from '@alifd/next';
import enUS from '@alifd/next/lib/locale/en-us';
import zhCN from '@alifd/next/lib/locale/zh-cn';
import { IntlProvider } from 'react-intl';

// 引入 locale 配置文件
import localeEnUS from '@/locales/en-US';
import localeZhCN from '@/locales/zh-CN';

// 设置语言包
const localeInfo = {
  'zh-CN': {
    nextLocale: zhCN,
    appLocale: 'zh',
    appMessages: localeZhCN,
  },
  'en-US': {
    nextLocale: enUS,
    appLocale: 'en',
    appMessages: localeEnUS,
  },
};

interface Props {
  locale: string;
  children: React.ReactElement | React.ReactNode;
}

function LocaleProvider(props: Props) {
  const { locale, children } = props;

  const myLocale = localeInfo[locale] ? localeInfo[locale] : localeInfo['en-US'];

  return (
    <IntlProvider key={locale} locale={myLocale.appLocale} messages={myLocale.appMessages}>
      {/* @alifd/next库的全局配置 */}
      <ConfigProvider locale={myLocale.nextLocale}>{React.Children.only(children)}</ConfigProvider>
    </IntlProvider>
  );
}

export default LocaleProvider;
