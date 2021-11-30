import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts'
import moment from 'moment'
import { toComma } from '@madup-inc/utils'

export default function MyOrders({ data, options, market, setMarket }) {
  return (
    <div style={{ height: '100vh' }}>
      <select
        value={market}
        name="market"
        onChange={e => {
          setMarket(e.target.value)
        }}
      >
        {options.map(item => (
          <option value={item}>{item}</option>
        ))}
      </select>
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
            width={80}
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
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}
