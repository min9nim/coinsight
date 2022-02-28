import { Suspense } from 'react'
import MyTrades from './pages/my-orders'
import { DefaultLoading, LoadingProvider } from 'react-hook-loading'
import ErrorBoundary from './ErrorBoundary'
import { Toaster } from 'react-hot-toast'
import Login from './components/Login'
import {useSearchParams} from 'react-router-dom'

export default function App() {
    const [searchParam] =useSearchParams()
    return (
        <ErrorBoundary>
            <LoadingProvider>
                <div className={searchParam.get('theme') || 'dark'}>
                    <Suspense fallback={<DefaultLoading />}>
                        {window.location.pathname === '/my-orders' ? (
                            <MyTrades />
                        ) : (
                            <Login />
                        )}
                    </Suspense>
                </div>
            </LoadingProvider>
            <Toaster />
        </ErrorBoundary>
    )
}
