import type { AxiosInstance } from 'axios'
import axios from 'axios'
import moment from 'moment'
import type Moment from 'moment/moment'

export namespace CoinGecko {
  export interface MarketChartData {
    prices: number[][]
    market_caps: number[][]
    total_volumes: number[][]
  }

  export type Period = '1H' | '24H' | '1W' | '1M' | '1Y'

  export interface RangeParams {
    dataSize: number
    from: {
      interval: number
      unit: Moment.unitOfTime.DurationConstructor
    }
  }

  export class Api {
    private readonly baseUrl = 'https://api.coingecko.com/api/v3'
    private client: AxiosInstance

    static readonly periods: Period[] = ['1H', '24H', '1W', '1M', '1Y']

    private readonly rangesParams: Map<Period, RangeParams> = new Map([
      [Api.periods[0], { dataSize: 6, from: { interval: 1, unit: 'hour' } }],
      [Api.periods[1], { dataSize: 12, from: { interval: 1, unit: 'day' } }],
      [Api.periods[2], { dataSize: 7, from: { interval: 1, unit: 'week' } }],
      [Api.periods[3], { dataSize: 6, from: { interval: 1, unit: 'month' } }],
      [Api.periods[4], { dataSize: 6, from: { interval: 1, unit: 'year' } }],
    ])

    constructor() {
      this.client = axios.create({
        baseURL: this.baseUrl,
      })
    }

    getRangeParams(occurrence: Period) {
      const rangeParams = this.rangesParams.get(occurrence)

      if (!rangeParams)
        throw new Error('range params is not defined')

      return rangeParams
    }

    async getMarketData(cryptoName: string, currency: 'usd' | 'eur', period: Period): Promise<MarketChartData> {
      const rangeParams = this.getRangeParams(period)
      const queryParams = {
        currency,
        ...this.getTimestampRange(rangeParams),
      }

      const { data } = await this.client.get(`/coins/${cryptoName}/market_chart/range`, {
        params: {
          vs_currency: currency,
          ...queryParams,
        },
      })

      const rangeDataSize = new Array(rangeParams.dataSize).fill('')

      const market: MarketChartData = {
        prices: [],
        market_caps: [],
        total_volumes: [],
      }

      const increment = Math.floor(data.prices.length / rangeParams.dataSize)
      rangeDataSize.forEach((_, index) => {
        market.prices.push(data.prices[increment * index + 1])
        market.market_caps.push(data.market_caps[increment * index + 1])
        market.total_volumes.push(data.total_volumes[increment * index + 1])
      })

      return market
    }

    private getTimestampRange(rangeParams: RangeParams) {
      const fromDate = moment()

      return {
        from: fromDate.subtract(rangeParams.from.interval, rangeParams.from.unit).unix(),
        to: moment().unix(),
      }
    }

    async getCryptoPrice(cryptoName: string, currency: 'usd' | 'eur'): Promise<number> {
      const { data } = await this.client.get(`/coins/${cryptoName}/market_chart`, {
        params: {
          vs_currency: currency,
          days: 1,
          interval: 'daily',
        },
      })

      return data.prices[0][1]
    }
  }
}
