//  用户管理
import { lazy } from 'react'
import IRoute from '@/types/IRoute'

const User = lazy(() => import(/* webpackChunkName:"user" */ '@/pages/user'))

const route: IRoute = {
	name: 'user',
  menuId: 888,
	title: '用户管理',
	icon: 'iconfont icon-chongzhi',
	path: '/user',
	exact: true,
	component: User
}

export default route
