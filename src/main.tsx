import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './samples/node-api'
import 'styles/index.css'
import { message  } from 'antd'
import store from './store'
import { Provider } from 'react-redux'

window.$message = message;
// import '@/mock'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

postMessage({ payload: 'removeLoading' }, '*')
