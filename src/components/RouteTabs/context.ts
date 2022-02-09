import { createContext } from 'react';

import { initialState } from './reducer';

export default createContext({
  state: initialState,
  dispatch: () => null,
  action: {
    openTab: (target, options?) => null,
    closeTab: (target, options) => null,
    closeOtherTab: (force = false) => null,
    closeRightTab: (force = false) => null,
    closeLeftTab: (force = false) => null,
    closeAllTab: (force = false) => null,
    backPrevTab: (target, force = false) => null,
    refreshTab: (target?) => null,
  },
} as any);
