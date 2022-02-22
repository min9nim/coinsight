import useSWR from 'swr'
import axios from 'axios'

export default function useFearGreedIndex(){
  const { data } = useSWR('fearGreedIndex', () =>
    axios.get(
      `https://buy-btc.vercel.app/api/fear-greed-index?days=1`,
    ).then(result => result.data),
    {
      refreshInterval: 500
    }
  )
  return {data}
}
