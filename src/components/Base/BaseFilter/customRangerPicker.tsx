import { forwardRef } from 'react';

import { DatePicker } from '@alifd/next';
import moment from 'moment';

const { RangePicker } = DatePicker;
export const CustomRangerPicker: React.FunctionComponent = forwardRef((props: any, ref: any) => {
  const onChange = (value) => {
    props.onChange(value.map((v) => moment(v).format('YYYY-MM-DD HH:ss:mm')));
  };
  return (
    <div>
      <RangePicker
        value={props.value}
        onChange={onChange}
        ref={ref}
        showTime
        style={{ width: '100%' }}
        format="YYYY-MM-DD"
      />
    </div>
  );
});
