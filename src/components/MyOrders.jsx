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

const ONE_MILLION = 1000000

export default function MyOrders({ data, currencies, market, setMarket }) {
  const { data: tradePrice } = useTradePrice(market)
  const currentPrice = tradePrice?.trade_price

  const avgPrice = currencies.find(
    item => item.currency === market,
  ).avg_buy_price

  const profit =
    Math.floor(((currentPrice - avgPrice) / avgPrice) * 10000) / 100
  return (
    <div style={{ height: '100vh', padding: 3 }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
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
        <img src={`https://static.upbit.com/logos/${market}.png`} style={{width: 19, marginLeft:10}}/>
          <span style={{ color: profit > 0 ? 'red' : 'blue', marginLeft: 10, fontWeight: 'bold' }}>
            {profit > 0 && '+'}{profit}%
        </span>
      </div>
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
