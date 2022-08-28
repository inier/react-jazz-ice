/* eslint-disable no-redeclare */
/* eslint @typescript-eslint/no-empty-interface: 0 */
import useRequestHook from '@ahooksjs/use-request';
import type {
  BaseOptions,
  BasePaginatedOptions,
  BaseResult,
  CombineService,
  LoadMoreFormatReturn,
  LoadMoreOptions,
  LoadMoreOptionsWithFormat,
  LoadMoreParams,
  OptionsWithFormat,
  PaginatedFormatReturn,
  PaginatedOptionsWithFormat,
  PaginatedParams,
} from '@ahooksjs/use-request/es/types';
import { Message } from '@alifd/next';

import { request } from '@/api';

interface IResponse {
  result: number;
  data: any;
  msg: string;
}

interface IExpandOptions {
  captureError?: boolean;
  withFullResult?: boolean;
  formatResult?: (res: IResponse | any | null) => any;
}

type OmitBaseResult<R, P extends any[]> = Omit<BaseResult<R, P>, 'run'>;

interface IceBaseResult<R, P extends any[]> extends OmitBaseResult<R, P> {
  request: (...args: P) => Promise<R>;
}

interface IceLoadMoreResult<R> extends OmitBaseResult<R, LoadMoreParams<R>> {}

interface IcePaginatedResult<Item> extends OmitBaseResult<PaginatedFormatReturn<Item>, PaginatedParams> {}

function useRequest<R = any, P extends any[] = any, U = any, UU extends U = any>(
  service: CombineService<R, P>,
  options: OptionsWithFormat<R, P, U, UU>,
): IceBaseResult<U, P>;
function useRequest<R = any, P extends any[] = any>(
  service: CombineService<R, P>,
  options?: BaseOptions<R, P>,
): IceBaseResult<R, P>;
function useRequest<R extends LoadMoreFormatReturn, RR>(
  service: CombineService<RR, LoadMoreParams<R>>,
  options: LoadMoreOptionsWithFormat<R, RR>,
): IceLoadMoreResult<R>;
function useRequest<R extends LoadMoreFormatReturn, RR extends R>(
  service: CombineService<R, LoadMoreParams<R>>,
  options: LoadMoreOptions<RR>,
): IceLoadMoreResult<R>;
function useRequest<R = any, Item = any, U extends Item = any>(
  service: CombineService<R, PaginatedParams>,
  options: PaginatedOptionsWithFormat<R, Item, U>,
): IcePaginatedResult<Item>;
function useRequest<Item = any, U extends Item = any>(
  service: CombineService<PaginatedFormatReturn<Item>, PaginatedParams>,
  options: BasePaginatedOptions<U>,
): IcePaginatedResult<Item>;
function useRequest<DataType = any, ParamsType extends any[] = any>(
  service: CombineService<DataType, ParamsType>,
  options?: BaseOptions<DataType, ParamsType> & IExpandOptions,
): IceBaseResult<DataType, ParamsType> {
  const originFormatResult = options?.formatResult;
  const { run, ...rest } = useRequestHook(service, {
    // Note：
    // ahooks/useRequest manual 默认为 false 即自动请求
    // icejs/useRequest 默认为手动请求
    // 避免发生 breakchange 这里将 manual 默认改为 true
    manual: true,
    // 默认使用 request 作为请求方法
    requestMethod: request,
    throwOnError: true,
    ...options,
    formatResult: (res: IResponse) => {
      const { result, data, msg } = res;
      if (options?.withFullResult) {
        return originFormatResult ? originFormatResult(res) : res;
      } else if (result === 10000) {
        return originFormatResult ? originFormatResult(data) : data;
      } else {
        if (options?.captureError) {
          // message.error(msg);
          Message.error({
            title: '请求错误',
            content: msg,
          });
        }
        return originFormatResult ? originFormatResult(null) : null;
      }
    },
  } as any);

  return {
    // 修改 ahooks/useRequest 的返回值 run 为 request
    request: run,
    ...rest,
  };
}

export default useRequest;
