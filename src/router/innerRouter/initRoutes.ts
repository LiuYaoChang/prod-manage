import { IPermission } from '@/model/common'
import IRoute from './IRoute'
import dashboardRoute from './modules/dashboard'
import blankRoute from './modules/blank'
import chartRoute from './modules/chart'
import formRoute from './modules/form'
import userRoute from './modules/user'
import articleRoute from './modules/article'
import systemRoutes from './modules/system'
const routeMap = [dashboardRoute, chartRoute, blankRoute, formRoute, articleRoute]

// 根据路由名称获取可访问的路由表
const filterRouteMap = (routeNames: string[], routeMap: IRoute[]) => {
	const acceptedRouteMap: IRoute[] = []
	routeMap.forEach((route: IRoute) => {
		// 如果一级路由的名称存在路由权限表中，则它之下的所有子路由都可访问
		if (routeNames.includes(route.name)) {
			acceptedRouteMap.push(route)
		} else {
			// 如果一级路由的名称不在路由权限表中，再看它的哪些子路由名称在路由权限表中
			if (route.children) {
				route.children = filterRouteMap(routeNames, route.children)
				// 如果有子路由可访问，再添加。
				if (route.children.length > 0) {
					acceptedRouteMap.push(route)
				}
			}
		}
	})
	return [userRoute, systemRoutes]
}


/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
// function fnAddDynamicMenuRoutes (menuList: IMenus[], routes = []) {
//   var temp:IMenus[]  = []
//   for (var i = 0; i < menuList.length; i++) {
//     if (menuList[i].list && menuList[i].list.length >= 1) {
//       temp = temp.concat(menuList[i].list)
//     } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
//       menuList[i].url = menuList[i].url.replace(/^\//, '')
//       var route = {
//         path: menuList[i].url.replace('/', '-'),
//         component: null,
//         name: menuList[i].url.replace('/', '-'),
//         meta: {
//           menuId: menuList[i].menuId,
//           title: menuList[i].name,
//           isDynamic: true,
//           isTab: true,
//           iframeUrl: ''
//         }
//       }
//       // url以http[s]://开头, 通过iframe展示
//       if (isURL(menuList[i].url)) {
//         route['path'] = `i-${menuList[i].menuId}`
//         route['name'] = `i-${menuList[i].menuId}`
//         route['meta']['iframeUrl'] = menuList[i].url
//       } else {
//         try {
//           route['component'] = _import(`modules/${menuList[i].url}`) || null
//         } catch (e) {}
//       }
//       routes.push(route)
//     }
//   }
//   if (temp.length >= 1) {
//     fnAddDynamicMenuRoutes(temp, routes)
//   } else {
//     mainRoutes.name = 'main-dynamic'
//     mainRoutes.children = routes
//     router.addRoutes([
//       mainRoutes,
//       { path: '*', redirect: { name: '404' } }
//     ])
//     sessionStorage.setItem('dynamicMenuRoutes', JSON.stringify(mainRoutes.children || '[]'))
//     console.log('\n')
//     console.log('%c!<-------------------- 动态(菜单)路由 s -------------------->', 'color:blue')
//     console.log(mainRoutes.children)
//     console.log('%c!<-------------------- 动态(菜单)路由 e -------------------->', 'color:blue')
//   }
// }

// 获取可访问的路由表
const initRoutes = (permission: IPermission[] = []) => {
	const routeNames = permission.map(item => item.name)
	// const routes = filterRouteMap(routeNames, routeMap)
	return filterRouteMap(routeNames, routeMap)
}

export default initRoutes
