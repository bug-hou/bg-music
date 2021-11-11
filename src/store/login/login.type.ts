export interface ILoginState {
  isLogin: boolean | number;
  token: string;
  cookie: string;
  account: any;
  profile: any;
  bindings: any;
  isCaptcha: boolean | null;
}

// 定义账号登陆payload
export interface IAccountPayload {
  account: string;
  password: string;
}

// 定义验证码payload
export interface ICaptchaPayload {
  phone: string | number;
}

// 定义验证验证码payload
export interface IVerifyPayload {
  phone: string | number;
  captcha: string | number;
}
