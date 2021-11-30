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
import { parseSearchParams, toComma, oneOf } from '@madup-inc/utils'
import axios from 'axios'
import moment from 'moment'
import { useLoading } from 'react-hook-loading'

moment.locale('en')

export default () => {
  const [market, setMarket] = useState('KRW-BTC')
  const [data, setData] = useState([])
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useLoading()

  const [accessKey, setAccessKey] = useState(
    () =>
      parseSearchParams(window.location.search).accessKey ||
      window.localStorage.getItem('accessKey') ||
      '',
  )
  const [secretKey, setSecretKey] = useState(
    () =>
      parseSearchParams(window.location.search).secretKey ||
      window.localStorage.getItem('secretKey') ||
      '',
  )

  const loadData = () => {
    setLoading(true)
    axios
      .get(`https://buy-btc.vercel.app/api/my-accounts`, {
        params: { accessKey, secretKey },
      })
      .then(result => {
        setOptions(
          result.data.map(item => item.unit_currency + '-' + item.currency),
        )
      })
      .catch(err => {
        alert(err.message)
        localStorage.clear()
      })
      .finally(() => {
        setLoading(false)
      })

    setLoading(true)
    axios
      .get(`https://buy-btc.vercel.app/api/my-orders`, {
        params: { accessKey, secretKey, orderBy: 'asc', market},
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
      .catch(err => {
        alert(err.message)
        localStorage.clear()
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (accessKey.length !== 40 || secretKey.length !== 40) {
      return
    }

    loadData()
  }, [accessKey, secretKey, market])

  console.log('data', data)

  if (loading) {
    return null
  }

  return oneOf(
    [
      [
        data.length > 0,
        () => (
          <div style={{height: '100vh'}}>
            <select value={market} name="market" onChange={e => {
              setMarket(e.target.value)
            }}>
              {options.map(item => <option value={item}>{item}</option>)}
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
        ),
      ],
      [
        accessKey.length !== 40 || secretKey.length !== 40,
        () => (
          <>
            <div>
              <span>accessKey: </span>
              <input
                autoFocus
                maxLength={40}
                value={accessKey}
                onChange={e => {
                  setAccessKey(e.target.value)
                  window.localStorage.setItem('accessKey', e.target.value)
                }}
              />
            </div>
            <div>
              <span>secretKey:</span>
              <input
                maxLength={40}
                value={secretKey}
                onChange={e => {
                  setSecretKey(e.target.value)
                  window.localStorage.setItem('secretKey', e.target.value)
                }}
              />
            </div>
          </>
        ),
      ],
    ],
    () => <div>There is no data</div>,
  )
}
