import { Suspense } from 'react'
import MyTrades from './pages/my-orders'
import { DefaultLoading, LoadingProvider } from 'react-hook-loading'
import ErrorBoundary from './ErrorBoundary'
import { Toaster } from 'react-hot-toast'
import Login from './components/Login'

export default function App() {
  return (
    <ErrorBoundary>
      <LoadingProvider>
        <Suspense fallback={<DefaultLoading />}>
          {window.location.pathname === '/my-orders' ? <MyTrades /> : <Login />}
        </Suspense>
      </LoadingProvider>
      <Toaster />
    </ErrorBoundary>
  )
}
