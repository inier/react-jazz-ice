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
import { TabTagArea, ContextMenu, Tag } from './components/TabTagArea';
import styles from './index.module.scss';

interface IProps extends RouteComponentProps {
  menuStore: MenuStore;
  UIStore: UIStore;
  value?: string;
  routeType?: string;
  initTitle?: string;
  handleChange?: (params?) => void;
  // [propName: string]: any;
}
interface IStates {
  currentPageName: string; // 当前路由对应的pathname
  refsTag: string[]; // 所有tab标签列表
  searchMap: object; // 每个tab标签对应的search参数
  isRefreshCurrentPage: boolean; // 当前iframe是否刷新
}

@inject('UIStore', 'menuStore')
@withRouter
@observer
class RouterTabs extends Component<IProps, IStates> {
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
      currentPageName: value,
      refsTag: value ? [value] : [],
      searchMap: {},
      isRefreshCurrentPage: false,
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
    const { currentPageName, searchMap, refsTag } = this.state;
    let currentPathname = location.pathname;
    let newRefsTag;

    switch (eKey) {
      case '1': {
        // 功能：关闭所有标签
        newRefsTag = [];
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
      case '4': {
        // 功能：关闭左侧标签
        const index = refsTag.findIndex((tag) => {
          return tag === currentPageName;
        });
        newRefsTag = refsTag.slice(index);

        break;
      }
      case '5': {
        // 功能：关闭右侧标签
        const index = refsTag.findIndex((tag) => {
          return tag === currentPageName;
        });
        newRefsTag = refsTag.slice(0, index + 1);

        break;
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

    if (!newRefsTag.length) {
      // 取消顶部菜单选中
      menuStore.setHeaderMenuCurrent();
      // 取消侧边菜单选中
      menuStore.setAsideMenuCurrent();
    }
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
    console.log('refsTag:', refsTag);
    const { currentPageName, searchMap, isRefreshCurrentPage } = this.state;
    const { routeType, menuStore, children } = this.props;
    const tagTextMinLen = document.documentElement.clientWidth / refsTag.length / 14;

    /* eslint-disable */
    return (
      <div className={styles['router-tabs']} ref={this.ref}>
        <TabTagArea
          panes={refsTag}
          handleMenuClick={this.handleMenuClick}
          itemRender={({ value, index, isEllipsis }) => {
            // 通过pathname获取到指定的页面名称
            const routeInfo: any = menuStore.getTitleByPathname(value);
            const title = routeInfo?.name;

            return (
              <ContextMenu
                index={index}
                length={refsTag.length}
                isActive={value === currentPageName}
                handleTabItemMenuClick={this.handleMenuClick}
              >
                <Tag
                  key={value}
                  title={title}
                  value={value}
                  isEllipsis={isEllipsis}
                  isClose={index !== 0 && value === currentPageName}
                  isActive={value === currentPageName}
                  tagTextMinLen={tagTextMinLen}
                  onClick={this.handleClickTag}
                  onClose={this.handleClose}
                />
              </ContextMenu>
            );
          }}
        />
        <div className={`${styles['router-tabs-content']} scrollbar`}>
          {/* 路由方式：多页tab */}
          {routeType === 'route' ? ( // 本地路由方式
            children
          ) : routeType === 'iframe' ? ( // iframe方式
            <>
              <TabContentIframe
                panes={refsTag}
                activeKey={currentPageName}
                isRefreshCurrentPage={isRefreshCurrentPage}
                handleRefreshChange={this.handleRefreshChange}
                searchMap={searchMap}
                restProps={this.props}
              />
            </>
          ) : (
            <Main appRoutes={menuStore.appRoutes} /> // 微前端方式
          )}
        </div>
      </div>
    );
  }
}

interface ITabContentIframeProps {
  panes: string[];
  activeKey: string;
  isRefreshCurrentPage?: boolean;
  handleRefreshChange?: (boolean) => void;
  searchMap: object;
  restProps: any;
}

// Tab内容区
const TabContentIframe = ({
  panes = [],
  activeKey,
  isRefreshCurrentPage,
  handleRefreshChange,
  searchMap,
  restProps,
}: ITabContentIframeProps) => {
  const { menuStore, UIStore } = restProps;
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
      tToken = obj2search({ token: UIStore.token, resCode, ver: +new Date() });
    } catch (err) {
      console.log('iframe打开的url错误: ', err);
    }

    url = `${url}${tToken}`;
    const isActive = pathname === activeKey;

    return (
      <div key={pathname} className={classNames(styles['router-tabs-item'], { [styles.active]: isActive })}>
        <Iframe
          id={resCode}
          url={url}
          // isRefresh={isRefreshCurrentPage && isActive ? true : false}
          // handleRefreshChange={handleRefreshChange}
        />
      </div>
    );
  });

  return <React.Fragment>{tContent}</React.Fragment>;
};

export default RouterTabs;
