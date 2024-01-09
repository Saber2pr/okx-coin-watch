import { createServiceHandler } from '@saber2pr/vscode-webview'

import { Services } from './type'
import { getCoinChartData } from '../utils/getCoinChartData'

const handleServiceMessage = createServiceHandler<Services>({
  async getData({ name }) {
    return getCoinChartData(name)
  },
})

export { handleServiceMessage }
