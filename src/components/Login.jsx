/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'

export default function Login({
  accessKey,
  setAccessKey,
  secretKey,
  setSecretKey,
}) {
  return (
    <div css={div}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src="https://bitcoin.org/img/icons/opengraph.png"
          style={{ width: 40, height: 40 }}
        />
        <h1 style={{ display: 'inline', padding: '0 5px' }}>Coinsight</h1>
      </div>
      <fieldset>
        <legend>업비트의 자산조회 키를 입력해 주세요 . 🔑 </legend>
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
