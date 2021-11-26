export interface IOptions {
  mock?: boolean; // 是否请求mock而非线上
  noCommonData?: boolean; // 请求是否包含公共参数
  loading?: boolean; // 是否显示loading
  error?: boolean; // 是否显示错误
  cancelRequest?: true; // 是否开启取消重复请求功能
  retry?: number; // 请求重试次数
  retryDelay?: number; // 两次重试之间的时间间隔
  cache?: true; // 是否开启当前接口缓存
  setExpireTime?: number; // 当前接口缓存时限
}
