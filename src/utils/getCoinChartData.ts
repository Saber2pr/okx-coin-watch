import axios from 'axios'

export const getCoinChartData = async (name: string) => {
  const res = await axios.post(
    `https://www.worldcoinindex.com/home/GetGraphdatatesttest`,
    `marketid=${name}&days=1`,
    {
      headers: {
        'accept-language': 'zh-CN,zh;q=0.9',
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        origin: 'https://www.worldcoinindex.com',
        pragma: 'no-cache',
        referer: `https://www.worldcoinindex.com/zh/%E7%A1%AC%E5%B8%81/${name.toLowerCase()}`,
        'x-requested-with': 'XMLHttpRequest',
      },
    }
  )

  return res.data
}
