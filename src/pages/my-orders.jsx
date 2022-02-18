import {useState} from 'react'
import {oneOf, parseSearchParams} from '@madup-inc/utils'
import moment from 'moment'
import MyOrders from '../components/MyOrders'
import useMyAccounts from '../SWRs/useMyAccounts'
import useMyOrders from '../SWRs/useMyOrders'
import Login from '../components/Login'

export default () => {
  const [market, setMarket] = useState('BTC')
  const [accessKey, setAccessKey] = useState(
    () =>
      parseSearchParams(window.location.search).accessKey ||
      window.localStorage.getItem('accessKey') ||
      '',
  )
  const [secretKey, setSecretKey] = useState(
    () =>
      parseSearchParams(window.location.search).secretKey ||
      window.localStorage.getItem('secretKey') ||
      '',
  )

  const { data: myAccounts } = useMyAccounts({ accessKey, secretKey })

  const { data: myOrders } = useMyOrders({ market, accessKey, secretKey })
  const data =
    myOrders?.map(item => ({
      x: moment(item.created_at).valueOf(),
      y: Number(item.price),
      z: Number(item.volume),
      side: item.side,
    })) || []

  const currencies = myAccounts || []

  return oneOf(
    [
      [
        data.length > 0,
        () => (
          <MyOrders
            data={data}
            currencies={currencies}
            market={market}
            setMarket={setMarket}
          />
        ),
      ],
      [
        accessKey.length !== 40 || secretKey.length !== 40,
        () => (
          <Login
            secretKey={secretKey}
            setSecretKey={setSecretKey}
            accessKey={accessKey}
            setAccessKey={setAccessKey}
          />
        ),
      ],
    ],
    () => <div>There is no data</div>,
  )
}
