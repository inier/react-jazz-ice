import React, { useState } from 'react';

import { Button } from '@alifd/next';

import BaseMultiGraph from '@/components/Base/BaseMultiGraph';

const DemoMultiGraph = () => {
  const [visible, SetVisible] = useState<boolean>(false);
  const [images, SetImages] = useState<any[]>([]);

  return (
    <>
      <Button
        onClick={() => {
          SetVisible(true);
        }}
      >
        多图上传
      </Button>
      {console.log(images)}
      {images &&
        images.length > 0 &&
        images.map((res) => {
          return <img src={res} alt="" />;
        })}
      <BaseMultiGraph visible={visible} SetVisible={SetVisible} SetImages={SetImages} />
    </>
  );
};

export default DemoMultiGraph;
