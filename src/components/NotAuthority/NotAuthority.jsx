import React, { Component } from 'react';
import { Shell } from '@alifd/next';
import './NotAuthority.scss';

const styles = {
  exceptionContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#333',
  },
  description: {
    color: '#666',
  },
  image: {
    width: '260px',
    height: '260px',
  },
};

export default class NotAuthority extends Component {
  static displayName = 'NotAuthority';

  render() {
    document.title = '暂无权限';
    return (
      <div className="basic-not-found">
        <Shell>
          <div style={styles.exceptionContent} className="exception-content">
            <img
              src={require('./images/NotAuthority.svg')}
              style={styles.image}
              className="imgException"
              alt="页面不存在"
            />
            <div className="prompt">
              <h3 style={styles.title} className="title">
                抱歉，您没有权限
              </h3>
              <p style={styles.description} className="description">
                如有需求，请联络管理员分配权限
              </p>
            </div>
          </div>
        </Shell>
      </div>
    );
  }
}
