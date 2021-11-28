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
import { parseSearchParams } from '@madup-inc/utils'
import axios from 'axios'
import moment from 'moment'

const data = [
  { x: '10/12', y: 200, z: 200 },
  { x: '10/17', y: 100, z: 260 },
  { x: '10/18', y: 300, z: 400 },
  { x: '10/22', y: 250, z: 280 },
]

export default () => {
  const [data, setData] = useState([])
  const { accessKey, secretKey } = parseSearchParams(window.location.search)

  useEffect(() => {
    if (!accessKey || !secretKey) {
      return
    }
    axios
      .get(
        `https://buy-btc.vercel.app/api/my-orders?accessKey=${accessKey}&secretKey=${secretKey}&order_by=asc`,
      )
      .then(result => {
        console.log('xxx', result.data)
        setData(
          result.data
            // .slice(0, 50)
            .map(item => ({
              x: moment(item.created_at).format('MM/DD HH:mm'),
              y: Number(Math.floor(item.price)),
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
        <XAxis dataKey="x" name="date" />
        <YAxis
          type="number"
          dataKey="y"
          name="price"
          tickFormatter={value => Math.floor(value / 10000) + '만원'}
        />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="A school" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  )
}
