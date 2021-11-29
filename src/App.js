import React from 'react'
import MyTrades from './pages/my-orders'
import {LoadingProvider} from 'react-hook-loading'

function App() {
  return (
    <LoadingProvider>
      <MyTrades/>
    </LoadingProvider>
  );
}

export default App;
