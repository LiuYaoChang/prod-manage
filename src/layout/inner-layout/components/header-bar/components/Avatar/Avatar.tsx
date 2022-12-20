import React from 'react'
import { useHistory } from 'react-router-dom'
import { Menu, Dropdown, Avatar } from 'antd'
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons'
import accountStore from '@/store/account'
import './style.less'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setToken } from '@/store/modules/account'
const AvatarMenu: React.FC = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()

  const accountInfo = useAppSelector(state => state.account.accountInfo)

	const handleMenuClick = ({ key }: { key: any }) => {
		switch (key) {
			case 'mine':
				break
			case 'setting':
				break
			case 'logout':
        dispatch(setToken(''))
				history.replace('/account/login')
				break
			default:
				$message.warning('没有该操作')
		}
	}

	const getMenuList = () => (
		<Menu onClick={handleMenuClick}>
			<Menu.Item key="mine">
				<UserOutlined />
				个人中心
			</Menu.Item>
			<Menu.Item key="setting">
				<SettingOutlined />
				个人设置
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item key="logout">
				<LogoutOutlined />
				退出登录
			</Menu.Item>
		</Menu>
	)

	return (
		<Dropdown overlay={getMenuList}>
			<div className="header-bar-avatar">
				<Avatar src={accountInfo.avatar} />
				<div className="username">{accountInfo.name}</div>
			</div>
		</Dropdown>
	)
}

export default AvatarMenu
