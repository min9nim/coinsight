export default function Header1({
  market,
  setMarket,
  currencies,
  currentPrice,
  avgPrice,
}) {
  const profitPercent =
    Math.floor(((currentPrice - avgPrice) / avgPrice) * 10000) / 100

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <select
        value={market}
        name="market"
        onChange={e => {
          setMarket(e.target.value)
        }}
      >
        {currencies.map(item => {
          return (
            <option key={item.currency} value={item.currency}>
              {item.unit_currency + '-' + item.currency}
            </option>
          )
        })}
      </select>
      <img
        src={`https://static.upbit.com/logos/${market}.png`}
        style={{ width: 19, marginLeft: 10 }}
        alt="log-image"
      />
      <span
        style={{
          color: profitPercent > 0 ? 'red' : 'blue',
          marginLeft: 10,
          fontWeight: 'bold',
        }}
      >
        {profitPercent > 0 && '+'}
        {String(profitPercent).padEnd(6, '0')}%
      </span>
    </div>
  )
}
