import { createContext } from 'react';

import { initialState } from '@/components/RouteTabs/reducer';

export default createContext({
  state: initialState,
  dispatch: () => null,
  action: {},
});
