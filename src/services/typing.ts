export interface IPublicKey {
  exp: string;
  mod: string;
}

export interface IDataSource {
  username: string;
  password: string;
  picCode: string;
  timestamp: string;
}

export interface ILoginProps {
  dataSource?: IDataSource;
  [propName: string]: any;
}

export interface ILoginReturn {
  token?: string;
  userName?: string;
  avatar?: string;
  portalName?: string;
}
