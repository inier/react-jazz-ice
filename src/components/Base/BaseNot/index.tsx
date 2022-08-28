import React from 'react';

interface IProps {
  textStyle?: {};
  imgStyle?: {};
}
const BaseNot = (props: IProps) => {
  const { textStyle, imgStyle } = props;
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ marginTop: 50, marginBottom: 30 }}>
        <img
          style={{ marginBottom: 20, height: 100, width: 100, ...imgStyle }}
          src={require('@/assets/img/not_yet.svg')}
        />
        <div style={{ color: '#999', textAlign: 'center', ...textStyle }}>暂无数据</div>
      </div>
    </div>
  );
};

export default BaseNot;
