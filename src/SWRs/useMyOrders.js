import useSWR from 'swr'
import axios from 'axios'
import { useLoading } from 'react-hook-loading'

export default ({ market, accessKey, secretKey }) => {
  const [, setLoading] = useLoading()
  const { data } = useSWR(
    !market || accessKey.length !== 40 || secretKey.length !== 40
      ? null
      : [market, accessKey, secretKey],
    async (market, accessKey, secretKey) => {
      setLoading(true)
      try {
        const result = await axios
          .get(`https://buy-btc.vercel.app/api/my-orders`, {
            params: {
              accessKey,
              secretKey,
              orderBy: 'asc',
              market: 'KRW-' + market,
            },
          })
          .then(result => result.data)
        return result
      } finally {
        setLoading(false)
      }
    },
    {
      onError(err, key, config) {
        alert(err.message)
        localStorage.clear()
        // window.location.reload()
      },
    },
  )
  return { data }
}
