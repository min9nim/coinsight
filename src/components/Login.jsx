/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import anime from 'animejs'
import { useEffect, useRef } from 'react'

export default function Login({
  accessKey,
  setAccessKey,
  secretKey,
  setSecretKey,
}) {
  const aniWrapper = useRef(null)

  useEffect(() => {
    anime({
      targets: aniWrapper.current,
      translateX: 0,
      scale: 1,
      rotate: '1turn',
    })
  }, [])

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
        <legend>업비트의 자산조회용 키를 입력해 주세요 . 🔑 </legend>
        <div css={innerDiv}>
          accessKey:
          <input
            css={inputStyle}
            autoFocus
            maxLength={40}
            value={accessKey}
            onFocus={() => navigator.clipboard.readText().then(clipText => {
              setAccessKey(clipText)
              window.localStorage.setItem('accessKey', clipText)
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
            onFocus={() => navigator.clipboard.readText().then(clipText => {
              setSecretKey(clipText)
              window.localStorage.setItem('secretKey', clipText)
            })}
            onChange={e => {
              setSecretKey(e.target.value)
              window.localStorage.setItem('secretKey', e.target.value)
            }}
          />
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
