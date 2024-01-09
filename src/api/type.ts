import { Pair } from '@saber2pr/vscode-webview'

type DataType = {
  data: {
    date: string
    value: number
    volume: number
  }[]
  label: string
  primaryname: string
  minPeriod: string
}

// service type define
export type Services = {
  getData: Pair<{ name: string }, DataType>
}
