import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'
import config from '@/config'
const baseURL = import.meta.env.VITE_APP_BASE_API;
console.log("🚀 ~ file: request.ts:4 ~ baseURL", baseURL)
// import { useAppSelector } from '@/hooks/redux'
import store from '@/store'
import { isDef } from './share';
import { setToken } from '@/store/modules/account';
import history from './history';
// import { isDef } from './share';
export class Request {
	private baseConfig: AxiosRequestConfig = {
		baseURL: baseURL,
		headers: {},
		timeout: 8000,
	}

	// axios实例
	private instance: AxiosInstance = axios.create(this.baseConfig)

	public constructor() {
		this.setReqInterceptors()
		this.setResnterceptors()
	}

	// 设置请求头
	public setHeader = (headers: any) => {
		this.baseConfig.headers = { ...this.baseConfig.headers, ...headers }
		this.instance = axios.create(this.baseConfig)
		this.setReqInterceptors()
		this.setResnterceptors()
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

	// 请求拦截器
	private setReqInterceptors = () => {
		this.instance.interceptors.request.use(
			config => {

        // 如果有token 要追加到请求头
        // store
        console.log("🚀 ~ file: request.ts:93 ~ Request ~ store", store)
        const account = store.getState().account;
        if (isDef(account) && isDef(account.token)) {
          const originalHeaders = config.headers;
          const headers = Object.assign({}, originalHeaders, {
            token: account.token
          })
          config.headers = headers;
        }
        // const token = useAppSelector((state) => state.account.token);
        // if (isDef(token)) {
        //   const originalHeaders = config.headers;

        //   const headers = Object.assign({}, originalHeaders, {
        //     token
        //   })
        //   config.headers = headers;
        // }
				return config
			},
			err => {
				$message.error('请求失败')
				return Promise.reject(err)
			}
		)
	}

	// 响应拦截器
	private setResnterceptors = () => {
		this.instance.interceptors.response.use(
			res => {
				const { code, data, msg } = res.data
				if (code === 0) {
					return data
				} else if (code === 401) {
          store.dispatch(setToken({ token: '' }))
          history.push('/account/login')
          return;
        }
				$message.error(msg || '获取数据失败')
				return Promise.reject(res)
			},
			err => {
				$message.error('服务器响应失败')
				return Promise.reject(err)
			}
		)
	}
}

export default new Request()
