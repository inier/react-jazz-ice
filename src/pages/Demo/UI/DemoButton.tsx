import React from 'react';

import { Button } from '@alifd/next';

const DemoButton = () => {
  return (
    <div>
      <h3>small</h3>
      <Button size="small" type="primary">
        按钮
      </Button>
      <Button size="small">小按钮</Button>
      <Button size="small" disabled>
        小号按钮
      </Button>
      <h3>medium</h3>
      <Button size="medium" type="primary">
        按钮
      </Button>
      <Button size="medium">中按钮</Button>
      <Button size="medium" disabled>
        中号按钮
      </Button>
      <h3>large</h3>
      <Button size="large" type="primary">
        按钮
      </Button>
      <Button size="large">大按钮</Button>
      <Button size="large" disabled>
        大号按钮
      </Button>
      <h3>Group</h3>
      <Button.Group>
        <Button disabled>L</Button>
        <Button disabled>M</Button>
        <Button disabled>R</Button>
      </Button.Group>
    </div>
  );
};

export default DemoButton;
