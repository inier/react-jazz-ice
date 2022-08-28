import React, { useEffect, useState } from 'react';

import { Boot, createEditor, createToolbar, SlateTransforms } from '@wangeditor/editor';

import { upload } from '@/services/common';

import BaseImageUpload from '../BaseImageUpload';
import '@wangeditor/editor/dist/css/style.css';

let editor: any = null;
let toolbar: any = null;
let visible = false;
interface IProps {
  /** 编辑器初始内容 */
  html?: string;
  /** 编辑器内容高度 单位px */
  height?: number | string;
  /** 获取editor */
  getEditor: (value: any) => void;
}
const SetVisible = () => {
  visible = !visible;
  console.log(visible);
};
class MyMenu {
  title: string;
  tag: string;
  constructor() {
    this.title = '多图上传';
    // this.iconSvg = '<svg >...</svg>'
    this.tag = 'button';
  }
  getValue(e) {
    // 多图上传，不需要 value
    return ' 123123';
  }
  isActive(e) {
    // 任何时候，都不用激活 menu
    return false; // or false
  }
  isDisabled(e) {
    return false; // or true
  }
  exec(e, value) {
    BaseImageUpload().then((res: any[]) => {
      const htmlList: any[] = res.map((url) => {
        return {
          alt: '',
          children: [{ text: '' }],
          href: '',
          src: url,
          style: {},
          type: 'image',
        };
      });
      SlateTransforms.insertNodes(editor, htmlList);
    });
  }
}

const myMenuConf = {
  key: 'myMenu',
  factory() {
    return new MyMenu();
  },
};
Boot.registerMenu(myMenuConf);
function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result!);
    };
    reader.onerror = (error) => reject(error);
  });
}
const BaseEditor = (props: IProps) => {
  const { html, height, getEditor } = props;
  const [content, SetContent] = useState<string>('');
  const [images, SetImage] = useState<any[]>([]);
  // const [visible, SetVisible] = useState<boolean>(false);
  const editorConfig: any = { MENU_CONF: [] };
  editorConfig.MENU_CONF['uploadImage'] = {
    async customUpload(file: File, insertFn) {
      // file 即选中的文件
      const f: any = await getBase64(file);
      const noPrefix = f.replace(/^data:image\/\w+;base64,/, '');
      // 自己实现上传，并得到图片 url alt href
      upload({ file: noPrefix, imageType: 'pic' }).then((res) => {
        insertFn(res.data);
      });
      // 最后插入图片
      // insertFn(url, alt, href);
    },
  };
  useEffect(() => {
    const toolbarConfig: any = {
      // excludeKeys: ['group-image'],
      insertKeys: {
        index: 0,
        keys: ['myMenu'], // show menu in toolbar
      },
    };
    // 创建编辑器
    editor = createEditor({
      selector: '#editor',
      config: editorConfig,
      mode: 'default',
    });
    toolbar = createToolbar({
      editor,
      selector: '#toolbar',
      config: toolbarConfig,
      mode: 'default', // 或 'simple' 参考下文
    });
    // toolbar.menuFind('group-image').clickHandler = () => {
    //   SetVisible(true);
    // };
    getEditor(editor);
    return () => {
      // 组件销毁时销毁编辑器  注：class写法需要在componentWillUnmount中调用
      if (editor == null) return;
      toolbar = null;

      editor.destroy();
    };
  }, [myMenuConf]);
  const SetImages = (res) => {
    res.map((item) => editor.txt.append(`<div><img src="${item}"/><div/>`));
  };
  return (
    <React.Fragment>
      <div style={{ border: '1px solid #ccc' }}>
        <div id="toolbar" style={{ borderBottom: '1px solid #ccc' }} />
        <div id="editor" style={{ position: 'relative', height: `${height || '600px'}` }} />
      </div>
    </React.Fragment>
  );
};

export default BaseEditor;
