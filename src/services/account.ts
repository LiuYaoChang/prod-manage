// 登录
export const login = async (params: ILoginForm) => {
	const res = await $request.post('/api/login', { params, responseType: 'json' })
	return {
		token: res.token,
	}
}

export default {
	login,
}
