import * as cheerio from 'cheerio'

export type Coin = {
  name: string
  coin: string
  priceBtc: string
  vol24Btc: string
  price: string
  vol24: string
}

export const queryCoinList = (html: string) => {
  const $ = cheerio.load(html)
  const result: Coin[] = []
  $('#market-table>tbody')
    .children('tr')
    .map((i, tr) => {
      const [_, name, coin, priceBtc, vol24Btc, price, vol24] = $(tr)
        .children('td')
        .map((i, td) =>
          $(td)
            .text()
            .trim()
            .split('\n')
            .map(s => s.trim())
            .join(' ')
        )
      result.push({
        name,
        coin,
        priceBtc,
        vol24Btc,
        price,
        vol24,
      })
    })
  return result
}
