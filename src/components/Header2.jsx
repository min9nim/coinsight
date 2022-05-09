import { toComma } from '@madup-inc/utils'

export default function Header2({ coin, currentPrice, avgPrice, profit, unit }) {
  const texts = [
    `- 보유수량: ${coin.balance}`,
    `- 평가금액: ${toComma(Math.floor(coin.balance * currentPrice))}${unit === 'KRW' ? '₩' : '$'}`,
    `- 매수금액: ${toComma(Math.floor(coin.balance * avgPrice))}${unit === 'KRW' ? '₩' : '$'}`,
    `- 평가손익: ${toComma(profit)}${unit === 'KRW' ? '₩' : '$'}`,
  ]
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop: 5,
      }}
    >
      {texts.map((text, idx) => (
        <span
          key={idx}
          style={{
            margin: '3px 5px',
            fontWeight: 'bold',
          }}
        >
          {text}
        </span>
      ))}
    </div>
  )
}
