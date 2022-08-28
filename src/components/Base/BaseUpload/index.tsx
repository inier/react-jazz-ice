import React, { useState, useEffect } from 'react';

import { Loading, Message, Upload } from '@alifd/next';
import { CardProps } from '@alifd/next/types/upload';

import { upload } from '@/services/common';

import styles from './index.module.scss';

interface IProps extends CardProps {
  services?: any;
  data?: {
    [propName: string]: any;
  };
  imageUrl?: any[];
  [propName: string]: any;
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

const BaseUpload = (props: IProps) => {
  const {
    listType = 'card',
    accept = 'image/png, image/jpg, image/jpeg, image/gif, image/bmp',
    onChange,
    limit,
    data = { imageType: 'pic' },
    services = upload,
    imageUrl = [],
    ...rest
  } = props;
  const [value, setValue] = useState<any[]>(imageUrl);
  const [loading, setLoading] = useState(false);
  const [reset, setReset] = useState(+new Date());

  useEffect(() => {
    imageUrl.length && setValue(imageUrl);
  }, [imageUrl]);

  const handleChange = (res: any[]) => {
    console.log('onChange callback : ', res);
    setValue(res);
    onChange && onChange(res);
  };

  const handleSuccess = (res: any, file) => {
    console.log('onSuccess callback : ', res, file);
  };

  const handleRemove = () => {
    console.log('onRemove callback : ');
    setValue([{ url: '', uid: +new Date() }]);
    setReset(+new Date());
  };

  const handleError = (file: any) => {
    console.log('onError callback : ', file);
    if (file.state === 'error') {
      Message.error(file.response || '上传失败');
    }
  };

  const customRequest = async (option) => {
    console.log(option);

    const fileData: any = await getBase64(option.file);
    const noPrefix = fileData.replace(/^data:image\/\w+;base64,/, '');
    const tData: any = { file: noPrefix, ...data };

    setLoading(true);
    services &&
      services(tData)
        .then((res) => {
          if (res.result !== '0') {
            setLoading(false);
            return;
          }
          handleChange([
            {
              uid: +new Date(),
              url: res.data,
            },
          ]);
        })
        .catch((err) => {
          console.log('err', err);
        })
        .finally(() => {
          // setLoading(false);
        });
    return {
      abort() {
        // TODO:阻止上传
        console.log('取消上传');
      },
    };
  };

  const key = value[value.length - 1]?.url || reset;

  return (
    <div className={styles.BaseUpload} key={key}>
      <Upload.Card
        listType={listType}
        request={customRequest}
        accept={accept}
        limit={1}
        onChange={handleChange}
        onSuccess={handleSuccess}
        onRemove={handleRemove}
        onError={handleError}
        reUpload
        dragable
        showDownload={false}
        value={value}
        {...rest}
      />
      <Loading visible={loading} size="medium" className={`${styles.loading} ${loading ? styles.active : ''}`} />
    </div>
  );
};

export default BaseUpload;
