import useSWR from 'swr'
import axios from 'axios'

export default function useTradePrice(market){
  const { data } = useSWR(market, market =>
    axios.get(
      `https://api.upbit.com/v1/candles/days?market=KRW-${market}&count=1`,
    ).then(result => result.data[0]),
    {
      refreshInterval: 500
    }
  )
  return {data}
}
