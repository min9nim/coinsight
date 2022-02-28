import { useState } from 'react'
import moment from 'moment'
import MyOrders from '../components/MyOrders'
import useMyAccounts from '../SWRs/useMyAccounts'
import useMyOrders from '../SWRs/useMyOrders'

export default () => {
    const accessKey = window.localStorage.getItem('accessKey') || ''
    const secretKey = window.localStorage.getItem('secretKey') || ''
    const [market, setMarket] = useState('BTC')

    const { data: myAccounts } = useMyAccounts({
        accessKey,
        secretKey,
    })

    const { data: myOrders } = useMyOrders({ market, accessKey, secretKey })
    const data =
        myOrders?.map((item, idx) => ({
            index: idx + 1,
            date: moment(item.created_at).valueOf(),
            y: Number(item.price),
            z: Number(item.volume),
            side: item.side,
        })) || []

    const currencies = myAccounts || []

    return data.length > 0 ? (
        <MyOrders
            data={data}
            currencies={currencies}
            market={market}
            setMarket={setMarket}
        />
    ) : (
        <div style={{ margin: 10 }}>There is no data</div>
    )
}
