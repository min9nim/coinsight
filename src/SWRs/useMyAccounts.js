import useSWR from 'swr'
import axios from 'axios'

export default ({ accessKey, secretKey }) => {
  const { data } = useSWR(
    accessKey.length !== 40 || secretKey.length !== 40
      ? null
      : [accessKey, secretKey],
    (accessKey, secretKey) =>
      axios
        .get(`https://buy-btc.vercel.app/api/my-accounts`, {
          params: { accessKey, secretKey },
        })
        .then(result => result.data.filter(item => item.currency !== 'KRW')),
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
