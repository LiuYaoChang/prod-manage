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
import { getAccountMenusAction, getUserInfoAction } from '@/store/modules/account'
import { PayloadAction } from '@reduxjs/toolkit'
const Fc: React.FC = () => {
  const dispatch = useAppDispatch()
  const token = useAppSelector((state) => state.account.token)
  const accountInfo = useAppSelector((state) => state.account.accountInfo)
	const history = useHistory()
	// 是否折叠侧边菜单
	const [collapsed, setCollapse] = useState(false)
	// 路由配置
	const [routeMap, setRouteMap] = useState<IRoute[]>([])

	useEffect(() => {
    console.log("🚀 ~ file: innerLayout.tsx:26 ~ useEffect ~ token", token)
		if (!token || token === '') {
      console.log("🚀 ~ file: innerLayout.tsx:26 ~ useEffect ~ token", token)
			history.replace('/account/login')
		} else {
      dispatch(getAccountMenusAction({ token})).then(({ payload }) => {
        // console.log("🚀 ~ file: innerLayout.tsx:29 ~ dispatch ~ menus", menus);
        setRouteMap(initRoutes(payload.permissions))
      })
      dispatch(getUserInfoAction({ token })).then(() => {
        // setRouteMap(initRoutes(accountInfo.permission))
      });
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
