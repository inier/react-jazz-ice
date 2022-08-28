/* eslint-disable react/no-array-index-key */
import React from 'react';

import { Form, Input, Select, Checkbox, Radio, Field, Box } from '@alifd/next';

import styles from './index.module.scss';

// const { Option } = Select;

interface IProps {
  formProps?: any;
  formItemType?: any;
  formItemLayout?: any;
  submitHandle: Function;
}

const BaseForm = (props: IProps) => {
  const { formProps, formItemType, formItemLayout, submitHandle } = props;
  const formField = Field.useField();

  /*
   * 方法定义
   */
  // const submitHandles = (e: any) => {
  //   submitHandle(e);
  // };
  // useEffect(() => {
  // console.log(selectMultOptions);
  // }, []);
  const FormItemListRender = (item: any, index: number | string) => {
    if (item.type === 'input') {
      const { labelValue, nameValue, defaultValue, placeholder, ...rest } = item;
      return (
        <Box key={index}>
          <Form.Item label={labelValue} name={nameValue} {...rest}>
            <Input placeholder={placeholder} defaultValue={defaultValue} />
          </Form.Item>
        </Box>
      );
    } else if (item.type === 'input.textArea') {
      const { labelValue, nameValue, defaultValue, placeholder, ...rest } = item;
      return (
        <Box key={index}>
          <Form.Item label={labelValue} name={nameValue} {...rest}>
            <Input.TextArea placeholder={placeholder} defaultValue={defaultValue} />
          </Form.Item>
        </Box>
      );
    } else if (item.type === 'select') {
      const { selectOptions, labelValue, nameValue, defaultValue, ...rest } = item;
      return (
        <Box key={index}>
          <Form.Item label={labelValue} name={nameValue} {...rest}>
            <Select defaultValue={defaultValue} {...item}>
              {selectOptions?.map((items, indexs) => (
                <Select.Option value={items} key={indexs}>
                  {items}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Box>
      );
    } else if (item.type === 'Checkbox.Group') {
      const { checkboxOptions, labelValue, nameValue, defaultValue, ...rest } = item;
      return (
        <Box key={index}>
          <Form.Item label={labelValue} name={nameValue} {...rest}>
            <Checkbox.Group defaultValue={defaultValue}>
              {checkboxOptions?.map((items, indexs) => (
                <Checkbox value={items} key={indexs}>
                  {items}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </Form.Item>
        </Box>
      );
    } else if (item.type === 'radio') {
      const { checkBoxGroupValue, labelValue, nameValue, defaultValue, ...rest } = item;
      return (
        <Box key={index}>
          <Form.Item name={nameValue} required label={labelValue} {...rest}>
            <Radio.Group defaultValue={defaultValue}>
              {checkBoxGroupValue?.map((items, indexs) => (
                <Radio value={items} key={indexs}>
                  {items}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        </Box>
      );
    } else if (item.type === 'custom') {
      const { labelValue, nameValue, ...rest } = item;
      return (
        <Form.Item label={labelValue} name={nameValue} {...rest} key={index}>
          {item.actor}
        </Form.Item>
      );
    }
  };
  return (
    <div className={styles.BaseForm}>
      <Form {...formProps} formItemLayout={formItemLayout}>
        {formItemType.map((item: any, index) => FormItemListRender(item, index))}
        <Form.Item wrapperCol={{ offset: 7 }}>
          <Form.Submit validate type="primary" onClick={(e) => submitHandle(e)} style={{ marginRight: 10 }}>
            提交
          </Form.Submit>
          <Form.Reset>重置</Form.Reset>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BaseForm;
