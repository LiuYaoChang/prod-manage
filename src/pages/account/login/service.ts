// 登录
const login = async (params: { accountName: string; password: string; captcha: string }) => {
	const res = await $request.post('/api/login', { params, responseType: 'json' })
	return {
		token: res.token,
	}
}

export default {
	login,
}
