import React from 'react';
import resList from '@/../mock/resList';
import { getInitialData } from 'ice';
import { transform } from 'lodash-es';

function trans(objA, objB) {
  console.log(objA, objB);
  transform();
}

function Ui() {
  const { flatRoutes } = getInitialData();

  trans(resList, flatRoutes);

  return <div>Ui</div>;
}

export default Ui;
