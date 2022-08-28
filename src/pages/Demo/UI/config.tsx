import React from 'react';

import DemoButton from './DemoButton';
import DemoEditor from './DemoEditor';
import DemoForm from './DemoForm';
import DemoMultiGraph from './DemoMultiGraph';
import DemoTransfer from './DemoTransfer';
import DemoUpload from './DemoUpload';

export const UIList = [
  { tab: 'Editor', content: <DemoEditor /> },
  { tab: 'MultiGraph', content: <DemoMultiGraph /> },
  { tab: 'Transfer', content: <DemoTransfer /> },
  { tab: 'Button', content: <DemoButton /> },
  { tab: 'Upload', content: <DemoUpload /> },
  { tab: 'Form', content: <DemoForm /> },
];
