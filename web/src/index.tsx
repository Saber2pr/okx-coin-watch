import { callService } from '@saber2pr/vscode-webview'
import { useEcharts } from '@/hooks/useEcharts'
import type { Services } from '../../src/api/type'
import React, { useState } from 'react'
import { APP_ARGS } from './utils/getArgs'
import { getArray } from './utils/kit'
import { Skeleton, Spin } from 'antd'
import ReactDOM from 'react-dom'

export interface AppProps {}

export const App: React.FC<AppProps> = ({}) => {
  const [dataLoading, setDataLoading] = useState(false)
  const [ref, loading] = useEcharts(async (chart) => {
    if (!APP_ARGS.coin) {
      return
    }
    setDataLoading(true)
    const data = await callService<Services, 'getData'>('getData', {
      name: APP_ARGS.coin,
    })
    setDataLoading(false)
    const option = {
      title: {
        text: data.label,
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: getArray<any>(data?.data).map((item) => item.date),
      },
      yAxis: {
        type: 'value',
        min: 'dataMin',
        max: 'dataMax',
      },
      series: [
        {
          data: getArray<any>(data?.data).map((item) => Number(item.value)),
          type: 'line',
        },
      ],
    }
    chart.setOption(option)
  })

  return (
    <Spin spinning={loading || dataLoading}>
      <div
        style={{ width: '90vw', height: '90vh', margin: '5vh auto' }}
        ref={ref}
      ></div>
    </Spin>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))
