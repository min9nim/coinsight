import axios from 'axios'
import { identity } from 'ramda'
import { toast } from 'react-hot-toast'
import useSWR from 'swr'

export default function useMyOrders({ market, accessKey, secretKey }) {
    const { data } = useSWR(
        !market ||
            accessKey.length !== 40 ||
            secretKey.length !== 40 ||
            accessKey === secretKey
            ? null
            : [market, accessKey, secretKey],
        async (market, accessKey, secretKey) => {
          const result = await Promise.all([
            req({ accessKey, secretKey, market, page: 1 }),
            req({ accessKey, secretKey, market, page: 2 }),
            req({ accessKey, secretKey, market, page: 3 }),
            req({ accessKey, secretKey, market, page: 4 }),
            req({ accessKey, secretKey, market, page: 5 }),
            req({ accessKey, secretKey, market, page: 6 }),
            req({ accessKey, secretKey, market, page: 7 }),
            req({ accessKey, secretKey, market, page: 8 }),
            req({ accessKey, secretKey, market, page: 9 }),
            req({ accessKey, secretKey, market, page: 10 }),
            req({ accessKey, secretKey, market, page: 11 }),
            req({ accessKey, secretKey, market, page: 12 }),
            req({ accessKey, secretKey, market, page: 13 }),
            req({ accessKey, secretKey, market, page: 14 }),
            req({ accessKey, secretKey, market, page: 15 }),
          ])
          return result.flatMap(identity)
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
