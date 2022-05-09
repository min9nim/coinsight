import useSWR from 'swr'
import axios from 'axios'

export default function useKRWUSD(){
  const { data } = useSWR('krwusd', () =>
      axios.get(
        `https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD`,
      ).then(result => result.data[0]),
    {
      refreshInterval: 0
    }
  )
  return {data}
}
