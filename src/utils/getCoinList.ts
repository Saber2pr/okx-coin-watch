import axios from 'axios'
import { queryCoinList } from './queryCoinList'

export const getCoinList = async () => {
  const res = await axios.get(`https://www.worldcoinindex.com/exchange/okex`)
  return queryCoinList(res.data)
}
