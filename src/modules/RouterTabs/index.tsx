/* eslint-disable @iceworks/best-practices/recommend-functional-component */
import React, { Component } from 'react';

import { appHistory } from '@ice/stark';
import classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { UIStore, MenuStore } from '@/stores';
import { obj2search } from '@/utils';

import Iframe from './components/Iframe';
import Main from './components/Main';
import TabTagArea from './components/TabTagArea';
import styles from './index.module.scss';

interface IRouterTabsProps extends RouteComponentProps {
  value: string;
  routeType: string;
  initTitle: string;
  handleChange: (params?) => void;
  menuStore: MenuStore;
  UIStore: UIStore;
}
interface IRouterTabsStates {
  currentPageName: string; // 当前路由对应的pathname
  refsTag: string[]; // 所有tab标签列表
  searchMap: object; // 每个tab标签对应的search参数
  isRefreshCurrentPage: boolean; // 当前iframe是否刷新
}

@inject('UIStore', 'menuStore')
@withRouter
@observer
class RouterTabs extends Component<IRouterTabsProps, IRouterTabsStates> {
  static defaultProps = {
    value: '',
    routeType: 'iframe',
    initTitle: '404',
  };

  // 更新tab选中值
  static getDerivedStateFromProps(nextProps, prevState) {
    const { value } = nextProps;

    if (value && value !== prevState.currentPageName) {
      return {
        currentPageName: value,
      };
    }

    return null;
  }

  unListen: any;
  ref: any;
  notListenOnce: boolean;
  didUnMounted: boolean;
  tagChangeTimerId: any;

  constructor(props) {
    super(props);
    const { value } = props;

    this.state = {
      currentPageName: value, // 当前路由对应的pathname
      refsTag: value ? [value] : [], // 所有tab标签列表
      searchMap: {}, // 每个tab标签对应的search参数
      isRefreshCurrentPage: false, // 当前iframe是否刷新
    };
    this.unListen = null;

    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.ref = React.createRef();
  }

  componentDidMount() {
    // 重置history监听
    if (this.unListen) {
      this.unListen();
      this.unListen = null;
    }

    // 监听路由切换事件
    this.unListen = this.props.history.listen((_location) => {
      // 已卸载的标记
      if (this.didUnMounted) {
        return;
      }

      // 持续监听
      if (this.notListenOnce) {
        this.notListenOnce = false;
        return;
      }

      const { refsTag } = this.state;
      const { menuStore } = this.props;
      const { pathname, search } = _location;
      const newRefsTag = [...refsTag];
      const currentPathname = pathname;

      // 根路由处理
      if (pathname === '/') {
        this.setState({
          currentPageName: '',
          refsTag: [],
        });
        return;
      }

      // 临时变量，用于汇集新的state，便于一次性setState
      const tStateObj: any = {};

      // 当前路由不在路由表中
      if (newRefsTag.indexOf(currentPathname) === -1) {
        if (menuStore.pathValidate(currentPathname)) {
          newRefsTag.push(currentPathname);
        } else {
          // 默认标签页处理
          const tDefaultPath = menuStore.getDefaultMenuItemPath(_location);
          if (tDefaultPath && !refsTag.includes(tDefaultPath)) {
            newRefsTag.push(tDefaultPath);
          }
        }
        tStateObj.refsTag = newRefsTag;
      }

      // 保存tab路径的search参数
      if (search && search.indexOf('type=top') === -1) {
        tStateObj.searchMap[pathname] = search;
      }

      this.setState(tStateObj, () => {
        console.log('=====================================');
        console.log('route-state:', this.state);
        console.log('=====================================');
      });

      // 新标签项添加完成后调用scrollIntoTags，优化多标签的显示
      clearTimeout(this.tagChangeTimerId);
      this.tagChangeTimerId = setTimeout(() => {
        this.scrollIntoTags(pathname);
      }, 100);
    });

    const { pathname } = this.props.location;
    this.scrollIntoTags(pathname);
  }

  componentWillUnmount() {
    this.didUnMounted = true;
    if (this.unListen) {
      this.unListen();
      this.unListen = null;
    }
  }

  addRouteTagDispatch = (event) => {
    if (event.origin !== window.location.origin) {
      return;
    }

    if (event.data.method === 'addRouteTagDispatch') {
      console.log('addRouteTagDispatch:', event.data);
      this.handleClickTag(event.data.data);
    }
  };

  handleClose = (tag) => {
    const { location, history } = this.props;
    const { pathname } = location;
    let { currentPageName } = this.state;
    const { searchMap, refsTag } = this.state;
    const newRefsTag = [...refsTag.filter((t) => t !== tag)];

    if (currentPageName === tag) {
      currentPageName = refsTag[refsTag.indexOf(tag) - 1]; // 默认保留一个
    }

    this.setState({
      currentPageName,
      refsTag: newRefsTag,
    });

    if (pathname !== currentPageName) {
      this.notListenOnce = true;
      history.push({
        pathname: currentPageName,
        search: searchMap[currentPageName],
      });
    }
  };

