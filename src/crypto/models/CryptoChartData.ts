import moment from 'moment'
import type Moment from 'moment'
import { CoinGecko } from '~/crypto/services/CoinGeckoApi'
import type { CryptoCurrencyMarket } from '~/common/generated/graphql'

export namespace CryptoChart {
  interface LabelsParams {
    interval: number
    unit: Moment.unitOfTime.DurationConstructor
    repeat: number
    format: string
  }

  export type Type = 'price' | 'market_cap' | 'total_volume'
  export type Period = CoinGecko.Period

  export interface LineStyleData {
    labels: string[]
    datasets: unknown[]
  }

  export class Data {
    static readonly chartTypes: Type[] = ['price', 'market_cap', 'total_volume']
    static readonly periods: Period[] = CoinGecko.Api.periods

    readonly _labelsParams: Map<Period, LabelsParams> = new Map([
      [Data.periods[0], { interval: 10, unit: 'minutes', repeat: 6, format: 'hh:mm' }],
      [Data.periods[1], { interval: 2, unit: 'hours', repeat: 12, format: 'LT' }],
      [Data.periods[2], { interval: 1, unit: 'day', repeat: 7, format: 'dddd' }],
      [Data.periods[3], { interval: 5, unit: 'days', repeat: 6, format: 'L' }],
      [Data.periods[4], { interval: 2, unit: 'months', repeat: 6, format: 'MMM' }],
    ])

    private _crypto: CryptoCurrencyMarket

    private _marketChartDatas: Map<Period, CoinGecko.MarketChartData> = new Map()

    constructor(crypto: CryptoCurrencyMarket) {
      this._crypto = crypto
    }

    async marketChartData(period: Period): Promise<CoinGecko.MarketChartData> {
      const marketChatData = this._marketChartDatas.get(period)

      if (marketChatData)
        return marketChatData

      const coinGeckoApi = new CoinGecko.Api()
      const marketData = await coinGeckoApi.getMarketData(this._crypto.id, 'usd', period)
      this._marketChartDatas.set(period, marketData)

      return marketData
    }

    labels(period: Period): string[] {
      const today = moment()
      const labelsParam = this._labelsParams.get(period)

      if (!labelsParam)
        throw new Error('labels params not defined')

      const labelsDates: Moment.Moment[] = new Array(labelsParam.repeat).fill(null)

      const labels = labelsDates.reduce((labels, currentLabel, index) => {
        if (index === 0)
          labels.push(today)
        else
          labels.push(labels[index - 1].clone().subtract(labelsParam.interval, labelsParam.unit))

        return labels
      }, new Array<Moment.Moment>())

      return labels.reverse().map(label => label.format(labelsParam.format))
    }

    dataSets(cryptoMarketData: CoinGecko.MarketChartData): Record<Type, Object> {
      return {
        market_cap: {
          fill: true,
          data: cryptoMarketData.market_caps,
          borderColor: '#4C51BF',
          backgroundColor: 'rgba(76, 81, 255, 0.2)',
          cubicInterpolationMode: 'monotone',
        },
        price: {
          fill: true,
          data: cryptoMarketData.prices,
          borderColor: '#16731f',
          backgroundColor: 'rgba(22, 115, 31, 0.2)',
          cubicInterpolationMode: 'monotone',
        },
        total_volume: {
          fill: true,
          data: cryptoMarketData.total_volumes,
          borderColor: '#830593',
          backgroundColor: 'rgba(131, 5, 147, 0.2)',
          cubicInterpolationMode: 'monotone',
        },
      }
    }

    async lineStyleData(type: Type, period: Period): Promise<LineStyleData> {
      const marketChartData = await this.marketChartData(period)

      return {
        labels: this.labels(period),
        datasets: [this.dataSets(marketChartData)[type]],
      }
    }
  }
}
