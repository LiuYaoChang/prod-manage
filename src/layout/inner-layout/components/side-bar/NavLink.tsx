import React from 'react'
import { Link } from 'react-router-dom'
import Icon from '@/components/base/icon'
import { IconName } from '@/types/icon'

interface IProps {
	path: string
	icon?: IconName
	title: string
}

const NavLink: React.FC<IProps> = ({ path, icon, title }) => {
	return (
		<Link to={path}>
			{/* {icon ? <Icon name={icon} /> : null} */}
			<span>{title}</span>
		</Link>
	)
}

export default NavLink
