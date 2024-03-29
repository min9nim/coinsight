import { toComma } from '@madup-inc/utils'

export default function Details({
    coin,
    currentPrice,
    avgPrice,
    profit,
    unit,
    krw,
    krwusd,
}) {
    const unitStr = unit === 'KRW' ? '₩' : '$'
    const cash = Number(krw.locked) + Number(krw.balance)

    const texts = [
        `- 보유수량: ${coin.balance}`,
        `- 평가금액: ${
            unitStr + toComma(Math.floor(coin.balance * currentPrice))
        }`,
        `- 매수금액: ${unitStr + toComma(Math.floor(coin.balance * avgPrice))}`,
        `- 평가손익: ${unitStr + toComma(profit)}`,
        `- 현금잔액: ${
            unitStr +
            toComma(
                Math.floor(
                    unit === 'KRW'
                        ? krw.balance
                        : krw.balance / krwusd.basePrice,
                ),
            )
        } (${toComma(
            Math.floor(unit === 'KRW' ? cash : cash / krwusd.basePrice),
        )} - ${toComma(
            Math.floor(
                unit === 'KRW' ? krw.locked : krw.locked / krwusd.basePrice,
            ),
        )})`,
    ]

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
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
