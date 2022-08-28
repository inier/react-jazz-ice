import React from 'react';

import { Upload, Button, Dialog, Message } from '@alifd/next';

import { upload } from '@/services/common';
import stores from '@/stores';

import styles from './index.module.scss';

interface IProps {
  /** 显示隐藏 */
  visible: boolean;
  /** 控制显示方法 */
  SetVisible: (res: boolean) => void;
  /** 传入设置图片数组方法 */
  SetImages: (res: any[]) => void;
}

interface htmlConfirm {
  disabled: any | null;
}

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

const BaseMultiGraph = () => {
  const promise = new Promise((resolve, reject) => {
    let num = 0;
    const urlList: any = [];
    let imageList: any[] = [];
    const loading = false;
    let disable = true;
    const imgList: any[] = [];
    const onChange = async (option) => {
      const img: any[] = [];
      for (const item of option) {
        const i = await getBase64(item.originFileObj);
        img.push(i);
      }
      imageList = [...imageList, ...img];
      imgShow(imageList);
    };
    const handleClose = (event) => {
      const index = event.target.getAttribute('data_index');
      imageList.splice(index, 1);
      imgShow(imageList);
    };
    const uploadImg = () => {
      loadingChange(true);
      imageList.forEach((res, index) => {
        const noPrefix = res.replace(/^data:image\/\w+;base64,/, '');
        upload({ file: noPrefix, imageType: 'pic' })
          .then((success) => {
            const { data, result } = success;
            if (imageList.length === 1 && result === '0') {
              loadingChange(false);
              Message.success('上传完成');
              urlList.push(data);
              dialog.hide();
              resolve(urlList);
              return;
            } else if (imageList.length === 1) {
              loadingChange(false);
              Message.success('上传完成');
              urlList.push(data);
              resolve(urlList);
              return;
            }

            if (result === '0' && num === imageList.length - 1) {
              loadingChange(false);
              Message.success('上传完成');
              urlList.push(data);
              dialog.hide();
              resolve(urlList);
              return;
            } else if (num === imageList.length - 1) {
              loadingChange(false);
              dialog.hide();
              urlList.push(data);
              resolve(urlList);
              return;
            }
            if (result === '0') {
              urlList.push(data);
              num++;
            } else {
              num++;
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    };
    const imgShow = (e: any[]) => {
      if (e && e.length) {
        disable = false;
      } else {
        disable = true;
      }
      confirmChangeBtn();
      const list: any[] = e.map((res, index) => {
        return `<div key='${index}' style='position: relative;margin-right: 20px'>
            <img src=${require('./assets/close.png')} 
            style='position: absolute;right: -10px;top: -10px;line-height: 1;cursor: pointer;height:20px;width:20px'
            data_index='${index}' id='id_${index}'/>
            <img src=${res} style='height: 100px;width: 100px;'/>
          </div>`;
      });
      document.getElementById('imgList')!.innerHTML = list.join('');
      // eslint-disable-next-line array-callback-return
      list.map((res, index) => {
        document.getElementById(`id_${index}`)!.addEventListener('click', handleClose);
      });
    };
    const loadingChange = (bool) => {
      stores.UIStore.setLoading(bool);
    };
    const confirmChangeBtn = () => {
      const confirm = document.getElementById('confirm') as HTMLSelectElement;
      confirm!.disabled = disable;
      confirm.onclick = uploadImg;
    };
    const dialog = Dialog.show({
      v2: true,
      title: '多图上传',
      width: '1000px',
      footer: [
        <span style={{ marginRight: 20 }}>
          <Button
            id="confirm"
            disabled={disable}
            onClick={() => {
              uploadImg();
            }}
          >
            上传
          </Button>
        </span>,
        <Button
          onClick={() => {
            dialog.hide();
          }}
        >
          取消
        </Button>,
      ],
      content: (
        <div className={styles['box']}>
          <Upload
            accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
            autoUpload={false}
            multiple
            onSelect={onChange}
          >
            <Button style={{ width: 'none', height: 'none' }}>选择图片</Button>
          </Upload>
          <div className={styles['img-list']} id="imgList" />
        </div>
      ),
    });
  });

  return promise;
};

export default BaseMultiGraph;
