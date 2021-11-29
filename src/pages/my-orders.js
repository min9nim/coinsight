import React, { useEffect, useState } from 'react'
import {
  CartesianGrid,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  ResponsiveContainer,
  YAxis,
  ZAxis,
} from 'recharts'
import { parseSearchParams, toComma } from '@madup-inc/utils'
import axios from 'axios'
import moment from 'moment'

moment.locale('en')

export default () => {
  const [data, setData] = useState([])
  const { accessKey, secretKey } = parseSearchParams(window.location.search)

  useEffect(() => {
    if (!accessKey || !secretKey) {
      return
    }
    axios
      .get(`https://buy-btc.vercel.app/api/my-orders`, {
        params: { accessKey, secretKey, orderBy: 'asc' },
      })
      .then(result => {
        setData(
          result.data.map(item => ({
            x: moment(item.created_at).valueOf(),
            y: item.price,
            z: item.volume,
          })),
        )
      })
  }, [])

  console.log('data', data)

  if (data.length === 0) {
    return <div>Loading..</div>
  }
  return (
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
          tickFormatter={value => toComma(value)}
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
  )
}