  handleClickTag = (tag, e?) => {
    // 排除Tag上的小图标点击
    if (e && e.target.tagName.toLowerCase() === 'i') {
      return;
    }

    const { currentPageName, refsTag, searchMap } = this.state;
    const { routeType, handleChange, history, menuStore } = this.props;

    // 切换不同标签：相同标签不处理
    if (tag !== currentPageName) {
      const tUrlObj = {
        pathname: tag,
        search: searchMap[tag] ? searchMap[tag].replace(/from=[^&]+&?/, '') : undefined,
      };

      history.push(tUrlObj);

      // 路由不同的类型
      switch (routeType) {
        case 'iframe': {
          console.log('Routes:', refsTag);
          break;
        }

        case 'route':
        default: {
          appHistory.push(tag);
          break;
        }
      }

      // 按当前菜单项反选顶部菜单
      const targetPath = menuStore.menuPaths.filter((item) => {
        return item.path === tag;
      });
      if (targetPath[0] && menuStore.headerMenuCurrent !== targetPath[0].topPath) {
        menuStore.setHeaderMenuCurrent(targetPath[0].topPath);
      }

      // 点击tab标签时返回外部回调
      if (handleChange) {
        handleChange(tUrlObj);
      }
    }
  };

  // 标签选项的快捷操作事件处理
  handleMenuClick = (e) => {
    const eKey = e;
    const { menuStore, location } = this.props;
    const { currentPageName, searchMap } = this.state;
    let currentPathname = location.pathname;
    let newRefsTag;

    switch (eKey) {
      case '1': {
        // 功能：关闭所有标签
        newRefsTag = ['/'];
        currentPathname = '/'; // 首页
        break;
      }
      case '2': {
        // 功能：关闭其他标签
        this.setState({
          refsTag: [currentPageName],
        });

        return;
      }
      case '3': {
        // 功能：刷新当前标签
        this.setState({ isRefreshCurrentPage: true });
        return;
      }
      default: {
        // 功能：切换标签
        this.handleClickTag(eKey);
        return;
      }
    }

    if (currentPathname !== currentPageName) {
      this.props.history.push({
        pathname: currentPathname,
        search: searchMap[currentPathname],
      });
    }

    this.setState({
      refsTag: newRefsTag,
    });

    // 取消顶部菜单选中
    menuStore.setHeaderMenuCurrent();
    // 取消侧边菜单选中
    menuStore.setAsideMenuCurrent();
  };

  handleRefreshChange = (value = false) => {
    this.setState({ isRefreshCurrentPage: value });
  };

  scrollIntoTags(pathname = '') {
    let dom;
    // // eslint-disable-next-line react/no-find-dom-node
    // dom = ReactDOM.findDOMNode(this).querySelector(`[data-key="${pathname}"]`);
    if (this.ref && this.ref.current) {
      dom = this.ref.current.querySelector(`[data-key="${pathname}"]`);
      if (dom === null) {
        // 标签还未加入导航条(横向)
      } else {
        // 标签已经加入导航条(横向)
        dom.scrollIntoView({ block: 'end', behavior: 'smooth' });
      }
    }
  }

  render() {
    const { refsTag } = this.state;

    if (!refsTag.length) {
      return null;
    }

    const { currentPageName, searchMap, isRefreshCurrentPage } = this.state;
    const { routeType, menuStore, children } = this.props;

    /* eslint-disable */
    return (
      <div className={styles['router-tabs']} ref={this.ref}>
        <TabTagArea
          panes={refsTag}
          activeKey={currentPageName}
          handleClick={this.handleClickTag}
          handleClose={this.handleClose}
          handleMenuClick={this.handleMenuClick}
          getTitleByPathname={menuStore.getTitleByPathname}
        />
        <div className={styles['router-tabs-content']}>
          {/* 方式：多页tab */}
          {routeType === 'route' ? (
            children
          ) : routeType === 'iframe' ? (
            <>
              <TabContent
                panes={refsTag}
                activeKey={currentPageName}
                isRefreshCurrentPage={isRefreshCurrentPage}
                handleRefreshChange={this.handleRefreshChange}
                searchMap={searchMap}
                restProps={this.props}
              />
            </>
          ) : (
            <Main /> // 方式：路由驱动
          )}
        </div>
      </div>
    );
  }
}

function getSearchByResCode(url, token, resCode) {
  let prefix = '';

  if (url.indexOf('?') > -1) {
    prefix = '&';
  } else if (url.indexOf('?') == -1) {
    prefix = '?';
  }

  return `${prefix}token=${token}&resCode=${resCode}&ver=${+new Date()}`;
}

// Tab内容区
const TabContent = ({ panes = [], activeKey, isRefreshCurrentPage, handleRefreshChange, searchMap, restProps }) => {
  const { menuStore } = restProps;
  const tContent = panes.map((pathname) => {
    let { url: tUrl, key: resCode } = menuStore.pathValidate(pathname);

    // 不是合法的路径
    if (!tUrl) {
      console.log(pathname, '该路径不是有效路径。');
      return null;
    }

    // 如果url不是完整地址，则需要增加window.location.origin部分
    if (tUrl.indexOf('http') === -1) {
      tUrl = `${window.location.origin}${tUrl}`;
    }

    const tSearch = searchMap[pathname] ? `?${searchMap[pathname]}` : '';
    let url = tUrl || `${window.location.origin}${pathname}${tSearch}`;
    let tToken = '';

    try {
      tToken = obj2search({ token: UIStore.token, resCode, ver: +new Date() }, url);
    } catch (err) {
      console.log('iframe打开的url错误：', err);
    }

    url = `${url}${tToken}`;

    return (
      <div
        key={pathname}
        className={classNames(styles['router-tabs-item'], { [styles.active]: pathname === activeKey })}
      >
        <Iframe
          id={resCode}
          url={url}
          isRefresh={isRefreshCurrentPage && pathname === activeKey ? true : false}
          handleRefreshChange={handleRefreshChange}
        />
      </div>
    );
  });

  return <React.Fragment>{tContent}</React.Fragment>;
};

export default RouterTabs;
