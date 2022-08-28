import { useEffect, useRef, useState } from 'react';

import { Box, Button, Drawer, Field, Form, Icon, Input, Search, Select } from '@alifd/next';
import moment from 'moment';

import { BaseFormFilter, SelectOptionsProps } from '../Basetype';

import { CustomRangerPicker } from './customRangerPicker';
import styles from './index.module.scss';

const FormItem = Form.Item;
const { Option } = Select;

interface BaseFilterProps {
  onSearch: (value: string) => void;
  formList: BaseFormFilter[];
  submitHandle?: (value?: string, type?: string) => void;
  searchPlaceholder?: string;
  searchVisible?: boolean;
  searchValue?: string;
}

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const BaseFilter: React.FunctionComponent<BaseFilterProps> = ({
  onSearch,
  formList,
  submitHandle,
  searchPlaceholder,
  searchVisible,
  searchValue,
}) => {
  const [visible, setVisible] = useState<boolean | undefined>(false);
  const formField = Field.useField();
  const onOpenClose = (type: boolean) => setVisible(type);
  const FormItemListRender = (item: any, index: number | string) => {
    if (item.type === 'customRanger') {
      return (
        <FormItem {...item} label={customLabel(item.label, item.name)} key={index}>
          <CustomRangerPicker {...item} />
        </FormItem>
      );
    } else if (item.type === 'custom') {
      return (
        <FormItem {...item} key={index}>
          {item.actor}
        </FormItem>
      );
    } else if (item.type === 'select') {
      const placeholder =
        item.others && item.others.placeholder ? item.others.placeholder || '请选择' : `请选择${item.label}`;
      return (
        <FormItem {...item} key={index}>
          <Select {...item.others} placeholder={placeholder} style={{ width: '100%' }}>
            {item.options &&
              item.options.length > 0 &&
              item.options.map((v: SelectOptionsProps, i: number | string) => (
                <Option value={v?.id || v?.value} key={i || 0}>
                  {v.name}
                </Option>
              ))}
          </Select>
        </FormItem>
      );
    } else if (item.type === 'input') {
      return (
        <FormItem {...item} key={index}>
          <Input placeholder="请输入" {...item.others} />
        </FormItem>
      );
    }
    return null;
  };
  const customLabel = (label, name) => {
    // 上月
    const thisMonth = [
      moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'),
      moment().endOf('month').format('YYYY-MM-DD HH:mm:ss'),
    ];
    // 上月
    const lastMonth = [
      moment(new Date()).subtract(1, 'months').startOf('month').format('YYYY-MM-DD HH:mm:ss'),
      moment(new Date()).subtract(1, 'months').endOf('month').format('YYYY-MM-DD HH:mm:ss'),
    ];
    return (
      <Box direction="row" spacing={[0, 0, 0, 20]}>
        {label}
        <Button type="primary" text onClick={() => formField.setValues({ [name]: thisMonth })}>
          本月
        </Button>
        <Button type="primary" text onClick={() => formField.setValues({ [name]: lastMonth })}>
          上月
        </Button>
      </Box>
    );
  };
  /**
   * @param type 类型
   * @param value 查询参数
   */
  const submitHandleCLose = (value, type) => {
    submitHandle && submitHandle(value, type || 'submit');
    onOpenClose(false);
  };
  /** 清空输入框的值 */
  const [key, setKey] = useState(0);
  const searchRef: any = useRef();
  const clear = () => {
    setKey(key + 1);
  };
  useEffect(() => {
    const value: any = document!.getElementById('seach');
    if (!searchValue) {
      value.value = '';
      clear();
    }
  }, [searchValue]);
  return (
    <Box justify="flex-end" direction="row" align="center" spacing={20} padding={[15, 0]} className={styles.Main}>
      {!searchVisible && (
        <Search
          id="seach"
          ref={searchRef}
          key={key}
          shape="simple"
          placeholder={searchPlaceholder || '订单编号/下单人昵称/手机号'}
          trim
          onSearch={onSearch}
        />
      )}
      {formList && formList.length > 0 && (
        <>
          <Button size="large" text onClick={() => onOpenClose(true)}>
            <Icon type="filter" style={{ color: '#999' }} />
          </Button>
          <Drawer
            closeMode={['esc', 'mask']}
            bodyStyle={{ height: '100%' }}
            width={400}
            visible={visible}
            cache
            placement="right"
            onClose={() => onOpenClose(false)}
          >
            <Box direction="column" style={{ height: '100%' }}>
              <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 15 }}>高级筛选</div>
              <Form {...formItemLayout} field={formField} style={{ height: '100%' }}>
                <Box direction="column" justify="space-between" style={{ height: '100%' }}>
                  <Box>{formList.map((item, index) => FormItemListRender(item, index))}</Box>
                  <Box justify="space-between" direction="row" align="center" padding={10}>
                    <Button type="secondary" text onClick={() => onOpenClose(false)}>
                      收起
                    </Button>
                    <FormItem style={{ height: '100%', display: 'flex', alignItems: 'center', margin: 0 }}>
                      <Box direction="row" spacing={20} align="center">
                        <Form.Submit validate type="primary" onClick={submitHandleCLose}>
                          查询
                        </Form.Submit>
                        <Form.Reset text onClick={() => submitHandleCLose({}, 'reset')}>
                          清空
                        </Form.Reset>
                      </Box>
                    </FormItem>
                  </Box>
                </Box>
              </Form>
            </Box>
          </Drawer>
        </>
      )}
    </Box>
  );
};

export default BaseFilter;
