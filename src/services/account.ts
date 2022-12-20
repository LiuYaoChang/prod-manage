import { IUserInfo } from '@/model/common'

// 登录
export const login = async (params: ILoginForm) => {
	const res = await $request.post('/api/login', { params, responseType: 'json' })
	return {
		token: res.token,
	}
}
// 获取当前登录用户的信息
export const getAccountInfo = (params: { token: string }): Promise<IUserInfo> => $request.get('/api/accountInfo', params)

