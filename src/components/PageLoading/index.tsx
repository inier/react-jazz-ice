import React from 'react';

import { Loading } from '@alifd/next';

const PageLoading = ({ visible }) => {
  return <Loading fullScreen visible={visible} />;
};

export default PageLoading;
