import moment from 'moment'
import useFearGreedIndex from '../SWRs/useFearGreedIndex'
import {useSearchParams} from 'react-router-dom'

export default function Header1({
    market,
    setMarket,
    currencies,
    currentPrice,
    avgPrice,
}) {
    const profitPercent =
        Math.floor(((currentPrice - avgPrice) / avgPrice) * 10000) / 100


    const {data} = useFearGreedIndex()
    const fgIndex = data?.data.datasets[0].data[0]

    const [searchParam, setSearchParam] = useSearchParams()

    const xScale = searchParam.get('xScale') || 'index'

    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <select
                    value={market}
                    name="market"
                    onChange={e => {
                        setMarket(e.target.value)
                    }}
                >
                    {currencies.map(item => {
                        return (
                            <option key={item.currency} value={item.currency}>
                                {item.unit_currency + '-' + item.currency}
                            </option>
                        )
                    })}
                </select>
                <img
                    src={`https://static.upbit.com/logos/${market}.png`}
                    style={{ width: 19, marginLeft: 10 }}
                    alt="log-image"
                />
                <span
                    style={{
                        color: profitPercent > 0 ? '#C41E3A' : '#5D3FD3',
                        marginLeft: 10,
                        fontWeight: 'bold',
                    }}
                >
                    {profitPercent > 0 && '+'}
                    {String(profitPercent).padEnd(6, '0')}%
                </span>

            </div>
            <select
                value={xScale}
                name="xScale"
                onChange={e => {
                    setSearchParam({xScale: e.target.value})
                }}
                style={{marginLeft: 2}}

            >
                <option value='index'>
                    index
                </option>
                <option  value='date'>
                    date
                </option>
            </select>

            <div>
                <span style={{color: '#777', }}>Fear&Greed: {fgIndex}</span>
                <span style={{color: '#777', marginLeft: 10}}>{moment().format('YY/MM/DD HH:mm')}</span>
            </div>

        </div>
    )
}
