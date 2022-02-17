import { toComma } from '@madup-inc/utils'

export default function Header2({ coin, currentPrice, avgPrice, profit }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop: 5,
      }}
    >
      <span
        style={{
          color: 'grey',
          marginLeft: 10,
          fontWeight: 'bold',
        }}
      >
        - 보유수량: {coin.balance}
      </span>
      <span
        style={{
          color: 'grey',
          marginLeft: 10,
          fontWeight: 'bold',
        }}
      >
        - 평가금액: {toComma(Math.floor(coin.balance * currentPrice))}원
      </span>
      <span
        style={{
          color: 'grey',
          marginLeft: 10,
          fontWeight: 'bold',
        }}
      >
        - 매수금액: {toComma(Math.floor(coin.balance * avgPrice))}원
      </span>
      <span
        style={{
          color: 'grey',
          marginLeft: 10,
          fontWeight: 'bold',
        }}
      >
        - 평가손익: {toComma(profit)}원
      </span>
    </div>
  )
}
