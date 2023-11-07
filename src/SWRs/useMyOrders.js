import useSWR from 'swr'
import axios from 'axios'
import { useLoading } from 'react-hook-loading'
import { toast } from 'react-hot-toast'
import { always, identity } from 'ramda'

export default function useMyOrders({ market, accessKey, secretKey }) {
    const [, setLoading] = useLoading()
    const { data } = useSWR(
        !market ||
            accessKey.length !== 40 ||
            secretKey.length !== 40 ||
            accessKey === secretKey
            ? null
            : [market, accessKey, secretKey],
        async (market, accessKey, secretKey) => {
            setLoading(true)
            try {
                // const result = []
                // for (let page = 1, res; ; page++) {
                //   res = await req({ accessKey, secretKey, market, page })
                //   result.push(...res)
                //   if(res.length < 100){
                //     break
                //   }
                // }
                // return result

                const result = await Promise.all([
                    req({ accessKey, secretKey, market, page: 1 }),
                    req({ accessKey, secretKey, market, page: 2 }),
                    req({ accessKey, secretKey, market, page: 3 }),
                    req({ accessKey, secretKey, market, page: 4 }),
                    req({ accessKey, secretKey, market, page: 5 }),
                    req({ accessKey, secretKey, market, page: 6 }),
                    req({ accessKey, secretKey, market, page: 7 }),
                    req({ accessKey, secretKey, market, page: 8 }),
                ])
                return result.flatMap(identity)
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
