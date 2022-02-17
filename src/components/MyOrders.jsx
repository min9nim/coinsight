import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  ReferenceLine,
  YAxis,
  ZAxis,
} from 'recharts'
import moment from 'moment'
import { toComma } from '@madup-inc/utils'
import useTradePrice from '../SWRs/useTradePrice'
import { last, sort, head } from 'ramda'
import Header1 from './Header1'
import Header2 from './Header2'

const ONE_MILLION = 1000000

export default function MyOrders({ data, currencies, market, setMarket }) {
  const { data: tradePrice } = useTradePrice(market)
  const currentPrice = tradePrice?.trade_price

  const coin = currencies.find(item => item.currency === market)
  const avgPrice = coin.avg_buy_price

  const ySorted = sort((a, b) => a.y - b.y, data)
  const [minYValue, maxYValue] = [head(ySorted).y, last(ySorted).y]

  const profit = Math.floor(coin.balance * (currentPrice - avgPrice))
  return (
    <div style={{ height: '100vh', padding: 3 }}>
      <Header1
        avgPrice={avgPrice}
        currencies={currencies}
        currentPrice={currentPrice}
        market={market}
        setMarket={setMarket}
      />
      <Header2
        currentPrice={currentPrice}
        avgPrice={avgPrice}
        coin={coin}
        profit={profit}
      />

      <div style={{ height: 'calc(100vh - 70px)' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis
              type="number"
              dataKey="x"
              name="date"
              angle={10}
              tickFormatter={value => moment(value).format('YY/MM/DD')}
              domain={['auto', 'auto']}
            />
            <YAxis
              type="number"
              width={50}
              dataKey="y"
              name="price"
              domain={[
                minYValue < currentPrice ? 'auto' : currentPrice,
                maxYValue > currentPrice ? 'auto' : currentPrice,
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
                    toComma(Math.round(Number(payload.y) * Number(payload.z)))
                  )
                }
                return type === 'date'
                  ? moment(value).format('MM/DD dd HH:mm')
                  : toComma(value)
              }}
            />
            <Scatter name="A school" data={data} fill="#8884d8" />
            {avgPrice && (
              <ReferenceLine
                y={avgPrice}
                label={'매수평균: ' + toComma(Math.floor(avgPrice))}
                stroke="#4cc9f0"
              />
            )}
            {currentPrice && (
              <ReferenceLine
                y={currentPrice}
                label={'현재가: ' + toComma(currentPrice)}
                stroke="#ffadad"
              />
            )}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
