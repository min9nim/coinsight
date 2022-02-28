import { Suspense } from 'react'
import MyTrades from './pages/my-orders'
import { DefaultLoading, LoadingProvider } from 'react-hook-loading'
import ErrorBoundary from './ErrorBoundary'
import { Toaster } from 'react-hot-toast'
import Login from './components/Login'
import {useSearchParams} from 'react-router-dom'

export default function App() {
    const [searchParam] =useSearchParams()
    const theme = searchParam.get('theme') || 'dark'
    return (
        <ErrorBoundary>
            <LoadingProvider>
                <div className={theme}>
                    <Suspense fallback={<DefaultLoading />}>
                        {window.location.pathname === '/my-orders' ? (
                            <MyTrades theme={theme}/>
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
