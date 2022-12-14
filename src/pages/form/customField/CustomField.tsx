import React, { useState } from 'react'
import { Form, Button, Typography } from 'antd'

const { Title } = Typography

const options = [
	{
		id: 2001,
		name: '山东省'
	},
	{
		id: 2002,
		name: '广西省'
	},
	{
		id: 2003,
		name: '江西省'
	}
]

const CustomField: React.FC = () => {
	const [province, setProvince] = useState<number[]>([2001, 2002])

	const handleChange = (value: number[]) => {
		setProvince(value)
	}

	const handleFinish = values => {
		console.log(values)
	}

	return (
		<div>
			<p>展示自定义的表单控件的使用</p>
		</div>
	)
}

export default CustomField
