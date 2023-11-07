import { useState } from 'react'
import moment from 'moment'
import MyOrders from '../components/MyOrders'
import useMyAccounts from '../SWRs/useMyAccounts'
import useMyOrders from '../SWRs/useMyOrders'
import { useSearchParams } from 'react-router-dom'
import useKRWUSD from '../SWRs/useKRWUSD'

export default ({ theme }) => {
    const [searchParam] = useSearchParams()
    const unit = searchParam.get('unit') || 'USDT'
    const [market, setMarket] = useState('BTC')
    const { data: krwusd } = useKRWUSD()

    const accessKey =
        searchParam.get('accessKey') ||
        window.localStorage.getItem('accessKey') ||
        ''
    const secretKey =
        searchParam.get('secretKey') ||
        window.localStorage.getItem('secretKey') ||
        ''

    const { data: myAccounts } = useMyAccounts({
        accessKey,
        secretKey,
    })

    const { data: myOrders } = useMyOrders({ market, accessKey, secretKey })
    const data =
        myOrders?.map((item, idx) => ({
            index: idx + 1,
            date: moment(item.created_at).valueOf(),
            y: Number(
                unit === 'KRW' ? item.price : item.price / krwusd.basePrice,
            ),
            z: Number(item.volume),
            side: item.side,
        })) || []

    if (!myAccounts) {
        return <div>Loading..</div>
    }
    const currencies = myAccounts || []

    return data.length > 0 ? (
        <MyOrders
            data={data}
            currencies={currencies}
            market={market}
            setMarket={setMarket}
            theme={theme}
            unit={unit}
            krwusd={krwusd}
        />
    ) : (
        <div style={{ margin: 10 }}>There is no data</div>
    )
}
