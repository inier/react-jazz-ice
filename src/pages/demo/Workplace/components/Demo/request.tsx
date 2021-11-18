import React from 'react';
import {inject, observer} from 'mobx-react';

function DemoRequest({menuStore}) {
const handleClick = ()=>{
    menuStore.getAdminResList();
}
    
  return (
    <div>
        <button onClick={handleClick}>request加载</button>
        DemoRequest: <span>{menuStore.resList[0]?.resourceName}</span>
    </div>
  );
}

export default inject("menuStore")(observer(DemoRequest));
