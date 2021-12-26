import { memo, useEffect, useState } from 'react';
import { useParams, history } from 'ice';
import { Button, List, Dialog } from '@alifd/next';
import { useRouteTabsContext } from '@/hooks';

const Detail2Demo = () => {
  const params = useParams();
  const [count, setCount] = useState(0);
  // console.log('================>Type');
  // console.log('================>type:location', location);
  // console.log('================>type:params', params);
  const { action } = useRouteTabsContext();
  let dialog = null;

  useEffect(() => {
    // console.log('================>mounted');
  }, []);

  return (
    <>
      <List header={<strong>测试用例</strong>} divider style={{ backgroundColor: '#fff', margin: 20 }}>
        <List.Item>param: type={params?.type}</List.Item>
        <List.Item>
          <Button
            onClick={() => {
              setCount(count + 1);
            }}
          >
            Click me：{count}
          </Button>
        </List.Item>
        <List.Item>
          <div>
            <Button
              onClick={() => {
                action?.replaceTab({
                  pathname: '/test/type/2',
                  state: { name: 'replace 打开的页面' },
                });
              }}
            >
              api.replace 当前页面: type=2
            </Button>
            <Button
              onClick={() => {
                action?.replaceTab({
                  pathname: '/test/type/3',
                  state: { name: 'replace 打开的页面' },
                });
              }}
            >
              api.replace 当前页面: type=3
            </Button>
          </div>
        </List.Item>
        <List.Item>
          <Button
            onClick={() => {
              history.replace({
                pathname: '/test/type/2',
                state: { name: 'replace 打开的页面' },
              });
            }}
          >
            history.replace 当前页面
          </Button>
        </List.Item>
        <List.Item>
          <a
            onClick={() => {
              action.replaceTab({
                pathname: '/test/detail',
                query: {
                  id: '888',
                },
              });
            }}
          >
            api替换当前页面
          </a>
        </List.Item>
        <List.Item>
          <a
            onClick={() => {
              history.replace({
                pathname: '/test/detail',
                query: {
                  id: '666',
                },
              });
            }}
          >
            history.replace替换当前页面
          </a>
        </List.Item>
        <List.Item>
          <Button
            onClick={() => {
              action?.triggerEvent('/test/list', 'test', count);
            }}
          >
            往列表页注册事件
          </Button>
        </List.Item>
        <List.Item>
          <Button
            disabled={!action?.enableBackPrevTab?.()}
            onClick={() => {
              action.backPrevTab();
            }}
          >
            选项卡后退
          </Button>
        </List.Item>
        <List.Item>
          <Button
            onClick={() => {
              action?.updateTabInstance(null, {
                closeTips: (callback) => {
                  dialog = Dialog.show({
                    content: '确定要关闭当前页面?',
                    onOk: () => {
                      callback();
                      dialog.hide();
                    },
                  });
                },
              });
            }}
          >
            为当前页添加自定义关闭提示
          </Button>
        </List.Item>
      </List>
    </>
  );
};

Detail2Demo.displayName = 'Detail2Demo';

export default memo(Detail2Demo);
