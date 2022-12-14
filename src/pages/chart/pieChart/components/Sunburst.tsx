import React from 'react'
import { Chart, Axis, Tooltip, Legend, View, Coordinate, Interval } from 'bizcharts'
import DataSet from '@antv/data-set'

class Sunburst extends React.Component {
	public render() {
		const data = [
			{
				value: 251,
				type: '大事例一',
				name: '子事例一'
			},
			{
				value: 1048,
				type: '大事例一',
				name: '子事例二'
			},
			{
				value: 610,
				type: '大事例二',
				name: '子事例三'
			},
			{
				value: 434,
				type: '大事例二',
				name: '子事例四'
			},
			{
				value: 335,
				type: '大事例三',
				name: '子事例五'
			},
			{
				value: 250,
				type: '大事例三',
				name: '子事例六'
			}
		]
		const { DataView } = DataSet
		const dv = new DataView()
		dv.source(data).transform({
			type: 'percent',
			field: 'value',
			dimension: 'type',
			as: 'percent'
		})
		const scale = {
			percent: { formatter: (val: number) => `${(val * 100).toFixed(2)}%` }
		}

		const dv1 = new DataView()
		dv1.source(data).transform({
			type: 'percent',
			field: 'value',
			dimension: 'name',
			as: 'percent'
		})

		return (
			<div>
				<Chart
					height={400}
					data={dv.rows}
					autoFit
					scale={{
						percent: {
							formatter: val => {
								val = `${(val * 100).toFixed(2)}%`
								return val
							}
						}
					}}
				>
					<Coordinate type="theta" radius={0.5} />
					<Axis visible={false} />
					<Legend visible={false} />
					<Tooltip showTitle={false} />
					<Interval
						position="percent"
						adjust="stack"
						color="type"
						element-highlight
						style={{
							lineWidth: 1,
							stroke: '#fff'
						}}
						label={[
							'type',
							{
								offset: -15
							}
						]}
					/>

					<View data={dv1.rows} scale={scale}>
						<Coordinate type="theta" radius={0.75} innerRadius={0.5 / 0.75} />
						<Interval
							position="percent"
							adjust="stack"
							color={['name', ['#BAE7FF', '#7FC9FE', '#71E3E3', '#ABF5F5', '#8EE0A1', '#BAF5C4']]}
							element-highlight
							style={{
								lineWidth: 1,
								stroke: '#fff'
							}}
							label="name"
						/>
					</View>
				</Chart>
			</div>
		)
	}
}
export default Sunburst
