import moment from 'moment'
import useFearGreedIndex from '../SWRs/useFearGreedIndex'
import { useSearchParams } from 'react-router-dom'
import { strMatched, toComma } from '@madup-inc/utils'
import UAParser from 'ua-parser-js'
import CaptureScreen from './CaptureScreen'

export default function Header1({
    market,
    setMarket,
    currencies,
    currentPrice,
    avgPrice,
    krw,
    krwusd,
    unit,
}) {
    const profitPercent =
        Math.floor(((currentPrice - avgPrice) / avgPrice) * 10000) / 100

    const { data } = useFearGreedIndex()
    const fgIndex = data?.data.datasets[0].data[0]

    const [searchParam, setSearchParam] = useSearchParams()

    const xScale = searchParam.get('xScale') || 'index'
    const theme = searchParam.get('theme') || 'dark'

    const [left, right] = String(profitPercent).split('.')

    const cash = Number(krw.locked) + Number(krw.balance)

    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <select
                    value={market}
                    name="market"
                    onChange={e => {
                        setMarket(e.target.value)
                    }}
                >
                    {currencies
                        .filter(
                            item =>
                                !strMatched(
                                    ['KRW', 'VTHO', 'SOLO'],
                                    item.currency,
                                ),
                        )
                        .map(item => {
                            return (
                                <option
                                    key={item.currency}
                                    value={item.currency}
                                >
                                    {/*{item.unit_currency + '-' + item.currency}*/}
                                    {item.currency}
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
                        color:
                            theme === 'dark'
                                ? profitPercent > 0
                                    ? 'rgb(248 50 39)'
                                    : 'rgb(139 171 246)'
                                : profitPercent > 0
                                ? '#C41E3A'
                                : '#5D3FD3',
                        marginLeft: 10,
                        fontWeight: 'bold',
                    }}
                >
                    {profitPercent > 0 && '+'}
                    {right ? left + '.' + right.padEnd(2, '0') : left}%
                </span>
            </div>
            <div>
                <select
                    value={unit}
                    name="unit"
                    onChange={e => {
                        setSearchParam({ theme, unit: e.target.value, xScale })
                    }}
                    style={{ marginLeft: 2 }}
                >
                    <option value="KRW">krw</option>
                    <option value="USDT">usdt</option>
                </select>
                <select
                    value={xScale}
                    name="xScale"
                    onChange={e => {
                        setSearchParam({ theme, unit, xScale: e.target.value })
                    }}
                    style={{ marginLeft: 2 }}
                >
                    <option value="index">index</option>
                    <option value="date">date</option>
                </select>
                <select
                    value={theme}
                    name="theme"
                    onChange={e => {
                        setSearchParam({ theme: e.target.value, unit, xScale })
                    }}
                    style={{ marginLeft: 2 }}
                >
                    <option value="dark">dark</option>
                    <option value="light">light</option>
                </select>
            </div>
            <div>
                *{' '}
                {toComma(
                    Math.floor(unit === 'KRW' ? cash : cash / krwusd.basePrice),
                )}{' '}
                -{' '}
                {toComma(
                    Math.floor(
                        unit === 'KRW'
                            ? krw.locked
                            : krw.locked / krwusd.basePrice,
                    ),
                )}{' '}
                ={' '}
                {toComma(
                    Math.floor(
                        unit === 'KRW'
                            ? krw.balance
                            : krw.balance / krwusd.basePrice,
                    ),
                )}
                {unit === 'KRW' ? '₩' : '$'}
            </div>

            <div style={{ margin: '3px 0', display: 'flex', alignItems: 'center' }}>
                <a href="https://alternative.me/crypto/fear-and-greed-index/">
                    Fear&Greed: {fgIndex}
                </a>
                <span style={{ margin: '0 10px' }}>
                    {moment().format('YY/MM/DD HH:mm')}
                </span>
                {
                  new UAParser().getDevice().type !== 'mobile' && <CaptureScreen/>
                }
            </div>

        </div>
    )
}
