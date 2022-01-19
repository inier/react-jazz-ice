import { useContext } from 'react';

import { MobXProviderContext, useObserver } from 'mobx-react';

const useMobxStores = () => useContext(MobXProviderContext);
const useMobxStore = (name) => useContext(MobXProviderContext)[name] || {};

export function inject(selector, baseComponent) {
  const useComponent = (ownProps) => {
    const store = useContext(MobXProviderContext);

    return useObserver(() => baseComponent(selector({ store, ownProps })));
  };
  useComponent.displayName = baseComponent.name;

  return useComponent;
}

export { useMobxStores, useMobxStore };
