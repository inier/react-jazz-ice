/* eslint-disable @iceworks/best-practices/recommend-functional-component */
import classNames from 'classnames';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { appHistory } from '@ice/stark';
import { Tag, Dropdown, Icon, Balloon, Menu } from '@alifd/next';
import Main from './components/Main';
import Iframe from './components/Iframe';
import { obj2search } from '@/utils';
import styles from './index.module.scss';

const { Tooltip } = Balloon;
const { SubMenu } = Menu;

@inject('UIStore')
@withRouter
@observer
class RouterTabs extends Component {
  static defaultProps = {
    value: '',
    routeType: 'iframe',
    initTitle: '404',
  };

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
      const { UIStore } = this.props;
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
      const tStateObj = {};

      // 当前路由不在路由表中
      if (newRefsTag.indexOf(currentPathname) === -1) {
        if (UIStore.pathValidate(currentPathname)) {
          newRefsTag.push(currentPathname);
        } else {
          // 默认标签页处理
          const tDefaultPath = UIStore.getDefaultMenuItemPath(_location);
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

  static unListen = null;

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

  handleClickTag = (tag, e) => {
    // 排除Tag上的小图标点击
    if (e && e.target.tagName.toLowerCase() === 'i') {
      return;
    }

    const { currentPageName, refsTag, searchMap } = this.state;
    const { routeType, handleChange, history, UIStore } = this.props;

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
      const targetPath = UIStore.menuPaths.filter((item) => {
        return item.path === tag;
      });
      if (targetPath[0] && UIStore.headerMenuCurrent !== targetPath[0].topPath) {
        UIStore.setHeaderMenuCurrent(targetPath[0].topPath);
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
    const { UIStore, location } = this.props;
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
    UIStore.setHeaderMenuCurrent();
    // 取消侧边菜单选中
    UIStore.setAsideMenuCurrent();
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
    const { className, style, routeType, UIStore } = this.props;

    const cls = classNames(styles['router-tabs-tags'], className);
    const { url } = UIStore.pathValidate(currentPageName);
    // 订单全流程系统需要单独加载扩展view,当前采用iframe引入
    const hasExtra = url.indexOf('cfb-order-pc') >= 0;
    let extraViewUrl = '';
    if (hasExtra) {
      extraViewUrl = `${url.split('cfb-order-pc')[0]}cfb-order-pc/sc/iframeOut${obj2search({
        token: UIStore.token,
      })}`;
    }

    /* eslint-disable */
    return (
      <div className={styles['router-tabs']} ref={this.ref}>
        <div className={cls} style={{ ...style }}>
          <TabTagArea
            panes={refsTag}
            activeKey={currentPageName}
            handleClick={this.handleClickTag}
            handleClose={this.handleClose}
            handleMenuClick={this.handleMenuClick}
            restProps={this.props}
          />
        </div>
        <div className={styles['router-tabs-content']}>
          {/* 方式：多页tab */}
          {routeType === 'iframe' ? (
            <>
              <TabContent
                panes={refsTag}
                activeKey={currentPageName}
                isRefreshCurrentPage={isRefreshCurrentPage}
                handleRefreshChange={this.handleRefreshChange}
                searchMap={searchMap}
                restProps={this.props}
              />
              {hasExtra && <ExtraView url={extraViewUrl} />}
            </>
          ) : (
            <Main /> // 方式：路由驱动
          )}
        </div>
      </div>
    );
  }
}

// 扩展显示View，用于订单全流程系统的额外挂载
const ExtraView = ({ url }) => {
  if (!url) {
    return null;
  }

  return (
    <div className={styles.extraIframe}>
      <iframe width={'100%'} height={'100%'} frameBorder="0" src={url} scrolling="no" />
    </div>
  );
};

// Tab标签区
const TabTagArea = ({ panes, activeKey, handleClick, handleClose, handleMenuClick, restProps }) => {
  const { initTitle, UIStore } = restProps;
  const tags = panes.map((pathname, index) => {
    // 通过pathname获取到指定的页面名称
    const routeInfo = UIStore.getTitleByPathname(pathname);
    const title = routeInfo ? routeInfo.name : initTitle;
    const isLongTag = title.length > 8; //title超过8个字符的标记

    const tagElem = (
      <Tag
        key={pathname}
        data-key={pathname}
        className={classNames(styles.tag, { [styles.active]: pathname === activeKey })}
        onClick={(e) => handleClick(pathname, e)}
        closable={index !== 0}
        afterClose={() => handleClose(pathname)}
      >
        {/* 小蓝点，高亮显示 */}
        <span className={styles.icon} />
        {/* title 超过8个字符的处理 */}
        {isLongTag ? `${title.slice(0, 8)}...` : title}
      </Tag>
    );

    /* title 超过8个字符的处理 */
    return isLongTag ? (
      <Tooltip key={`tooltip_${pathname}`} trigger={tagElem} align="b">
        {title}
      </Tooltip>
    ) : (
      tagElem
    );
  });

  return (
    <React.Fragment>
      {/* tabs的tags容器 */}
      <div className={`${styles['router-tabs-tags-box']}`}>
        <div className={`${styles['router-tabs-tags-cont']}`}>{tags}</div>
      </div>
      {/* 快捷功能 */}
      <TabOptionArea tags={tags} handleClick={handleMenuClick} />
    </React.Fragment>
  );
};

// Tab标签操作区
const TabOptionArea = ({ tags, handleClick }) => {
  return (
    <div className={`${styles['router-tabs-options']}`}>
      <Dropdown
        trigger={
          <Tag size={'small'} color="#2d8cf0" style={{ margin: '0 12px' }}>
            标签选项 <Icon size="xxs" type="arrow-down" />
          </Tag>
        }
        triggerType="click"
      >
        <Menu onItemClick={handleClick}>
          <Menu.Item key="1">关闭所有标签</Menu.Item>
          <Menu.Item key="2">关闭其他标签</Menu.Item>
          <Menu.Item key="3">刷新当前标签</Menu.Item>
          <SubMenu key="tag-sub-menu" label="切换到标签" mode="popup">
            {tags.map((item) => (
              <Menu.Item key={item.key}>{item.props.children}</Menu.Item>
            ))}
          </SubMenu>
        </Menu>
      </Dropdown>
    </div>
  );
};
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
  const { UIStore } = restProps;
  const tContent = panes.map((pathname) => {
    let { url: tUrl, key: resCode } = UIStore.pathValidate(pathname);

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
