import { IUserInfo } from '@/model/common'
// 获取当前登录用户的信息
const getAccountInfo = (params: { token: string }): Promise<IUserInfo> => $request.get('/api/accountInfo', params)

export default {
	getAccountInfo
}
