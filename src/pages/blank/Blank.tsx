import React from 'react'
import { observer } from 'mobx-react'
import { useSetState } from '@/hooks'
import Overflow from '@/components/base/overflow'
import './style.less'
// import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '@/store/modules/reducer'
import { useAppSelector, useAppDispatch } from '@/hooks/redux'
export function Counter() {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  const action = increment();
  console.log("🚀 ~ file: Blank.tsx:13 ~ Counter ~ action", action)
  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}
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
      <br />
      <Counter />
		</div>
	)
}

export default observer(Blank)
