// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as axios from 'axios';

declare module 'axios' {
  // 定义请求响应格式{result: xxx, data: xxx, total:"", msg:"err message",...}， T：接口返回类型数据
  export interface CustomSuccessData<T> {
    result: string;
    data?: T;
    msg?: string;
    message?: string;
    [keys: string]: any;
  }
}
