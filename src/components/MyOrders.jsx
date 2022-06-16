import {
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts'
import moment from 'moment'
import { oneOf, toComma } from '@madup-inc/utils'
import useTradePrice from '../SWRs/useTradePrice'
import { head, last, propEq, sort } from 'ramda'
import Header1 from './Header1'
import Details from './Details'
import { useSearchParams } from 'react-router-dom'

const ONE_MILLION = 1000000

export default function MyOrders({
    data,
    currencies,
    market,
    setMarket,
    theme,
  unit,
  krwusd,
}) {
    const [searchParam] = useSearchParams()
    const { data: tradePrice } = useTradePrice(market, unit)
    const currentPrice = Math.floor(tradePrice?.trade_price)
    const krw = currencies.find(item => item.currency === 'KRW') || {}
    const coin = currencies.find(item => item.currency === market)
    if (!coin) {
        return <div>새로고침 해보세요</div>
    }
    const avgPrice = unit === 'KRW' ? coin.avg_buy_price : Math.floor(coin.avg_buy_price / (krwusd?.basePrice))

    const ySorted = sort((a, b) => a.y - b.y, data)
    const [minYValue, maxYValue] = [head(ySorted).y, last(ySorted).y]
    const profit = Math.floor(coin.balance * (currentPrice - avgPrice))
    const height = oneOf(
        [
            [window.innerWidth > 652, 68],
            [window.innerWidth > 330, 116],
        ],
        190,
    )
    // console.log({height})
    const xScale = searchParam.get('xScale') || 'index'

    return (
        <div style={{ padding: 3, fontSize: 14 }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Header1
                    avgPrice={avgPrice}
                    currencies={currencies}
                    currentPrice={currentPrice}
                    market={market}
                    setMarket={setMarket}
                    unit={unit}
                    krw={krw}
                    krwusd={krwusd}
                    coin={coin}
                    profit={profit}
                />
            </div>

            <div style={{ height: `calc(100vh - ${height}px)` }}>
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                        margin={{
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 20,
                        }}
                    >
                        <CartesianGrid vertical strokeDasharray="2" />
                        <XAxis
                            type="number"
                            dataKey={xScale}
                            name="date"
                            angle={10}
                            tickFormatter={value =>
                                xScale === 'index'
                                    ? value
                                    : moment(value).format('YY/MM/DD')
                            }
                            domain={['auto', 'auto']}
                        />
                        <YAxis
                            type="number"
                            width={50}
                            dataKey="y"
                            name="price"
                            domain={[
                                minYValue < currentPrice
                                    ? 'auto'
                                    : currentPrice,
                                maxYValue > currentPrice
                                    ? 'auto'
                                    : currentPrice,
                            ]}
                            tickFormatter={value =>
                                value > ONE_MILLION
                                    ? toComma(value / ONE_MILLION) + '백만'
                                    : toComma(value)
                            }
                        />
                        <ZAxis
                            type="number"
                            dataKey="z"
                            domain={['auto', 'auto']}
                            range={[50, 500]}
                            name="volume"
                        />
                        <Tooltip
                            cursor={{ strokeDasharray: '3 3' }}
                            formatter={(value, type, { payload }) => {
                                if (type === 'volume') {
                                    return (
                                        value +
                                        ' : ' +
                                        toComma(
                                            Math.round(
                                                Number(payload.y) *
                                                    Number(payload.z),
                                            ),
                                        )
                                    )
                                }
                                if (type === 'date') {
                                    return moment(payload.date).format(
                                        'YY/MM/DD dd HH:mm',
                                    )
                                }
                                return toComma(Math.round(value))
                            }}
                        />
                        <Scatter
                            name="bid"
                            data={data.filter(propEq('side', 'bid'))}
                            fill="#c95b98"
                        />
                        <Scatter
                            name="ask"
                            data={data.filter(propEq('side', 'ask'))}
                            fill="#5548b8"
                        />
                        {avgPrice && (
                            <ReferenceLine
                                y={avgPrice}
                                label={
                                    '매수평균: ' + toComma(Math.floor(avgPrice))
                                }
                                stroke={
                                    theme === 'dark' ? '#8afd7c' : '#702963'
                                }
                                strokeDasharray="2 4"
                            />
                        )}
                        {currentPrice && (
                            <ReferenceLine
                                y={currentPrice}
                                label={'현재가: ' + toComma(currentPrice)}
                                stroke={
                                    theme === 'dark' ? '#f5a7a7' : '#D22B2B'
                                }
                                strokeDasharray="2 4"
                            />
                        )}
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
