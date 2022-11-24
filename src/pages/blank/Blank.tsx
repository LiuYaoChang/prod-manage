import React from 'react'
import { observer } from 'mobx-react'
import { useSetState } from '@/hooks'
import Overflow from '@/components/base/overflow'
import './style.less'

const Blank: React.FC = () => {
	const [params, setParams] = useSetState({ page: 1, pageSize: 20 })

	const handlePagination = () => {
		setParams({
			pageSize: params.pageSize + 1,
		})
	}

	return (
		<div onClick={handlePagination}>
			<p className="text">dfgffffdfg</p>
			<div style={{ width: '200px' }}>
				<Overflow textColor="#009688" title="第二行内容第二行内容">
					<div>第一行内容</div>
					<div>第二行内容第二行内容第二行内容第二行内容</div>
				</Overflow>
			</div>
		</div>
	)
}

export default observer(Blank)
