import React, { useEffect, useState } from 'react'
import { VictoryChart, VictoryScatter } from 'victory'
import axios from 'axios'
import { parseSearchParams } from '@madup-inc/utils'
import moment from 'moment'

// const ScatterPoint = ({ x, y, datum }) => {
//     const [selected, setSelected] = React.useState(false);
//     const [hovered, setHovered] = React.useState(false);
//
//     return (
//         <circle
//             cx={x}
//             cy={y}
//             r={datum.volume}
//             stroke={hovered ? "purple" : "white"}
//             strokeWidth={2}
//             fill={selected ? "cyan" : "magenta"}
//             onClick={() => setSelected(!selected)}
//             onMouseEnter={() => setHovered(true)}
//             onMouseLeave={() => setHovered(false)}
//         />
//     );
// };

export default () => {
  const [data, setData] = useState([])
  const { accessKey, secretKey } = parseSearchParams(window.location.search)

  useEffect(async () => {
    const result = await axios.get(
      `https://buy-btc.vercel.app/api/my-orders?accessKey=${accessKey}&secretKey=${secretKey}`,
    )
    console.log('xxx', result.data)

    setData(
      result.data
        .slice(0, 10)
        .map(item => ({
          x: moment(item.created_at).format('MM/DD, hh:mm'),
          y: Number(item.price),
          amount: Number(item.volume * 100000),
        })),
    )
  }, [])

  console.log('data', data)
  return (
    <VictoryChart>
      <VictoryScatter
        style={{ data: { fill: '#c43a31' } }}
        bubbleProperty="amount"
        maxBubbleSize={25}
        minBubbleSize={5}
        data={data}
      />
    </VictoryChart>
  )
}
