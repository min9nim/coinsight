import {Suspense} from 'react'
import MyTrades from './pages/my-orders'
import {DefaultLoading, LoadingProvider} from 'react-hook-loading'
import {ToastContainer} from 'react-toastify'
import ErrorBoundary from './ErrorBoundary'
import {Toaster} from 'react-hot-toast'

export default function App() {
  return (
    <ErrorBoundary>
      <LoadingProvider>
        <Suspense fallback={<DefaultLoading />}>
          <MyTrades />
        </Suspense>
        <ToastContainer />
      </LoadingProvider>
        <Toaster />

    </ErrorBoundary>
  )
}


