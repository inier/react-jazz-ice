import { createContext } from 'react';

import { initialState } from './reducer';

export default createContext({
  state: initialState,
  dispatch: () => null,
  action: {},
});
