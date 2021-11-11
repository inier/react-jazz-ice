## 基本代码风格

#### Class Component

```
import React, { Component } from 'react';

interface Props {
  // props type here
}

interface State {
  // state type here
}

class ClassName extends Component<Props, State> {
  // state: State = {...}; 可将 state 写在这

  constructor(props: Props) {
    super(props);

    this.state = {
      // some state
    };
  }

  // some methods...

  render() {
    // return
  }
}

export default ClassName;
```

#### Function Component
