import useSWR from 'swr'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { strMatched } from '@madup-inc/utils'

export default function useMyAccounts({ accessKey, secretKey }) {
  const { data } = useSWR(
    accessKey.length !== 40 ||
      secretKey.length !== 40 ||
      accessKey === secretKey
      ? null
      : [accessKey, secretKey],
    async (accessKey, secretKey) => {
      try {
        const result = await axios
          .get(process.env.REACT_APP_API_SERVER + `/my-accounts`, {
            params: { accessKey, secretKey },
          })
          .then(result =>
            result.data,
          )
        return result
      } finally {
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
