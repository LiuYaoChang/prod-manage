import React from 'react'
import { DonutChart } from 'bizcharts'

class Donut extends React.Component {
	public render() {
		const data = [
			{
				item: '事例一',
				count: 40
			},
			{
				item: '事例二',
				count: 21
			},
			{
				item: '事例三',
				count: 17
			},
			{
				item: '事例四',
				count: 13
			},
			{
				item: '事例五',
				count: 9
			}
		]

		return (
			<div>
				<DonutChart
					data={data || []}
					title={{
						visible: true,
						text: '环图'
					}}
					autoFit
					description={{
						visible: true,
						text: '环图的外半径决定环图的大小，而内半径决定环图的厚度。'
					}}
					height={350}
					radius={0.8}
					padding="auto"
					angleField="value"
					colorField="type"
					pieStyle={{ stroke: 'white', lineWidth: 5 }}
				/>
			</div>
		)
	}
}
export default Donut
