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

export default function MyOrders({ data, currencies, market, setMarket }) {
  const {data: tradePrice} = useTradePrice(market)
  const currentPrice = tradePrice?.trade_price

  const avgPrice = currencies.find(
    item => item.currency === market,
  ).avg_buy_price
  return (
    <div style={{ height: '100vh' }}>
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
      <div style={{ height: 'calc(100vh - 20px)' }}>
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
            domain={['auto', 'auto']}
            tickFormatter={value =>
              value > 1000000
                ? toComma(value / 1000000) + '백만'
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
            formatter={(value, type) =>
              type === 'date'
                ? moment(value).format('MM/DD HH:mm')
                : toComma(value)
            }
          />
          <Scatter name="A school" data={data} fill="#8884d8" />
          {avgPrice && (
            <ReferenceLine
              y={avgPrice}
              label={'매수평균: ' + toComma(Math.floor(avgPrice))}
              stroke="green"
            />
          )}
          {currentPrice && (
            <ReferenceLine
              y={currentPrice}
              label={'현재가: ' + toComma(currentPrice)}
              stroke="blue"
            />
          )}
        </ScatterChart>
      </ResponsiveContainer>
      </div>
    </div>
  )
}
