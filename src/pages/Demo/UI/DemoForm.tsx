import React from 'react';

import BaseForm from '@/components/Base/BaseForm';

const test = (rule, value) => {
  console.log(rule, value);

  return new Promise<void>((resolve, reject) => {
    if (!value) {
      reject([new Error('输入不能为空')]);
    } else if (value === 'yh') {
      reject([new Error('名称已存在')]);
    } else {
      resolve();
    }
  });
};

// type表示所需要产生的表单项类型
const type = [
  {
    type: 'input',
    defaultValue: 'xxx',
    labelValue: 'input：',
    nameValue: 'name1',
    placeholder: '请输入1',
    validator: test,
    // 'required': true
  },
  {
    type: 'input',
    defaultValue: 'xxx',
    labelValue: '姓名：',
    nameValue: 'name1',
    placeholder: '请输入1',
    validator: test,
    // 'required': true
  },
  {
    type: 'input.textArea',
    defaultValue: 'xxdsax',
    labelValue: 'textArea：',
    nameValue: 'name2',
    placeholder: '请输入2',
  },
  {
    type: 'Checkbox.Group',
    defaultValue: ['1', '4'],
    checkboxOptions: ['1', '2', '3', '4', '5'],
    labelValue: '多选：',
    nameValue: 'name3',
  },
  {
    type: 'select',
    defaultValue: ['1', '4'],
    selectOptions: ['1', '2', '3', '4', '5'],
    labelValue: 'select：',
    nameValue: 'name4',
    mode: 'multiple',
  },
  {
    type: 'selectMult',
    defaultValue: ['3', '4'],
    selectOptions: ['1', '2', '3', '4', '5'],
    labelValue: 'xxxx',
    nameValue: 'name5',
  },
  {
    type: 'radio',
    defaultValue: '3',
    checkBoxGroupValue: ['1', '2', '3', '4', '5'],
    labelValue: '单选：',
    nameValue: 'name6',
  },
  {
    type: 'custom',
    nameValue: 'name6',
    actor: (
      <div>
        <a href="">新增</a>
      </div>
    ),
  },
];

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const getSubmit = (e) => {
  console.log(e);
};

// form自带属性填入
const formProps = {};
const DemoForm = (props) => {
  return (
    <div>
      <BaseForm formProps={formProps} formItemType={type} formItemLayout={formItemLayout} submitHandle={getSubmit} />
    </div>
  );
};

export default DemoForm;
