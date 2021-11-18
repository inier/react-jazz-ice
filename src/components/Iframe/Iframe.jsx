import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Navigator from '@/utils/Nevigator';
import Layout from '@icedesign/layout';
import { urlParse } from '@utils';
import styles from './Iframe.module.scss';

/**
 * @description 向指定元素的自己或者父元素查找指定的选择器
 * @param {*} _elem 元素
 * @param {*} selector 选择器
 * @returns 找到的元素
 */
const getClosest = (_elem, selector) => {
  let elem = _elem;
  // Get the closest matching element
  if (elem.matches(selector)) {
    return elem;
  }
  for (; elem && elem.id !== 'root'; elem = elem.parentNode) {
    if (elem.matches(selector)) return elem;
  }
  return null;
};

/**
 * @description IFrame容器，通过路由跳转过来需要携带title和url两个参数
 * @extends {Component}
 */
@withRouter
class Iframe extends Component {
  constructor(props) {
    super(props);
    const { match } = props;
    this.state = {
      title: match.params.title || '加载中',
      url: '',
    };
    this.iframeRef = React.createRef();
  }

  componentDidMount() {
    this.iframeRef.current.onload = this.onLoaded.bind(this);
  }

  /**
   * @description 页面加载完成
   */
  onLoaded = () => {
    const iDocument = this.iframeRef.current.contentDocument;
    let title = '';
    if (iDocument) {
      // 将事件监听绑定在document上,避免iframe内页有异步加载的元素，导致事件绑定不成功
      iDocument.addEventListener('click', this.onClick);
      title = iDocument.title;
    }
    if (!this.props.match.params.title) {
      this.setState({ title });
    }
  };

  /**
   * @description 处理iframe内页面可点击的事件
   * @param {object} event 事件
   */
  onClick = (event) => {
    try {
      const e = getClosest(event.target, '.clickable');
      if (e) {
        const type = e.getAttribute('data-type');
        const url = e.getAttribute('data-url');
        const title = e.getAttribute('data-title');
        if (type) {
          Navigator.navigate(type, {
            title,
            routeUrl: url,
            history: this.props.history,
          });
        }
      }
    } catch (error) {
      console.warn(error);
    }
  };

  render() {
    const { title, url } = this.state;
    const { match } = this.props;

    const tUrl = url || decodeURIComponent(match.params.url);

    if (!tUrl) {
      return null;
    }

    return (
      <Layout.Main scrollable className={styles.iframeWrap}>
        <iframe
          id={`iframe-${urlParse(tUrl).path || +new Date()}`}
          src={tUrl}
          title={title}
          scrolling="auto"
          ref={this.iframeRef}
          style={{
            height: '100%',
            width: '100%',
            border: 'none',
          }}
        />
      </Layout.Main>
    );
  }
}

export default Iframe;
