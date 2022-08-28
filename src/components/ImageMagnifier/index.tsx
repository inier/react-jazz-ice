import React, { useEffect, useState, useMemo, CSSProperties } from 'react';

import image from '@/assets/img/none.jpg';

interface IProps {
  // 图片url
  imgUrl: string;
  // 放大镜位置 默认位于右边, left左边
  position?: string;
  // 图片放大倍数
  scale?: number;
  // 组件宽度
  width?: number;
  // 组件高度
  height?: number;
  mouseRadiusW?: number;
  mouseRadiusH?: number;
  style?: CSSProperties;
}

const defaultParams = {
  // 放大倍数
  scale: 2,
  // 组件宽
  width: 60,
  // 组件高
  height: 60,
};

// 根据父级宽度生成 配置项 参数
function fetMainParams({ width, height, scale }) {
  // 鼠标悬停小方块 width的半径
  const mouseRadiusW = width / scale / 2;
  // 鼠标悬停小方块 height的半径
  const mouseRadiusH = height / scale / 2;

  const ClassObj: any = {
    // 图片容器
    imgContainer: {
      width: `${width}px`,
      height: `${height}px`,
      border: '1px solid #ccc',
      cursor: 'move',
      position: 'relative',
    },
    // 遮罩
    maskBlock: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      // background: "rgba(0,0,0,0)",
      zIndex: 100,
    },

    // 鼠标悬停小方块样式
    mouseBlock: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: `${mouseRadiusW * 2}px`,
      height: `${mouseRadiusH * 2}px`,
      background: 'rgba(0,0,0,0.1)',
      zIndex: 99,
    },

    // 放大镜容器样式
    magnifierContainer: {
      position: 'fixed',
      left: '35%',
      top: '50%',
      width: `${width + 200}px`,
      height: `${height + 200}px`,
      border: '1px solid #ccc',
      overflow: 'hidden',
      transform: 'translateX(-60%) translateY(-50%)',
      zIndex: 98,
    },

    // 图片放大样式
    // 此处图片宽高不能设置为百分比，在scale的作用下，放大的只是图片初始的宽高 ！！！
    imgStyle: {
      width: `${width + 100}px`,
      height: `${height + 100}px`,
      position: 'absolute',
      top: 0,
      left: `${width}px`,
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
    },
  };

  return { PARAMS: defaultParams, mouseRadiusW, mouseRadiusH, ClassObj };
}

const ImageMagnifier = (props: IProps) => {
  // 图片信息
  const [imgUrl, setImgUrl] = useState<string>(image);
  // 配置项参数
  const [{ PARAMS, mouseRadiusW, mouseRadiusH, ClassObj }, setMainParams] = useState({
    PARAMS: defaultParams,
    mouseRadiusW: 0,
    mouseRadiusH: 0,
    ClassObj: {},
  });
  // 移入移出开关
  const [magnifierOff, setMagnifierOff] = useState<boolean>(false);
  // 放大镜样式
  const [{ mouseBlock, imgStyle }, setMouseImg] = useState<any>({ mouseBlock: {}, imgStyle: {} });

  // 计算相关参数
  const calculationBlock = (offsetX, offsetY) => {
    const cssStyle: any = { mouseBlock: { ...mouseBlock }, imgStyle: { ...imgStyle } };
    let offsetW = offsetX;
    let offsetH = offsetY;

    /* 小方块位置 */
    // 防止鼠标移动过快导致计算失误，只要小于或者大于对应值，直接设置偏移量等于最小值或者最大值
    // 判断与左右的边距
    if (offsetX < mouseRadiusW) {
      offsetW = mouseRadiusW;
    } else if (offsetX > PARAMS.width - mouseRadiusW) {
      offsetW = PARAMS.width - mouseRadiusW;
    }

    // 判断 鼠标小方块 与上下的边距
    if (offsetY < mouseRadiusH) {
      offsetH = mouseRadiusH;
    } else if (offsetY > PARAMS.height - mouseRadiusH) {
      offsetH = PARAMS.height - mouseRadiusH;
    }

    const left = offsetW - mouseRadiusW;
    const top = offsetH - mouseRadiusH;

    // 设置鼠标悬停小方块
    cssStyle.mouseBlock.left = left;
    cssStyle.mouseBlock.top = top;

    /* 计算图片放大位置 */
    cssStyle.imgStyle.left = -left * PARAMS.scale;
    cssStyle.imgStyle.top = -top * PARAMS.scale;

    setMouseImg(cssStyle);
  };

  // 鼠标移入
  const mouseEnter = () => {
    setMagnifierOff(true);
  };

  // 鼠标移除
  const mouseLeave = () => {
    setMagnifierOff(false);
  };

  // 鼠标移动
  const mouseMove = (event) => {
    const e = event.nativeEvent;
    calculationBlock(e.offsetX, e.offsetY);
  };

  // 放大镜容器样式
  const magnifierMemo = useMemo(() => {
    if (props.position === 'left') {
      return {
        ...ClassObj.magnifierContainer,
        left: `-${PARAMS.width}px`,
      };
    }
    return ClassObj.magnifierContainer;
  }, [props.position, ClassObj]);

  // 根据父级容器生成宽度
  useEffect(() => {
    const results = fetMainParams({ ...defaultParams, ...props });
    setMainParams(results);
    setMouseImg({ mouseBlock: results.ClassObj.mouseBlock, imgStyle: results.ClassObj.imgStyle });
  }, []);

  useEffect(() => {
    setImgUrl(props.imgUrl);
  }, [props.imgUrl]);

  return (
    <div style={{ marginLeft: -10 }}>
      <div style={ClassObj.imgContainer}>
        <img src={imgUrl} width="100%" height="100%" alt="图片加载失败" />
        <div style={ClassObj.maskBlock} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} onMouseMove={mouseMove} />
        {magnifierOff && <div style={mouseBlock} />}
      </div>
      {magnifierOff && (
        <div style={magnifierMemo}>
          <img style={imgStyle} src={imgUrl} alt="图片加载失败" />
        </div>
      )}
    </div>
  );
};

export default ImageMagnifier;
