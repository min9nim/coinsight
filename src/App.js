import { Suspense } from 'react'
import MyOrders from './pages/my-orders'
import ErrorBoundary from './ErrorBoundary'
import { Toaster } from 'react-hot-toast'
import Login from './components/Login'
import { useSearchParams } from 'react-router-dom'

export default function App() {
    const [searchParam] = useSearchParams()
    const theme = searchParam.get('theme') || 'dark'
    return (
        <ErrorBoundary>
            <div className={theme}>
                <Suspense fallback={<div>Loading..</div>}>
                    {window.location.pathname === '/my-orders' ? (
                        <MyOrders theme={theme} />
                    ) : (
                        <Login />
                    )}
                </Suspense>
            </div>
            <Toaster />
        </ErrorBoundary>
    )
}
