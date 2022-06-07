/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import anime from 'animejs'
import { useEffect, useRef, useState } from 'react'
import {parseSearchParams} from '@madup-inc/utils'
import {toast} from 'react-hot-toast'

export default function Login() {

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
  const aniWrapper = useRef(null)

  useEffect(() => {
    anime({
      targets: aniWrapper.current,
      translateX: 0,
      scale: 1,
      rotate: '1turn',
    })
  }, [])


  useEffect(() => {
    if(accessKey === secretKey){
      toast.error('accessKey 와 secretKey 에 동일한 값이 입력되었습니다')
      return
    }
    if(accessKey.length === 40 && secretKey.length === 40){
      window.localStorage.setItem('accessKey', accessKey)
      window.localStorage.setItem('secretKey', secretKey)
      window.location.assign('/my-orders')
    }
  }, [accessKey, secretKey])

  return (
    <div
      css={div}
      ref={aniWrapper}
      style={{
        transform: 'translateX(-500px) scale(0.5)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/images/btc-log.png" style={{ width: 40, height: 40 }} />
        <h1 style={{ display: 'inline', padding: '0 5px' }}>Coinsight</h1>
      </div>
      <fieldset>
        <legend>업비트의 자산&주문 조회용 키를 입력해 주세요 . 🔑 </legend>
        <div css={innerDiv}>
          accessKey:
          <input
            css={inputStyle}
            maxLength={40}
            value={accessKey}
            onFocus={(e) => navigator.clipboard.readText().then(clipText => {
              setAccessKey(clipText)
              window.localStorage.setItem('accessKey', clipText)
              e.target.blur()
            })}
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
            onFocus={(e) => navigator.clipboard.readText().then(clipText => {
              setSecretKey(clipText)
              window.localStorage.setItem('secretKey', clipText)
              e.target.blur()
            })}
            onChange={e => {
              setSecretKey(e.target.value)
              window.localStorage.setItem('secretKey', e.target.value)
            }}
          />
        </div>
        <div style={{textAlign: 'right', padding: '10px 10px 0'}}>
          <button onClick={() => {
            if(accessKey.length !== 40){
              toast.error('accessKey 가 유효하지 않습니다.')
              return
            }
            if(secretKey.length !== 40){
              toast.error('secretKey 가 유효하지 않습니다.')
              return
            }
            if(accessKey === secretKey){
              toast.error('accessKey 와 secretKey 가 동일합니다.')
              return
            }
            window.location.assign('/my-orders')
          }}>Login</button>
        </div>
      </fieldset>
    </div>
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
  font-size: 14px;
`

const inputStyle = css`
  width: 200px;
  margin: 0 5px;
`
