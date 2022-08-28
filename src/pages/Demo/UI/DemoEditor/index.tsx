import React, { useState, useEffect } from 'react';

import { Button } from '@alifd/next';

import BaseEditor from '@/components/Base/BaseEditor';

const DemoEditor = () => {
  const [editor, getEditor] = useState<any>({});

  useEffect(() => {
    console.log('editor', editor);
  }, []);

  return (
    <>
      <BaseEditor getEditor={getEditor} height={'600px'} />
      <Button
        onClick={() => {
          console.log('editor', editor);
        }}
      >
        获取
      </Button>
    </>
  );
};

export default DemoEditor;
