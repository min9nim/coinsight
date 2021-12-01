/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import { oneOf, parseSearchParams } from '@madup-inc/utils'
import axios from 'axios'
import moment from 'moment'
import { useLoading } from 'react-hook-loading'
import MyOrders from '../components/MyOrders'

export default () => {
  const [market, setMarket] = useState('BTC')
  const [currencies, setCurrencies] = useState([])
  const [data, setData] = useState([])
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
        setCurrencies(result.data.filter(item => item.currency !== 'KRW'))
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
        params: {
          accessKey,
          secretKey,
          orderBy: 'asc',
          market: 'KRW-' + market,
        },
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

  if (loading) {
    return null
  }

  return oneOf(
    [
      [
        data.length > 0,
        () => (
          <MyOrders
            data={data}
            currencies={currencies}
            market={market}
            setMarket={setMarket}
          />
        ),
      ],
      [
        accessKey.length !== 40 || secretKey.length !== 40,
        () => (
          <div css={div}>
            <div css={innerDiv}>
              accessKey:
              <input
                css={inputStyle}
                autoFocus
                maxLength={40}
                value={accessKey}
                onChange={e => {
                  setAccessKey(e.target.value)
                  window.localStorage.setItem('accessKey', e.target.value)
                }}
              />
            </div>
            <div css={innerDiv}>
              <span>secretKey:</span>
              <input
                css={inputStyle}
                maxLength={40}
                value={secretKey}
                onChange={e => {
                  setSecretKey(e.target.value)
                  window.localStorage.setItem('secretKey', e.target.value)
                }}
              />
            </div>
          </div>
        ),
      ],
    ],
    () => <div>There is no data</div>,
  )
}


const div = css`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const innerDiv = css`
  margin: 5px;
  width: 300px;
  text-align: right;
`

const inputStyle=css`
  width: 200px;
  margin: 0 5px;
`
