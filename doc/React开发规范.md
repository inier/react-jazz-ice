## React 开发规范

### class 组件开发

### func 组件 + hooks 开发

func 组件在 class 时代是极度贫血的，如同快枯竭的沙漠。hooks 对其就像注入的清泉。开发者可以非常方便的抽离状态逻辑（两者本为一体，请勿拆而论之）。但 hook 并不算一个优雅的设计，存在很多约定及限制，且缺少最佳实践（套路）。
在函数组件搭配 HOOK 进行开发时，要注意一些问题：

1.  闭包问题
    hooks 在一般场景下没有闭包问题。但要警惕延迟调用场景下的闭包问题，如使用 setTimeout、setInterval、Promise.then、useEffect 的卸载函数等时。可通过`useRef`处理。

    ```
    const [count, setCount] = useState(0);

    // 通过 ref 来记忆最新的 count
    const countRef = useRef(count);
    countRef.current = count;

    useEffect(() => {
    const timer = setTimeout(() => {
        console.log(countRef.current)
    }, 3000);
    return () => {
        clearTimeout(timer);
    }
    }, [])
    ...
    ```

2.  正确使用 `useState`
    `useState`虽然看起来简单，但其实是最容易出问题的一个 hook，应注意其使用方法。

- 能够用其他状态计算推导的值就不用再单独声明状态;

  ```
  // bad
  const [a, setA] = useState(1);
  const [b, setB] = useState(2);
  ...
  setA(current);
  setB(current*2);

  // good
  const [a, setA] = useState(1);
  const b = a*2;
  ...
  setA(a);
  ```

- 适当合并 `useState`。hooks 中 state 应职责单一，但过犹不及，有些人会全部拆成单一值，这不仅难看，而且特别难看，e，难维护。建议按含义关联性进行分组，如果某组 state 较多，可考虑通过它爸 `useReducer` 处理。也可以用 ahooks 的 `useSetState` 来实现 set 自动合并。

  ```
  // useState 不会合并 set
  const [userInfo, setUserInfo] = useState({
  firstName,
  lastName,
  ...
  });
  setUserInfo(s=> ({
  ...s,
  fristName,
  }));

  // ahooks 的 useSetState 会自动合并 set
  const [userInfo, setUserInfo] = useSetState({
  firstName,
  lastName,
  ...
  });
  setUserInfo({
  firstName
  });

  ```

3.  复杂状态，用 `useReducer`
    当组件中关联的状态较为复杂，更适合用`useReducer`。

- 更容易归纳、管理大量状态

  ```
  const initialState = {count: 0};

  function reducer(state, action) {
    switch (action.type) {
      case 'increment':
        return {count: state.count + 1};
      case 'decrement':
        return {count: state.count - 1};
      default:
        throw new Error();
    }
  }

  function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <>
        Count: {state.count}
        <button onClick={() => dispatch({type: 'increment'})}>+</button>
        <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      </>
    );
  }
  ```

- 更容易被测试

  useReducer 中，将跟 state 相关的业务逻辑单独放在了独立的函数中，状态逻辑与组件 UI 天然隔离。非常适合编排测试代码。

  ```
  test('it supports undoing the state', () => {
    const state = { past: [{ count: 0 }], present: { count: 1 }, future: [] };
    const newState = reducer(state, { type: 'UNDO' });

    expect(newState.present.count).toBe(0);
  });
  ```

- 更容易被其他开发者理解
  状态按分组管理，更符合设计。他人接收项目更轻松。 reducer、action、dispatch 的风格，也比 useState 的多个单独的 setter 更直观，更容易被掌握。

