//  用户管理
import { lazy } from 'react'
import IRoute from '../IRoute'

const Menu = lazy(() => import(/* webpackChunkName:"user" */ '@/pages/system/menus'))
const Role = lazy(() => import(/* webpackChunkName:"user" */ '@/pages/system/role'))
const User = lazy(() => import(/* webpackChunkName:"user" */ '@/pages/user'))

const route: IRoute = {
	name: 'system',
	title: '系统管理',
	path: '/system',
	icon: 'iconfont icon-chongzhi',
	children: [
		{
			name: 'menu',
      menuId: 4,
			title: '菜单管理',
			path: '/system/menu',
			exact: true,
			component: Menu
		},
		{
			name: 'role',
      menuId: 3,
			title: '角色管理',
			path: '/system/role',
			exact: true,
			component: Role
		},
		{
			name: 'user',
      menuId: 2,
			title: '用户管理',
			path: '/system/user',
			exact: true,
			component: User
		}
	]
}
export default route
