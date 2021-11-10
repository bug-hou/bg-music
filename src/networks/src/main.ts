import axios, { AxiosRequestConfig, AxiosResponse } from "axios";


class Ajax {
  // 请求config文件
  private config: AxiosRequestConfig;
  private axios = axios;
  constructor(config: AxiosRequestConfig) {
    this.config = config;
    // 添加全局请求拦截
    this.axios.interceptors.request.use(this.requestSuccess, this.requestFail);
    this.axios.interceptors.response.use(this.responseSuccess);
  }
  request(url: string, config: AxiosRequestConfig): any {
    const newConfig = this.merge(this.config, config);
    return this.axios.request({
      url,
      ...newConfig,
    })
  }
  get(url: string, config: AxiosRequestConfig): any {
    const newConfig = this.merge(this.config, config);
    return this.axios.get(url, newConfig);
  }
  post(url: string, config: AxiosRequestConfig): any {
    const newConfig = this.merge(this.config, config);
    return this.axios.post(url, newConfig);
  }
  private merge(newConfig: AxiosRequestConfig, oldConfig: AxiosRequestConfig): AxiosRequestConfig {
    return Object.assign({}, newConfig, oldConfig);
  }
  private requestSuccess(config: AxiosRequestConfig) {
    return config;
  }
  private requestFail(config: AxiosRequestConfig) {
    console.warn("请求失败了~~")
    return config;
  }
  private responseSuccess(result: AxiosResponse) {
    return result.data;
  }
}

export default Ajax;