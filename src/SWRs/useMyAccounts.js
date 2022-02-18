import useSWR from 'swr'
import axios from 'axios'
import { useLoading } from 'react-hook-loading'
import { toast } from 'react-hot-toast'
import { strMatched } from '@madup-inc/utils'

export default function useMyAccounts({ accessKey, secretKey }) {
  const [, setLoading] = useLoading()
  const { data } = useSWR(
    accessKey.length !== 40 ||
      secretKey.length !== 40 ||
      accessKey === secretKey
      ? null
      : [accessKey, secretKey],
    async (accessKey, secretKey) => {
      setLoading(true)
      try {
        const result = await axios
          .get(process.env.REACT_APP_API_SERVER + `/my-accounts`, {
            params: { accessKey, secretKey },
          })
          .then(result =>
            result.data.filter(
              item => !strMatched(['KRW', 'VTHO', 'SOLO'], item.currency),
            ),
          )
        return result
      } finally {
        setLoading(false)
      }
    },
    {
      onError(err, key, config) {
        toast.error(err.message, { position: 'top-right' })
        localStorage.clear()
        window.location.assign('/')
      },
    },
  )
  return { data }
}
