import React, { useEffect, useState, useRef, useCallback } from 'react'
import cs from 'classnames'
import { Tooltip } from 'antd'
import { hexToRgb } from '@/utils/core'
import './style.less'

interface IProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> {
	className?: string[] | string
	// tooltip标题
	title?: string
	// 文本内容的颜色
	textColor?: string
	// 渐变阴影的起始位置,值为相对于宽度的百分比。适用于widthLimit条件下的shadow模式
	shadowPosition?: number
	// 判断是发生了溢出
	checkOverflow?: (isOverFlow: boolean) => void
}

const rootClass = 'overflow'

/**
 * 内容溢出处理
 */
const Overflow: React.FC<IProps> = (props: IProps) => {
	const {
		style,
		className,
		title = '',
		children,
		textColor = '#333',
		shadowPosition = 80,
		checkOverflow,
		...restProps
	} = props

	const overflowRef = useRef(null)

	const [isOverFlow, setIsOverflow] = useState(false)

	useEffect(() => {
		const dom: any = overflowRef.current
		const isOverFlow = dom.scrollWidth > dom.clientWidth
		setIsOverflow(isOverFlow)
		checkOverflow && checkOverflow(isOverFlow)
	}, [title, children, checkOverflow])

	return (
		<div
			ref={overflowRef}
			className={cs(rootClass, className)}
			style={{
				...style,
				backgroundImage: `linear-gradient(to right, ${textColor} ${
					isOverFlow ? shadowPosition + '%' : '100%'
				}, ${hexToRgb(textColor, 0)})`,
			}}
			{...restProps}
		>
			{children ? children : <>{title}</>}
		</div>
	)
}

interface IWrapProps extends IProps {
	// 溢出之后是否显示tooltip
	showTooltip?: boolean
}

const Wrap: React.FC<IWrapProps> = (props: IWrapProps) => {
	const [isOverFlow, setIsOverflow] = useState(false)
	const { showTooltip = true, children, ...restProps } = props

	const checkOverflow = useCallback(
		(value: boolean) => {
			setIsOverflow(value)
			restProps.checkOverflow && restProps.checkOverflow(value)
		},
		[restProps]
	)

	if (isOverFlow && showTooltip) {
		const toolTipTitle = props.title || children
		return (
			<Tooltip title={toolTipTitle}>
				<Overflow {...props} checkOverflow={checkOverflow} />
			</Tooltip>
		)
	}
	return <Overflow {...props} checkOverflow={checkOverflow} />
}

export default React.memo(Wrap)
