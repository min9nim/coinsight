import useSWR from 'swr'
import axios from 'axios'
import { useLoading } from 'react-hook-loading'

export default function useMyAccounts({ accessKey, secretKey }){
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
          .get(process.env.REACT_APP_API_SERVER  + `/my-accounts`, {
            params: { accessKey, secretKey },
          })
          .then(result => result.data.filter(item => item.currency !== 'KRW' && item.currency !== 'VTHO'))
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
