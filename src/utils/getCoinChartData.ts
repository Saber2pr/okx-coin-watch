import axios from 'axios'

const resolveName = (name: string) => {
  const ws = name.split(' ')
  return [
    ws[0][0].toUpperCase() + ws[0].slice(1),
    ...ws.slice(1).map(w => w.toLowerCase()),
  ].join('-')
}

export const getCoinChartData = async (name: string) => {
  name = resolveName(name)
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
