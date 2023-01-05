import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'
const baseURL = import.meta.env.VITE_APP_BASE_API;
console.log("🚀 ~ file: request.ts:4 ~ baseURL", baseURL)
// import { useAppSelector } from '@/hooks/redux'
// import store from '@/store'
// import { isDef } from '../share';
// import account from '@/store/account';
// import { setToken } from '@/store/modules/account';
// import { useHistory } from 'react-router-dom';
// import { isDef } from './share';
export class Request {
	private baseConfig: AxiosRequestConfig = {
		baseURL: baseURL,
		headers: {},
		timeout: 8000,
	}
	// axios实例
	private instance: AxiosInstance;

	public constructor() {
    this.instance = axios.create(this.baseConfig)
		// this.setReqInterceptors()
		// this.setResnterceptors()
	}

  getInstance() {
    return this.instance;
  }

	// 设置请求头
	public setHeader = (headers: any) => {
		this.baseConfig.headers = { ...this.baseConfig.headers, ...headers }
		this.instance = axios.create(this.baseConfig)
		// this.setReqInterceptors()
		// this.setResnterceptors()
	}

	// get请求
	public get = (url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<any> =>
		this.instance({
			...{ url, method: 'get', params: data },
			...config,
		})

	// post请求
	public post = (url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<any> =>
		this.instance({
			...{ url, method: 'post', data },
			...config,
		})

	// 不经过统一的axios实例的get请求
	public postOnly = (url: string, data: any = {}, config: AxiosRequestConfig = {}) =>
		axios({
			...this.baseConfig,
			...{ url, method: 'post', data },
			...config,
		})

	// 不经过统一的axios实例的post请求
	public getOnly = (url: string, data: any = {}, config: AxiosRequestConfig = {}) =>
		axios({
			...this.baseConfig,
			...{ url, method: 'get', params: data },
			...config,
		})

	// delete请求,后端通过requestBody接收
	public deleteBody = (url: string, data: any = {}, config: AxiosRequestConfig = {}) =>
		this.instance({
			...{ url, method: 'delete', data },
			...config,
		})

	// delete请求,后端通过后端通过requestParam接收
	public deleteParam = (url: string, data: any = {}, config: AxiosRequestConfig = {}) =>
		this.instance({
			...{ url, method: 'delete', params: data },
			...config,
		})
}

export default new Request()
