import React from 'react'
import MyTrades from './pages/my-orders'
import { LoadingProvider } from 'react-hook-loading'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <LoadingProvider>
      <MyTrades />
      <ToastContainer />
    </LoadingProvider>
  )
}

export default App
