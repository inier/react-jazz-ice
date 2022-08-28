import React from 'react';

import { nanoid } from 'nanoid';

import BaseUpload from '@/components/Base/BaseUpload';

const data = [
  {
    uid: nanoid(10),
    url: 'https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg',
  },
];

const Upload = (props) => {
  return (
    <div>
      <BaseUpload
        imageUrl={data}
        onChange={(res) => {
          console.log('BaseUpload: ', res);
        }}
      />
      <BaseUpload
        onChange={(res) => {
          console.log('BaseUpload: ', res);
        }}
      />
    </div>
  );
};

export default Upload;
