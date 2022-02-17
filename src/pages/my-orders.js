/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import React, { useState } from 'react'
import { oneOf, parseSearchParams } from '@madup-inc/utils'
import moment from 'moment'
import MyOrders from '../components/MyOrders'
import useMyAccounts from '../SWRs/useMyAccounts'
import useMyOrders from '../SWRs/useMyOrders'

export default () => {
  const [market, setMarket] = useState('BTC')
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

  const {data: myAccounts} = useMyAccounts({accessKey, secretKey})

  const {data: myOrders} = useMyOrders({market, accessKey,secretKey})
  const data = myOrders?.map(item => ({
    x: moment(item.created_at).valueOf(),
    y: Number(item.price),
    z: Number(item.volume),
  })) || []

  const currencies = myAccounts || []

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
