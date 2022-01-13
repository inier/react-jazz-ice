## React 开发规范

### hooks 开发注意事项

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

    - 能够用其他状态计算推导的值就不用再单独声明状态；

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
    // useState不会合并set
    const [userInfo, setUserInfo] = useState({
    firstName,
    lastName,
    ...
    });
    setUserInfo(s=> ({
    ...s,
    fristName,
    }));

    // ahooks 的 useSetState 会自动合并set
    const [userInfo, setUserInfo] = useSetState({
    firstName,
    lastName,
    ...
    });
    setUserInfo({
    firstName
    });
    ```

- 只有变化时需要重新执行 `useEffect` 的变量，才要放到 deps 中。而不是 useEffect 用到的变量都放到 deps 中。

3. 尽量减少使用 `useCallback`
   一是会让代码可读性变差；二是大部分场景不会提升性能。除非有个别非常复杂的组件。就算要使用，也要在受影响的子组件中配套 `shouldComponentUpdate` 或者 `React.memo` 来忽略同样的参数重复渲染。

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

3. 推荐使用`useMemo`
   数据计算量较大时，使用`useMemo` 缓存计算结果，简单计算就算了，回不到本。

```

// 不用 useMemo
const memoizedValue = computeExpensiveValue(a, b);

// 使用 useMemo
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

```

```

```
