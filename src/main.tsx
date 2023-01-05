import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './samples/node-api'
import 'styles/index.css'
import { message  } from 'antd'
import store, { persistore } from './store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
window.$message = message;
// import '@/mock'
ReactDOM.createRoot(document.getElementById('root')!).render(
  // React.StrictMode
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistore}>
        <App />
      </PersistGate>
    </Provider>
  // <React.StrictMode></React.StrictMode>
)

postMessage({ payload: 'removeLoading' }, '*')
