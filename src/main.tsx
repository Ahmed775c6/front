import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter } from 'react-router-dom'
import { AuthProvider } from "./context/AuthProvider";
import store from './redux/store.ts'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
 <AuthProvider>
 <BrowserRouter>
    <Provider store={store}>

    <App />
    </Provider>
  </BrowserRouter>
 </AuthProvider>


  </React.StrictMode>
)