4.  useContext + useReducer 全局状态管理

    context 配合 hooks 的 useReducer 提供了更为强大的状态管理能力。

    ```
    // xxx/reducer.ts
    export const initialState = {
      p1: {
        id: xxx,
        ...
      },
      ...
    };
    export const reducer = (state, action) => {
      switch (action.type) {
        case 'P1_UPDATE': {
          return {
            ...state,
            p1: action.payload ? [...state.p1, action?.payload] : state.p1,
          };
        }
        ...
      }
    }

    // xxx/store.ts
    import React, {createContext, useContext, useReducer} from 'react';
    import { initialState } from './reducer';

    // step1. 新建全局Context
    export const StateContext = createContext({
      state: initialState,
      dispatch: () => null,
      action: {},
    });

    // step2. 封装hook：useStateValue 供customer使用，而不需要在每个组件里调用useContext。
    // xxx/hooks.ts
    export const useStateValue = () => useContext(StateContext);
    export const useApi = (state, dispatch) => {
      const updateP1 = (newInfo) =>{
        ...
        dispatch({
          type: 'P1_UPDATE',
          payload: {
            id: newInfo.id,
            ...
          },
        });
      }
      return {
        updateP1,
      };
    }

    // step3. 封装Provider，将context的值设置为useReducer(reducer, initialState)，当调用action执行reducer后，context的值也将发生变化，使得引用context值的组件更新。由useReducer也保证了只有在数据变化时才会更新组件。
    export const StateProvider = ({reducer, initialState, children}) =>(
      const [state, dispatch] = useReducer(reducer, initialState);
      const api = useApi(state, dispatch);

      <StateContext.Provider value={{state, dispatch, action: api}}>
        {children}
      </StateContext.Provider>
    );

    // step4. 使用StateProvider包裹要使用该context的顶层组件
    // App.tsx
    import { StateProvider, useStateValue } from './xxx/store';

    const App = () =>{
      return <StateProvider><Comp1 /></StateProvider>;
    }
    // step5. 组件内调用
    const Comp1 = () =>{
      const {state, action} = useStateValue();

      return <div onClick={()=>{action.updateP1({id: xxx})}}>{state.p1}</div>;
    }
    ```

    > 更多示例可以参考 src/components/RouteTabs 组件。

5.  注意`useEffect`的多重副作用

- `useEffect` 不是简单的 Watch state
  `useEffect`用于监听 state 的变化，但不仅于此。还要负责监听 componentDidMount，需要用[]空依赖来区分 Mount 和 Update。

```
useEffect(onMount, [])
```

- 优化`useEffect`的 deps
  只有变化时需要重新执行 `useEffect` 的变量[props、state]，才要放到 deps 中。而不是 useEffect 用到的变量都放到 deps 中。不要被官方的 eslint 警告误导。

6.  尽量减少使用 `useCallback`
    一是会让代码可读性变差；二是大部分场景不会提升性能；三是当多个 useCallback 间出现依赖关系时，deps 的维护变得复杂，且容易导致引用过时的问题。除非有个别非常复杂的组件。就算要使用，也要在受影响的子组件中配套 `shouldComponentUpdate` 或者 `React.memo` 来忽略同样的参数重复渲染。

    ```
    const App = () =>{
        ...
        const someFunc = useCallback(()=> {
        doSomething();
        }, []);

        return <ExpensiveComponent func={someFunc} />
    }
    const ExpensiveComponent = React.memo(({ func }) => {
      return (
        <div onClick={func}>
        hello
        </div>
      )
    });
    ```

7.  推荐使用`useMemo`
    数据计算量较大时，使用`useMemo` 缓存计算结果，简单计算就算了，回不到本。

    ```
    // 不用 useMemo
    const memoizedValue = computeExpensiveValue(a, b);

    // 使用 useMemo
    const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
    ```

8.  `useRef`不是银弹
    useRef 与 Class Component 的 React.createRef()几乎等价。其保留的引用始终不会改变。但不能随意滥用 useRef，因为其可能导致过期引用得不到释放。慎之。

9.  自定义 hook，可维护更重要

- hook 要么「挂靠生命周期」要么「处理 State」，否则就没必要。
- 提倡自定义 hook，是建立在分离状态逻辑和视图，提高代码维护性的前提下。不是只要存在生命周期就需要封装 hook，而忽视代码维护性。如下方示例，那种封装更好呢？

  ```js
  // 1. 封装前
  function App() {
    useEffect(() => {
      // `useEffect` 参数不能是 async function
      (async () => {
        await Promise.all([fetchA(), fetchB()]);
        await postC();
      })();
    }, []);
    return <div>xxx</div>;
  }
  // --------------------------------------------------

  // 2. 自定义 Hooks
  function App() {
    useA();
    return <div>xxx</div>;
  }

  function useA() {
    useEffect(() => {
      (async () => {
        await Promise.all([fetchA(), fetchB()]);
        await requestC();
      })();
    }, []);
  }
  // --------------------------------------------------
  // 3. 传统封装
  function App() {
    useEffect(() => {
      requestABC();
    }, []);
    return <div>xxx</div>;
  }

  async function requestABC() {
    await Promise.all([fetchA(), fetchB()]);
    await requestC();
  }
  ```

10. 其他问题

待补充。。。
