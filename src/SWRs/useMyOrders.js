import useSWR from 'swr'
import axios from 'axios'
import { useLoading } from 'react-hook-loading'
import { toast } from 'react-toastify'

export default function useMyOrders({ market, accessKey, secretKey }) {
  const [, setLoading] = useLoading()
  const { data } = useSWR(
    !market || accessKey.length !== 40 || secretKey.length !== 40
      ? null
      : [market, accessKey, secretKey],
    async (market, accessKey, secretKey) => {
      setLoading(true)
      try {
        const result = []
        for (let page = 1, res; ; page++) {
          res = await req({ accessKey, secretKey, market, page })
          result.push(...res)
          if(res.length < 100){
            break
          }
        }
        return result
      } finally {
        setLoading(false)
      }
    },
    {
      onError(err, key, config) {
        toast(err.message)
        localStorage.clear()
        // window.location.reload()
      },
    },
  )
  return { data }
}

function req({ accessKey, secretKey, market, page }) {
  return axios
    .get(process.env.REACT_APP_API_SERVER + `/my-orders`, {
      params: {
        accessKey,
        secretKey,
        // state: 'cancel',
        orderBy: 'asc',
        market: 'KRW-' + market,
        page,
      },
    })
    .then(result => result.data)
}
