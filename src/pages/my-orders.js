import React, { useEffect, useState } from 'react'
import {
  CartesianGrid,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  ResponsiveContainer,
  YAxis,
} from 'recharts'
import {parseSearchParams, toComma} from '@madup-inc/utils'
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
          result.data
            .map(item => ({
              x: moment(item.created_at).format('MM/DD HH:mm'),
              y: Number(item.price),
              z: Number(item.volume * 1000000),
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
        <XAxis dataKey="x" name="date" angle={10} />
        <YAxis
          type="number"
          width={80}
          dataKey="y"
          name="price"
          domain={['auto', 'auto']}
          tickFormatter={value => toComma(value)}
        />
        <Tooltip
          cursor={{ strokeDasharray: '3 3' }}
          formatter={(value, type) => type === 'price' ? toComma(value) : value}
        />
        <Scatter name="A school" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  )
}
