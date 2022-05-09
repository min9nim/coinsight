import useSWR from 'swr'
import axios from 'axios'

export default function useTradePrice(market, unit){
  const { data } = useSWR([market, unit], market =>
    axios.get(
      `https://api.upbit.com/v1/candles/days?market=${unit ?? 'KRW'}-${market}&count=1`,
    ).then(result => result.data[0]),
    {
      refreshInterval: 500
    }
  )
  return {data}
}
