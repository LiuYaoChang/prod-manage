//  用户管理
import { lazy } from 'react'
import IRoute from '../IRoute'

const Menu = lazy(() => import(/* webpackChunkName:"user" */ '@/pages/system/menus'))

const route: IRoute = {
	name: 'system',
	title: '系统管理',
	path: '/system',
	icon: 'iconfont icon-chongzhi',
	children: [
		{
			name: 'menu',
			title: '菜单管理',
			path: '/system/menu',
			exact: true,
			component: Menu
		}
	]
}
export default route
