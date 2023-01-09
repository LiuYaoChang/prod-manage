import React, { useEffect } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import PageLoading from '@/components/base/page-loading'
import constantMng from '@/utils/constant-mng'
import service from '@/service'
// import IRoute from '@/types/IRoute'
const OuterLayout = React.lazy(() => import(/* webpackChunkName:"outer-layout" */ '@/layout/outer-layout'))
const InnerLayout = React.lazy(() => import(/* webpackChunkName:"inner-layout" */ '@/layout/inner-layout'))


// const InnerLayout: React.FC = () => {
//   useEffect(() => {
//     console.log("🚀 ~ file: App.tsx:11 ~ useEffect ~ useEffect")
//   }, [])
//   return (
//     <h1>系统页面</h1>
//   )
// }

// import axios from 'axios'
// import { AjaxEffectFragment } from './utils/axios/effect'



const App: React.FC = () => {
	// 初始化常量表
	useEffect(() => {
    // axios.get('/api/getUsers').then((res) => {
    //   console.log("🚀 ~ file: App.tsx:18 ~ axios.get ~ res", res)
    // })
		const initTable = async () => {
			console.log("🚀 ~ file: App.tsx:31 ~ initTable ~ initTable")
			// const res = await service.getConstant()
			// console.log("🚀 ~ file: App.tsx:38 ~ initTable ~ res", res)
			// constantMng.initGroup(res)
		}
		initTable()
	}, [])

	return (
		<Router>
      {/* <AjaxEffectFragment /> */}
			<React.Suspense fallback={<PageLoading />}>
				<Switch>
					{/* 这两个路由是父路由，不能设置严格匹配。
                当url导航到子路由时，需要先匹配到父路由，再匹配子路由。
                如果父路由是exact模式，那么url为“/account/login”时，这个url就无法匹配到路由“/account”，也就无法继续往下匹配路由“/account/login”。
             */}
					<Route path="/account" component={OuterLayout} />
					{/*
              由于没有设置exact，只要url中包含"/",就会与这个路由匹配成功，所以必须将它写在最后。
              如果写在最前面，比如url为“/account/login”时，也会匹配成功，
             */}
					<Route path="/" component={InnerLayout} />
				</Switch>
			</React.Suspense>
		</Router>
	)
}

export default App
