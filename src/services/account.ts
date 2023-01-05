import { IUserInfo } from '@/model/common'

// 登录
export const login = async (params: ILoginForm) => {
  // /renren-fast/sys/login
  // /api/login
	const res = await $request.post('/sys/login', { ...params })
	console.log("🚀 ~ file: account.ts:8 ~ login ~ res", res)
	return {
		token: res.token,
	}
}
// 获取当前登录用户的信息
export const getAccountInfo = async (params: { token: string }): Promise<IUserInfo> => {
  const info = await $request.get('/sys/user/info', params);
  console.log("🚀 ~ file: account.ts:16 ~ getAccountInfo ~ info", info)
  return info;
}

// 加载菜单和授权信息
export const getAccountMenus = async (params: { token: string }) => {
  try {
    const menus = await $request.get('/sys/menu/nav');
    return menus;
  } catch (error) {
    console.log("🚀 ~ file: account.ts:27 ~ getAccountMenus ~ error", error)

  }

}

