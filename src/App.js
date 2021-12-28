import {Suspense} from 'react'
import MyTrades from './pages/my-orders'
import { LoadingProvider, DefaultLoading } from 'react-hook-loading'
import { ToastContainer } from 'react-toastify'
import ErrorBoundary from './ErrorBoundary'
import 'react-toastify/dist/ReactToastify.css'

export default function App() {
  return (
    <ErrorBoundary>
      <LoadingProvider>
        <Suspense fallback={<DefaultLoading />}>
          <MyTrades />
        </Suspense>
        <ToastContainer />
      </LoadingProvider>
    </ErrorBoundary>
  )
}


