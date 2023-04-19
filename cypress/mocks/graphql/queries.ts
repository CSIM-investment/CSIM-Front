import { cryptos, detailedCrypto, fakeArticles, fakeUser } from '../data'
import type {
  AccountQuery,
  GetArticlesQuery,
  GetCryptoQuery,
  GetCryptosListQuery,
} from '../../../src/common/generated/graphql'

export const Queries: MockedQuery = {
  Account: {
    account: fakeUser,
  },
  GetCryptosList: {
    cryptos: {
      count: 3,
      datas: cryptos,
    },
  },
  GetCrypto: {
    cryptos: {
      datas: [detailedCrypto],
    },
  },
  GetArticles: {
    articles: fakeArticles(),
  },
}

export interface MockedQuery {
  Account: AccountQuery
  GetCryptosList: GetCryptosListQuery
  GetArticles: GetArticlesQuery
  GetCrypto: GetCryptoQuery
}
