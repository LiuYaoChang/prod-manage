// import { ColumnProps} from 'antd/lib/table/interface'
import React from 'react'

export interface IColumnProps<RecordType> {
	dataIndex: string
	title?: string
	width?: string | number
	ellipsis?: boolean
	render?: (value: any, record: RecordType, index: number) => React.ReactNode
	align?: 'left' | 'right' | 'center'
}
