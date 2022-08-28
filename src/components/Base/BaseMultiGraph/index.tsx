import React, { useEffect, useState } from 'react';

import { Upload, Button, Icon, Loading, Dialog, Message } from '@alifd/next';

import { upload } from '@/services/common';

import styles from './index.module.scss';

interface IProps {
  /** 显示隐藏 */
  visible: boolean;
  /** 控制显示方法 */
  SetVisible: (res: boolean) => void;
  /** 传入设置图片数组方法 */
  SetImages: (res: any[]) => void;
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

const BaseMultiGraph = (props: IProps) => {
  let num = 0;
  const urlList: any = [];
  const { visible, SetVisible, SetImages } = props;
  const [imageList, SetImage] = useState<any[]>([]);
  const [loading, SetLoading] = useState<boolean>(false);
  const [disable, SetDisable] = useState<boolean>(true);
  const onChange = async (option) => {
    console.log('option', option);

    const imgList: any[] = [];
    for (const item of option) {
      const img = await getBase64(item.originFileObj);
      imgList.push(img);
    }
    SetImage([...imageList, ...imgList]);
  };
  const handleClose = (index) => {
    const list = imageList;
    list.splice(index, 1);
    SetImage([...list]);
  };
  useEffect(() => {
    if (!imageList.length || loading) {
      SetDisable(true);
    } else {
      SetDisable(false);
    }
  }, [imageList, loading]);
  const uploadImg = () => {
    SetLoading(true);
    imageList.forEach((res, index) => {
      const noPrefix = res.replace(/^data:image\/\w+;base64,/, '');
      upload({ file: noPrefix, imageType: 'pic' })
        .then((success) => {
          const { data, result } = success;
          if (imageList.length === 1 && result === '0') {
            SetLoading(false);
            Message.success('上传完成');
            SetImages([data]);
            SetImage([]);
            SetVisible(false);
            return;
          }

          if (result === '0' && num === imageList.length - 1) {
            SetLoading(false);
            Message.success('上传完成');
            SetImages([...urlList, ...[data]]);
            SetVisible(false);
            SetImage([]);
            return;
          }
          if (result === '0') {
            urlList.push(data);
            num++;
          }
        })
        .catch((error) => {
          Message.error('上传失败');
          SetLoading(false);
        });
    });
  };
  return (
    <Dialog
      visible={visible}
      title="多图上传"
      okProps={{ children: '上传', disabled: disable }}
      onOk={uploadImg}
      onClose={() => {
        SetVisible(false);
      }}
    >
      <Loading visible={loading} tip="上传中">
        <div className={styles['box']}>
          <Upload
            accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
            autoUpload={false}
            multiple
            onSelect={onChange}
          >
            <Button>选择图片</Button>
          </Upload>
          <div className={styles['img-list']}>
            {imageList &&
              imageList.length > 0 &&
              imageList.map((res, index) => {
                return (
                  <div className={styles['img-box']}>
                    <Icon className={styles['img-close']} type="error" onClick={() => handleClose(index)} />
                    <img src={res} className={styles['img']} />
                  </div>
                );
              })}
          </div>
        </div>
      </Loading>
    </Dialog>
  );
};

export default BaseMultiGraph;
