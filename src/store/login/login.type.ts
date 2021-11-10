export interface ILoginState {
  isLogin: boolean;
  token: string;
  cookie: string;
  account: any;
  profile: any;
  bindings: any;
}

export interface IAccountPayload {
  acount: string;
  password: string;
}