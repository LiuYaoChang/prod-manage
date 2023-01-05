import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import { Scrollbars } from 'react-custom-scrollbars-2'
import IRoute from '@/types/IRoute'
import Icon from '@/components/base/icon'
import logo from '@/assets/images/logo.png'
import NavLink from './NavLink'
import './style.less'

interface IProps {
  collapsed: boolean;
	routeMap: IRoute[]
}

/**
 * 侧边菜单
 */
const renderThumb = (props: any) => {
	const { style, ...rest } = props

	const thumbStyle: React.CSSProperties = {
		backgroundColor: 'rgba(255,255,255,.2)',
		borderRadius: '3px',
		cursor: 'pointer'
	}

	return <div style={{ ...style, ...thumbStyle }} {...rest} />
}

const SiderBar: React.FC<IProps> = ({ routeMap, collapsed }) => {
	console.log("🚀 ~ file: SideBar.tsx:32 ~ routeMap", routeMap)
	const location = useLocation()

	// 当前激活的菜单
	const [activeMenu, setActiveMenu] = useState('/dashboard')

	useEffect(() => {
		setActiveMenu(location.pathname)
	}, [location.pathname])

	const handelClickMenu = (e: any) => {
		setActiveMenu(e.key)
	}

	// 根据路由配置生成菜单
	const getMenuItem = (route: IRoute) => {
		const { title, path, icon, children } = route
    const menuIcon = 'ant-menu-item-icon ' + icon;

		if (children) {
			return (
				<Menu.SubMenu key={path + ''} icon={icon ? <i className={menuIcon} /> : null} title={title}>
					{children.map((route: IRoute) => getMenuItem(route))}
				</Menu.SubMenu>
			)
		}
		return (
			<Menu.Item key={path + ''}>
				<NavLink path={path + ''} icon={icon ? menuIcon : undefined } title={title} />
			</Menu.Item>
		)
	}

	return (
		<Scrollbars renderThumbHorizontal={renderThumb} renderThumbVertical={renderThumb}>
			<div className="side-bar">
				<div className="side-bar__logo">
					<Link to="/dashboard">
						<img className="image" src={logo} alt="" />
						<span className="title">Admin</span>
					</Link>
				</div>
				<Menu theme="dark" mode="inline" selectedKeys={[activeMenu]} onClick={handelClickMenu}>
					{routeMap.map(route => getMenuItem(route))}
				</Menu>
			</div>
		</Scrollbars>
	)
}

export default SiderBar
