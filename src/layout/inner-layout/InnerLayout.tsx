import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Layout, BackTop } from 'antd'
import InnerRouter, { initRoutes } from '@/router/innerRouter'
import IRoute from '@/types/IRoute'
import accountStore from '@/store/account'
import HeaderBar from './components/header-bar'
import SideBar from './components/side-bar'
import service from './service'
import './style.less'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
const Fc: React.FC = () => {
  const token = useAppSelector((state) => state.account.token)
	const history = useHistory()
	// 是否折叠侧边菜单
	const [collapsed, setCollapse] = useState(false)
	// 路由配置
	const [routeMap, setRouteMap] = useState<IRoute[]>([])

	useEffect(() => {
		if (!token) {
			history.replace('/account/login')
		} else {
			service.getAccountInfo({ token }).then(res => {
				accountStore.setAccountInfo(res)
				setRouteMap(initRoutes(res.permission))
			})
		}
	}, [history])

	// 切换菜单折叠状态
	const triggerCollapse = () => {
		setCollapse(state => !state)
	}

	return (
		<Layout className="inner-layout">
			<Layout.Sider
				className="inner-layout__sider"
				width={160}
				trigger={null}
				collapsible={true}
				collapsed={collapsed}
			>
				<SideBar routeMap={routeMap} collapsed={collapsed} />
				{/* <SideBar collapsed={collapsed} /> */}
			</Layout.Sider>

			<Layout id="layoutMain" className="inner-layout__main">
				<HeaderBar collapse={collapsed} onTrigger={triggerCollapse} />

				<div className="content">
					<InnerRouter routeMap={routeMap} />
				</div>

				<BackTop
					style={{ right: '50px' }}
					target={() => document.getElementById('layoutMain')!}
					visibilityHeight={600}
				/>
			</Layout>
		</Layout>
	)
}

export default Fc
