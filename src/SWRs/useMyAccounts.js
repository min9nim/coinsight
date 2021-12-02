import useSWR from 'swr'
import axios from 'axios'
import { useLoading } from 'react-hook-loading'

export default ({ accessKey, secretKey }) => {
  const [, setLoading] = useLoading()
  const { data } = useSWR(
    accessKey.length !== 40 || secretKey.length !== 40
      ? null
      : [accessKey, secretKey],
    async (accessKey, secretKey) =>
    {
      setLoading(true)
      try{
        const result = await axios
          .get(`https://buy-btc.vercel.app/api/my-accounts`, {
            params: { accessKey, secretKey },
          })
          .then(result => result.data.filter(item => item.currency !== 'KRW'))
        return result
      }finally {
        setLoading(false)
      }
    },
    {
      onError(err, key, config){
        alert(err.message)
        localStorage.clear()
        // window.location.reload()
      }
    }
  )
  return { data }
}
