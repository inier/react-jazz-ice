import { useContext } from 'react';

import { MobXProviderContext, useObserver } from 'mobx-react';

const useMobxStores = () => useContext(MobXProviderContext);

export function inject(selector, baseComponent) {
  const useComponent = (ownProps) => {
    const store = useContext(MobXProviderContext);

    return useObserver(() => baseComponent(selector({ store, ownProps })));
  };
  useComponent.displayName = baseComponent.name;

  return useComponent;
}

export default useMobxStores;
