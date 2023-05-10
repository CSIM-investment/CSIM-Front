import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Article = {
  __typename?: 'Article';
  author?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  id: Scalars['ID'];
  picture?: Maybe<Scalars['String']>;
  publishedDate: Scalars['DateTime'];
  source?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  url: Scalars['String'];
};

export type ArticleFilterInput = {
  pagination?: InputMaybe<PaginationInput>;
  search?: InputMaybe<Scalars['String']>;
  symbol?: InputMaybe<Scalars['String']>;
};

export enum ArticleOrderBy {
  PublishedDate = 'publishedDate'
}

export type ArticleOrderInput = {
  direction: OrderDirection;
  name: ArticleOrderBy;
};

export type ArticlesInput = {
  filterBy?: InputMaybe<ArticleFilterInput>;
  orderBy?: InputMaybe<ArticleOrderInput>;
};

export type CreateUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type CryptoCurrencyMarket = {
  __typename?: 'CryptoCurrencyMarket';
  ath: Scalars['Float'];
  ath_change_percentage: Scalars['Float'];
  ath_date: Scalars['DateTime'];
  atl: Scalars['Float'];
  atl_change_percentage: Scalars['Float'];
  atl_date: Scalars['DateTime'];
  circulating_supply: Scalars['Float'];
  current_price: Scalars['Float'];
  fully_diluted_valuation?: Maybe<Scalars['Float']>;
  high_24h: Scalars['Float'];
  id: Scalars['ID'];
  image: Scalars['String'];
  last_updated: Scalars['DateTime'];
  low_24h: Scalars['Float'];
  market_cap: Scalars['Float'];
  market_cap_change_24h: Scalars['Float'];
  market_cap_change_percentage_24h: Scalars['Float'];
  market_cap_rank: Scalars['Float'];
  max_supply?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  price_change_24h: Scalars['Float'];
  price_change_percentage_24h: Scalars['Float'];
  roi?: Maybe<Scalars['String']>;
  symbol: Scalars['String'];
  total_supply?: Maybe<Scalars['Float']>;
  total_volume: Scalars['Float'];
};

export type CryptoCurrencyMarketPaginatedResults = {
  __typename?: 'CryptoCurrencyMarketPaginatedResults';
  count: Scalars['Float'];
  datas: Array<CryptoCurrencyMarket>;
};

export type CryptoFilterInput = {
  max_cap?: InputMaybe<Scalars['Float']>;
  max_current_price?: InputMaybe<Scalars['Float']>;
  min_cap?: InputMaybe<Scalars['Float']>;
  min_current_price?: InputMaybe<Scalars['Float']>;
  pagination?: InputMaybe<PaginationInput>;
  search?: InputMaybe<CryptoMarketSearchInput>;
  symbol?: InputMaybe<Scalars['String']>;
};

export type CryptoMarketSearchInput = {
  ath?: InputMaybe<Scalars['Float']>;
  ath_change_percentage?: InputMaybe<Scalars['Float']>;
  ath_date?: InputMaybe<Scalars['DateTime']>;
  atl?: InputMaybe<Scalars['Float']>;
  atl_change_percentage?: InputMaybe<Scalars['Float']>;
  atl_date?: InputMaybe<Scalars['DateTime']>;
  circulating_supply?: InputMaybe<Scalars['Float']>;
  current_price?: InputMaybe<Scalars['Float']>;
  fully_diluted_valuation?: InputMaybe<Scalars['Float']>;
  high_24h?: InputMaybe<Scalars['Float']>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  last_updated?: InputMaybe<Scalars['DateTime']>;
  low_24h?: InputMaybe<Scalars['Float']>;
  market_cap?: InputMaybe<Scalars['Float']>;
  market_cap_change_24h?: InputMaybe<Scalars['Float']>;
  market_cap_change_percentage_24h?: InputMaybe<Scalars['Float']>;
  market_cap_rank?: InputMaybe<Scalars['Float']>;
  max_supply?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  price_change_24h?: InputMaybe<Scalars['Float']>;
  price_change_percentage_24h?: InputMaybe<Scalars['Float']>;
  roi?: InputMaybe<Scalars['String']>;
  symbol?: InputMaybe<Scalars['String']>;
  total_supply?: InputMaybe<Scalars['Float']>;
  total_volume?: InputMaybe<Scalars['Float']>;
};

export enum CryptoOrderBy {
  CurrentPrice = 'current_price',
  High_24h = 'high_24h',
  Low_24 = 'low_24',
  MarketCap = 'market_cap'
}

export type CryptoOrderInput = {
  direction: OrderDirection;
  name: CryptoOrderBy;
};

export type CryptoSearchInput = {
  filterBy?: InputMaybe<CryptoFilterInput>;
  orderBy?: InputMaybe<CryptoOrderInput>;
};

export type InvestmentEntity = {
  __typename?: 'InvestmentEntity';
  amount: Scalars['Float'];
  baseCurrency?: Maybe<CryptoCurrencyMarket>;
  creationDate: Scalars['DateTime'];
  dateOfInvestment: Scalars['DateTime'];
  id: Scalars['ID'];
  origin: Scalars['String'];
  quantity: Scalars['Float'];
  quoteCurrency?: Maybe<CryptoCurrencyMarket>;
  status: Scalars['String'];
  type: Scalars['String'];
  valueBaseCurrency: Scalars['Float'];
  valueQuoteCurrency: Scalars['Float'];
};

export type InvestmentReportCreate = {
  fromDate?: InputMaybe<Scalars['DateTime']>;
  toDate?: InputMaybe<Scalars['DateTime']>;
};

export type InvestmentReportsOrderInput = {
  direction?: InputMaybe<OrderDirection>;
  name?: InputMaybe<ArticleOrderBy>;
};

export type InvestmentsReportsEntity = {
  __typename?: 'InvestmentsReportsEntity';
  fromDate: Scalars['DateTime'];
  id: Scalars['ID'];
  mensualReport: Scalars['Boolean'];
  name: Scalars['String'];
  reportUri: Scalars['String'];
  toDate: Scalars['DateTime'];
  user: User;
};

export type InvestmentsReportsFilterInput = {
  pagination?: InputMaybe<PaginationInput>;
  search?: InputMaybe<Scalars['String']>;
};

export type InvestmentsReportsInput = {
  filterBy?: InputMaybe<InvestmentsReportsFilterInput>;
  orderBy?: InputMaybe<InvestmentReportsOrderInput>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
  user: User;
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  confirmEmail: LoginResponse;
  createCryptoMarket: Scalars['String'];
  createInvestmentReport: InvestmentsReportsEntity;
  importInvestments: Array<InvestmentEntity>;
  login: LoginResponse;
  refreshTokens: LoginResponse;
  register: User;
  resetPassword: LoginResponse;
  sendRegisterConfirmation: User;
  sendResetPasswordCode: Scalars['String'];
  toggleFavoriteCrypto: User;
  updateAccount: User;
  updateArticles: Scalars['String'];
};


export type MutationConfirmEmailArgs = {
  email: Scalars['String'];
  emailCode: Scalars['Float'];
};


export type MutationCreateInvestmentReportArgs = {
  options: InvestmentReportCreate;
};


export type MutationImportInvestmentsArgs = {
  link: Scalars['String'];
};


export type MutationLoginArgs = {
  loginUserInput: LoginUserInput;
};


export type MutationRefreshTokensArgs = {
  refreshToken: Scalars['String'];
};


export type MutationRegisterArgs = {
  createUserInput: CreateUserInput;
};


export type MutationResetPasswordArgs = {
  email: Scalars['String'];
  emailCode: Scalars['Float'];
  newPassword: Scalars['String'];
};


export type MutationSendRegisterConfirmationArgs = {
  email: Scalars['String'];
};


export type MutationSendResetPasswordCodeArgs = {
  email: Scalars['String'];
};


export type MutationToggleFavoriteCryptoArgs = {
  input: ToggleFavoriteInput;
};


export type MutationUpdateAccountArgs = {
  updateUserInput: UpdateUserInput;
};

export enum OrderDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type PaginationInput = {
  end: Scalars['Int'];
  start: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  account: User;
  articles: Array<Article>;
  cryptos: CryptoCurrencyMarketPaginatedResults;
  reports: Array<InvestmentsReportsEntity>;
  sold: Scalars['Float'];
};


export type QueryArticlesArgs = {
  options: ArticlesInput;
};


export type QueryCryptosArgs = {
  options: CryptoSearchInput;
};


export type QueryReportsArgs = {
  options: InvestmentsReportsInput;
};

export type ToggleFavoriteInput = {
  cryptoId: Scalars['String'];
  hadToFavorite: Scalars['Boolean'];
};

export type UpdateUserInput = {
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  favoritesCrypto: Array<CryptoCurrencyMarket>;
  firstName: Scalars['String'];
  id: Scalars['ID'];
  investments: Array<InvestmentEntity>;
  investmentsReports: Array<InvestmentsReportsEntity>;
  lastName: Scalars['String'];
  role: UserRoles;
  sold: UserSold;
  status: UserStatus;
};

export enum UserRoles {
  Admin = 'admin',
  User = 'user',
  Validator = 'validator',
  Visitor = 'visitor'
}

export type UserSold = {
  __typename?: 'UserSold';
  currentSold: Scalars['Float'];
  lastInvestments: Array<InvestmentEntity>;
  lastSold: Scalars['Float'];
  latestBigInvestments: Array<InvestmentEntity>;
  newSold: Scalars['Float'];
  soldRatio: Scalars['Float'];
  topInvestments: Array<InvestmentEntity>;
};

export enum UserStatus {
  IsActive = 'isActive',
  IsPending = 'isPending'
}

export type GetArticlesQueryVariables = Exact<{
  search: Scalars['String'];
}>;


export type GetArticlesQuery = { __typename?: 'Query', articles: Array<{ __typename?: 'Article', author?: string | null, description: string, title: string, url: string, publishedDate: any, source?: string | null, symbol?: string | null, picture?: string | null }> };

export type UserSessionFragment = { __typename?: 'User', status: UserStatus, id: string, role: UserRoles, email: string, firstName: string, lastName: string, sold: { __typename?: 'UserSold', currentSold: number, soldRatio: number, lastSold: number, newSold: number, latestBigInvestments: Array<{ __typename?: 'InvestmentEntity', type: string, creationDate: any, dateOfInvestment: any, valueQuoteCurrency: number, valueBaseCurrency: number, quoteCurrency?: { __typename?: 'CryptoCurrencyMarket', symbol: string, image: string } | null, baseCurrency?: { __typename?: 'CryptoCurrencyMarket', symbol: string, image: string } | null }>, topInvestments: Array<{ __typename?: 'InvestmentEntity', id: string, type: string, quantity: number, quoteCurrency?: { __typename?: 'CryptoCurrencyMarket', symbol: string, image: string, name: string } | null }>, lastInvestments: Array<{ __typename?: 'InvestmentEntity', type: string, creationDate: any, dateOfInvestment: any, valueQuoteCurrency: number, valueBaseCurrency: number, quoteCurrency?: { __typename?: 'CryptoCurrencyMarket', symbol: string } | null, baseCurrency?: { __typename?: 'CryptoCurrencyMarket', symbol: string } | null }> }, favoritesCrypto: Array<{ __typename?: 'CryptoCurrencyMarket', id: string, name: string, image: string, symbol: string, current_price: number, market_cap: number, price_change_percentage_24h: number }> };

export type ConfirmEmailMutationVariables = Exact<{
  emailCode: Scalars['Float'];
  email: Scalars['String'];
}>;


export type ConfirmEmailMutation = { __typename?: 'Mutation', confirmEmail: { __typename?: 'LoginResponse', accessToken: string, refreshToken: string, user: { __typename?: 'User', status: UserStatus, id: string, role: UserRoles, email: string, firstName: string, lastName: string, sold: { __typename?: 'UserSold', currentSold: number, soldRatio: number, lastSold: number, newSold: number, latestBigInvestments: Array<{ __typename?: 'InvestmentEntity', type: string, creationDate: any, dateOfInvestment: any, valueQuoteCurrency: number, valueBaseCurrency: number, quoteCurrency?: { __typename?: 'CryptoCurrencyMarket', symbol: string, image: string } | null, baseCurrency?: { __typename?: 'CryptoCurrencyMarket', symbol: string, image: string } | null }>, topInvestments: Array<{ __typename?: 'InvestmentEntity', id: string, type: string, quantity: number, quoteCurrency?: { __typename?: 'CryptoCurrencyMarket', symbol: string, image: string, name: string } | null }>, lastInvestments: Array<{ __typename?: 'InvestmentEntity', type: string, creationDate: any, dateOfInvestment: any, valueQuoteCurrency: number, valueBaseCurrency: number, quoteCurrency?: { __typename?: 'CryptoCurrencyMarket', symbol: string } | null, baseCurrency?: { __typename?: 'CryptoCurrencyMarket', symbol: string } | null }> }, favoritesCrypto: Array<{ __typename?: 'CryptoCurrencyMarket', id: string, name: string, image: string, symbol: string, current_price: number, market_cap: number, price_change_percentage_24h: number }> } } };

export type LoginMutationVariables = Exact<{
  loginUserInput: LoginUserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', refreshToken: string, accessToken: string, user: { __typename?: 'User', status: UserStatus, id: string, role: UserRoles, email: string, firstName: string, lastName: string, sold: { __typename?: 'UserSold', currentSold: number, soldRatio: number, lastSold: number, newSold: number, latestBigInvestments: Array<{ __typename?: 'InvestmentEntity', type: string, creationDate: any, dateOfInvestment: any, valueQuoteCurrency: number, valueBaseCurrency: number, quoteCurrency?: { __typename?: 'CryptoCurrencyMarket', symbol: string, image: string } | null, baseCurrency?: { __typename?: 'CryptoCurrencyMarket', symbol: string, image: string } | null }>, topInvestments: Array<{ __typename?: 'InvestmentEntity', id: string, type: string, quantity: number, quoteCurrency?: { __typename?: 'CryptoCurrencyMarket', symbol: string, image: string, name: string } | null }>, lastInvestments: Array<{ __typename?: 'InvestmentEntity', type: string, creationDate: any, dateOfInvestment: any, valueQuoteCurrency: number, valueBaseCurrency: number, quoteCurrency?: { __typename?: 'CryptoCurrencyMarket', symbol: string } | null, baseCurrency?: { __typename?: 'CryptoCurrencyMarket', symbol: string } | null }> }, favoritesCrypto: Array<{ __typename?: 'CryptoCurrencyMarket', id: string, name: string, image: string, symbol: string, current_price: number, market_cap: number, price_change_percentage_24h: number }> } } };

export type RefreshTokensMutationVariables = Exact<{
  refreshToken: Scalars['String'];
}>;


export type RefreshTokensMutation = { __typename?: 'Mutation', refreshTokens: { __typename?: 'LoginResponse', accessToken: string, refreshToken: string } };

export type RegisterMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', id: string, status: UserStatus } };

export type AccountQueryVariables = Exact<{ [key: string]: never; }>;


export type AccountQuery = { __typename?: 'Query', account: { __typename?: 'User', status: UserStatus, id: string, role: UserRoles, email: string, firstName: string, lastName: string, sold: { __typename?: 'UserSold', currentSold: number, soldRatio: number, lastSold: number, newSold: number, latestBigInvestments: Array<{ __typename?: 'InvestmentEntity', type: string, creationDate: any, dateOfInvestment: any, valueQuoteCurrency: number, valueBaseCurrency: number, quoteCurrency?: { __typename?: 'CryptoCurrencyMarket', symbol: string, image: string } | null, baseCurrency?: { __typename?: 'CryptoCurrencyMarket', symbol: string, image: string } | null }>, topInvestments: Array<{ __typename?: 'InvestmentEntity', id: string, type: string, quantity: number, quoteCurrency?: { __typename?: 'CryptoCurrencyMarket', symbol: string, image: string, name: string } | null }>, lastInvestments: Array<{ __typename?: 'InvestmentEntity', type: string, creationDate: any, dateOfInvestment: any, valueQuoteCurrency: number, valueBaseCurrency: number, quoteCurrency?: { __typename?: 'CryptoCurrencyMarket', symbol: string } | null, baseCurrency?: { __typename?: 'CryptoCurrencyMarket', symbol: string } | null }> }, favoritesCrypto: Array<{ __typename?: 'CryptoCurrencyMarket', id: string, name: string, image: string, symbol: string, current_price: number, market_cap: number, price_change_percentage_24h: number }> } };

export type ToggleFavoriteCryptoMutationVariables = Exact<{
  input: ToggleFavoriteInput;
}>;


export type ToggleFavoriteCryptoMutation = { __typename?: 'Mutation', toggleFavoriteCrypto: { __typename?: 'User', id: string } };

export type GetCryptoQueryVariables = Exact<{
  symbol?: InputMaybe<Scalars['String']>;
}>;


export type GetCryptoQuery = { __typename?: 'Query', cryptos: { __typename?: 'CryptoCurrencyMarketPaginatedResults', datas: Array<{ __typename?: 'CryptoCurrencyMarket', ath: number, ath_change_percentage: number, ath_date: any, atl: number, atl_change_percentage: number, atl_date: any, circulating_supply: number, current_price: number, high_24h: number, low_24h: number, market_cap: number, market_cap_change_24h: number, market_cap_change_percentage_24h: number, market_cap_rank: number, last_updated: any, name: string, price_change_24h: number, price_change_percentage_24h: number, symbol: string, image: string, total_supply?: number | null, total_volume: number, id: string }> } };

export type CreateInvestmentReportMutationVariables = Exact<{
  options: InvestmentReportCreate;
}>;


export type CreateInvestmentReportMutation = { __typename?: 'Mutation', createInvestmentReport: { __typename?: 'InvestmentsReportsEntity', fromDate: any, id: string, reportUri: string, toDate: any, mensualReport: boolean } };

export type ImportInvestmentMutationVariables = Exact<{
  link: Scalars['String'];
}>;


export type ImportInvestmentMutation = { __typename?: 'Mutation', importInvestments: Array<{ __typename?: 'InvestmentEntity', id: string }> };

export type AccountInvestmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type AccountInvestmentsQuery = { __typename?: 'Query', account: { __typename?: 'User', investments: Array<{ __typename?: 'InvestmentEntity', type: string, creationDate: any, dateOfInvestment: any, valueQuoteCurrency: number, valueBaseCurrency: number, quoteCurrency?: { __typename?: 'CryptoCurrencyMarket', symbol: string } | null, baseCurrency?: { __typename?: 'CryptoCurrencyMarket', symbol: string } | null }> } };

export type GetReportsListQueryVariables = Exact<{
  options: InvestmentsReportsInput;
}>;


export type GetReportsListQuery = { __typename?: 'Query', reports: Array<{ __typename?: 'InvestmentsReportsEntity', fromDate: any, mensualReport: boolean, reportUri: string, toDate: any, name: string, user: { __typename?: 'User', id: string, email: string, lastName: string, firstName: string } }> };

export type GetCryptosListQueryVariables = Exact<{
  options: CryptoSearchInput;
}>;


export type GetCryptosListQuery = { __typename?: 'Query', cryptos: { __typename?: 'CryptoCurrencyMarketPaginatedResults', count: number, datas: Array<{ __typename?: 'CryptoCurrencyMarket', id: string, name: string, symbol: string, current_price: number, market_cap: number, image: string, price_change_percentage_24h: number }> } };

export type UpdateAccountMutationVariables = Exact<{
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
}>;


export type UpdateAccountMutation = { __typename?: 'Mutation', updateAccount: { __typename?: 'User', status: UserStatus, id: string, role: UserRoles, email: string, firstName: string, lastName: string, sold: { __typename?: 'UserSold', currentSold: number, soldRatio: number, lastSold: number, newSold: number, latestBigInvestments: Array<{ __typename?: 'InvestmentEntity', type: string, creationDate: any, dateOfInvestment: any, valueQuoteCurrency: number, valueBaseCurrency: number, quoteCurrency?: { __typename?: 'CryptoCurrencyMarket', symbol: string, image: string } | null, baseCurrency?: { __typename?: 'CryptoCurrencyMarket', symbol: string, image: string } | null }>, topInvestments: Array<{ __typename?: 'InvestmentEntity', id: string, type: string, quantity: number, quoteCurrency?: { __typename?: 'CryptoCurrencyMarket', symbol: string, image: string, name: string } | null }>, lastInvestments: Array<{ __typename?: 'InvestmentEntity', type: string, creationDate: any, dateOfInvestment: any, valueQuoteCurrency: number, valueBaseCurrency: number, quoteCurrency?: { __typename?: 'CryptoCurrencyMarket', symbol: string } | null, baseCurrency?: { __typename?: 'CryptoCurrencyMarket', symbol: string } | null }> }, favoritesCrypto: Array<{ __typename?: 'CryptoCurrencyMarket', id: string, name: string, image: string, symbol: string, current_price: number, market_cap: number, price_change_percentage_24h: number }> } };

export const UserSessionFragmentDoc = gql`
    fragment UserSession on User {
  status
  id
  role
  email
  firstName
  lastName
  sold {
    currentSold
    latestBigInvestments {
      type
      creationDate
      dateOfInvestment
      valueQuoteCurrency
      quoteCurrency {
        symbol
        image
      }
      valueBaseCurrency
      baseCurrency {
        symbol
        image
      }
    }
    topInvestments {
      id
      type
      quantity
      quoteCurrency {
        symbol
        image
        name
      }
    }
    lastInvestments {
      type
      creationDate
      dateOfInvestment
      valueQuoteCurrency
      quoteCurrency {
        symbol
      }
      valueBaseCurrency
      baseCurrency {
        symbol
      }
    }
    currentSold
    soldRatio
    lastSold
    newSold
  }
  favoritesCrypto {
    id
    name
    image
    symbol
    current_price
    market_cap
    price_change_percentage_24h
  }
}
    `;
export const GetArticlesDocument = gql`
    query GetArticles($search: String!) {
  articles(options: {orderBy: null, filterBy: {search: $search}}) {
    author
    description
    title
    url
    publishedDate
    source
    symbol
    picture
  }
}
    `;

/**
 * __useGetArticlesQuery__
 *
 * To run a query within a Vue component, call `useGetArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticlesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetArticlesQuery({
 *   search: // value for 'search'
 * });
 */
export function useGetArticlesQuery(variables: GetArticlesQueryVariables | VueCompositionApi.Ref<GetArticlesQueryVariables> | ReactiveFunction<GetArticlesQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetArticlesQuery, GetArticlesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetArticlesQuery, GetArticlesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetArticlesQuery, GetArticlesQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetArticlesQuery, GetArticlesQueryVariables>(GetArticlesDocument, variables, options);
}
export function useGetArticlesLazyQuery(variables: GetArticlesQueryVariables | VueCompositionApi.Ref<GetArticlesQueryVariables> | ReactiveFunction<GetArticlesQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetArticlesQuery, GetArticlesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetArticlesQuery, GetArticlesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetArticlesQuery, GetArticlesQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetArticlesQuery, GetArticlesQueryVariables>(GetArticlesDocument, variables, options);
}
export type GetArticlesQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetArticlesQuery, GetArticlesQueryVariables>;
export const ConfirmEmailDocument = gql`
    mutation ConfirmEmail($emailCode: Float!, $email: String!) {
  confirmEmail(emailCode: $emailCode, email: $email) {
    accessToken
    refreshToken
    user {
      ...UserSession
    }
  }
}
    ${UserSessionFragmentDoc}`;

/**
 * __useConfirmEmailMutation__
 *
 * To run a mutation, you first call `useConfirmEmailMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useConfirmEmailMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useConfirmEmailMutation({
 *   variables: {
 *     emailCode: // value for 'emailCode'
 *     email: // value for 'email'
 *   },
 * });
 */
export function useConfirmEmailMutation(options: VueApolloComposable.UseMutationOptions<ConfirmEmailMutation, ConfirmEmailMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<ConfirmEmailMutation, ConfirmEmailMutationVariables>>) {
  return VueApolloComposable.useMutation<ConfirmEmailMutation, ConfirmEmailMutationVariables>(ConfirmEmailDocument, options);
}
export type ConfirmEmailMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<ConfirmEmailMutation, ConfirmEmailMutationVariables>;
export const LoginDocument = gql`
    mutation Login($loginUserInput: LoginUserInput!) {
  login(loginUserInput: $loginUserInput) {
    refreshToken
    accessToken
    user {
      ...UserSession
    }
  }
}
    ${UserSessionFragmentDoc}`;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLoginMutation({
 *   variables: {
 *     loginUserInput: // value for 'loginUserInput'
 *   },
 * });
 */
export function useLoginMutation(options: VueApolloComposable.UseMutationOptions<LoginMutation, LoginMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<LoginMutation, LoginMutationVariables>>) {
  return VueApolloComposable.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<LoginMutation, LoginMutationVariables>;
export const RefreshTokensDocument = gql`
    mutation RefreshTokens($refreshToken: String!) {
  refreshTokens(refreshToken: $refreshToken) {
    accessToken
    refreshToken
  }
}
    `;

/**
 * __useRefreshTokensMutation__
 *
 * To run a mutation, you first call `useRefreshTokensMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokensMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRefreshTokensMutation({
 *   variables: {
 *     refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useRefreshTokensMutation(options: VueApolloComposable.UseMutationOptions<RefreshTokensMutation, RefreshTokensMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<RefreshTokensMutation, RefreshTokensMutationVariables>>) {
  return VueApolloComposable.useMutation<RefreshTokensMutation, RefreshTokensMutationVariables>(RefreshTokensDocument, options);
}
export type RefreshTokensMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<RefreshTokensMutation, RefreshTokensMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($createUserInput: CreateUserInput!) {
  register(createUserInput: $createUserInput) {
    id
    status
  }
}
    `;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRegisterMutation({
 *   variables: {
 *     createUserInput: // value for 'createUserInput'
 *   },
 * });
 */
export function useRegisterMutation(options: VueApolloComposable.UseMutationOptions<RegisterMutation, RegisterMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<RegisterMutation, RegisterMutationVariables>>) {
  return VueApolloComposable.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
}
export type RegisterMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<RegisterMutation, RegisterMutationVariables>;
export const AccountDocument = gql`
    query Account {
  account {
    ...UserSession
  }
}
    ${UserSessionFragmentDoc}`;

/**
 * __useAccountQuery__
 *
 * To run a query within a Vue component, call `useAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useAccountQuery();
 */
export function useAccountQuery(options: VueApolloComposable.UseQueryOptions<AccountQuery, AccountQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<AccountQuery, AccountQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<AccountQuery, AccountQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<AccountQuery, AccountQueryVariables>(AccountDocument, {}, options);
}
export function useAccountLazyQuery(options: VueApolloComposable.UseQueryOptions<AccountQuery, AccountQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<AccountQuery, AccountQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<AccountQuery, AccountQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<AccountQuery, AccountQueryVariables>(AccountDocument, {}, options);
}
export type AccountQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<AccountQuery, AccountQueryVariables>;
export const ToggleFavoriteCryptoDocument = gql`
    mutation ToggleFavoriteCrypto($input: ToggleFavoriteInput!) {
  toggleFavoriteCrypto(input: $input) {
    id
  }
}
    `;

/**
 * __useToggleFavoriteCryptoMutation__
 *
 * To run a mutation, you first call `useToggleFavoriteCryptoMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useToggleFavoriteCryptoMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useToggleFavoriteCryptoMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useToggleFavoriteCryptoMutation(options: VueApolloComposable.UseMutationOptions<ToggleFavoriteCryptoMutation, ToggleFavoriteCryptoMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<ToggleFavoriteCryptoMutation, ToggleFavoriteCryptoMutationVariables>>) {
  return VueApolloComposable.useMutation<ToggleFavoriteCryptoMutation, ToggleFavoriteCryptoMutationVariables>(ToggleFavoriteCryptoDocument, options);
}
export type ToggleFavoriteCryptoMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<ToggleFavoriteCryptoMutation, ToggleFavoriteCryptoMutationVariables>;
export const GetCryptoDocument = gql`
    query GetCrypto($symbol: String) {
  cryptos(options: {filterBy: {symbol: $symbol}}) {
    datas {
      ath
      ath_change_percentage
      ath_date
      atl
      atl_change_percentage
      atl_date
      circulating_supply
      current_price
      high_24h
      low_24h
      market_cap
      market_cap_change_24h
      market_cap_change_percentage_24h
      market_cap_rank
      last_updated
      name
      price_change_24h
      price_change_percentage_24h
      symbol
      image
      total_supply
      total_volume
      id
    }
  }
}
    `;

/**
 * __useGetCryptoQuery__
 *
 * To run a query within a Vue component, call `useGetCryptoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCryptoQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetCryptoQuery({
 *   symbol: // value for 'symbol'
 * });
 */
export function useGetCryptoQuery(variables: GetCryptoQueryVariables | VueCompositionApi.Ref<GetCryptoQueryVariables> | ReactiveFunction<GetCryptoQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<GetCryptoQuery, GetCryptoQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetCryptoQuery, GetCryptoQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetCryptoQuery, GetCryptoQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetCryptoQuery, GetCryptoQueryVariables>(GetCryptoDocument, variables, options);
}
export function useGetCryptoLazyQuery(variables: GetCryptoQueryVariables | VueCompositionApi.Ref<GetCryptoQueryVariables> | ReactiveFunction<GetCryptoQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<GetCryptoQuery, GetCryptoQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetCryptoQuery, GetCryptoQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetCryptoQuery, GetCryptoQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetCryptoQuery, GetCryptoQueryVariables>(GetCryptoDocument, variables, options);
}
export type GetCryptoQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetCryptoQuery, GetCryptoQueryVariables>;
export const CreateInvestmentReportDocument = gql`
    mutation CreateInvestmentReport($options: InvestmentReportCreate!) {
  createInvestmentReport(options: $options) {
    fromDate
    id
    reportUri
    toDate
    mensualReport
  }
}
    `;

/**
 * __useCreateInvestmentReportMutation__
 *
 * To run a mutation, you first call `useCreateInvestmentReportMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateInvestmentReportMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateInvestmentReportMutation({
 *   variables: {
 *     options: // value for 'options'
 *   },
 * });
 */
export function useCreateInvestmentReportMutation(options: VueApolloComposable.UseMutationOptions<CreateInvestmentReportMutation, CreateInvestmentReportMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateInvestmentReportMutation, CreateInvestmentReportMutationVariables>>) {
  return VueApolloComposable.useMutation<CreateInvestmentReportMutation, CreateInvestmentReportMutationVariables>(CreateInvestmentReportDocument, options);
}
export type CreateInvestmentReportMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateInvestmentReportMutation, CreateInvestmentReportMutationVariables>;
export const ImportInvestmentDocument = gql`
    mutation ImportInvestment($link: String!) {
  importInvestments(link: $link) {
    id
  }
}
    `;

/**
 * __useImportInvestmentMutation__
 *
 * To run a mutation, you first call `useImportInvestmentMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useImportInvestmentMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useImportInvestmentMutation({
 *   variables: {
 *     link: // value for 'link'
 *   },
 * });
 */
export function useImportInvestmentMutation(options: VueApolloComposable.UseMutationOptions<ImportInvestmentMutation, ImportInvestmentMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<ImportInvestmentMutation, ImportInvestmentMutationVariables>>) {
  return VueApolloComposable.useMutation<ImportInvestmentMutation, ImportInvestmentMutationVariables>(ImportInvestmentDocument, options);
}
export type ImportInvestmentMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<ImportInvestmentMutation, ImportInvestmentMutationVariables>;
export const AccountInvestmentsDocument = gql`
    query AccountInvestments {
  account {
    investments {
      type
      creationDate
      dateOfInvestment
      valueQuoteCurrency
      quoteCurrency {
        symbol
      }
      valueBaseCurrency
      baseCurrency {
        symbol
      }
    }
  }
}
    `;

/**
 * __useAccountInvestmentsQuery__
 *
 * To run a query within a Vue component, call `useAccountInvestmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountInvestmentsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useAccountInvestmentsQuery();
 */
export function useAccountInvestmentsQuery(options: VueApolloComposable.UseQueryOptions<AccountInvestmentsQuery, AccountInvestmentsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<AccountInvestmentsQuery, AccountInvestmentsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<AccountInvestmentsQuery, AccountInvestmentsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<AccountInvestmentsQuery, AccountInvestmentsQueryVariables>(AccountInvestmentsDocument, {}, options);
}
export function useAccountInvestmentsLazyQuery(options: VueApolloComposable.UseQueryOptions<AccountInvestmentsQuery, AccountInvestmentsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<AccountInvestmentsQuery, AccountInvestmentsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<AccountInvestmentsQuery, AccountInvestmentsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<AccountInvestmentsQuery, AccountInvestmentsQueryVariables>(AccountInvestmentsDocument, {}, options);
}
export type AccountInvestmentsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<AccountInvestmentsQuery, AccountInvestmentsQueryVariables>;
export const GetReportsListDocument = gql`
    query GetReportsList($options: InvestmentsReportsInput!) {
  reports(options: $options) {
    fromDate
    mensualReport
    reportUri
    toDate
    name
    user {
      id
      email
      lastName
      firstName
    }
  }
}
    `;

/**
 * __useGetReportsListQuery__
 *
 * To run a query within a Vue component, call `useGetReportsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReportsListQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetReportsListQuery({
 *   options: // value for 'options'
 * });
 */
export function useGetReportsListQuery(variables: GetReportsListQueryVariables | VueCompositionApi.Ref<GetReportsListQueryVariables> | ReactiveFunction<GetReportsListQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetReportsListQuery, GetReportsListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetReportsListQuery, GetReportsListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetReportsListQuery, GetReportsListQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetReportsListQuery, GetReportsListQueryVariables>(GetReportsListDocument, variables, options);
}
export function useGetReportsListLazyQuery(variables: GetReportsListQueryVariables | VueCompositionApi.Ref<GetReportsListQueryVariables> | ReactiveFunction<GetReportsListQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetReportsListQuery, GetReportsListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetReportsListQuery, GetReportsListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetReportsListQuery, GetReportsListQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetReportsListQuery, GetReportsListQueryVariables>(GetReportsListDocument, variables, options);
}
export type GetReportsListQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetReportsListQuery, GetReportsListQueryVariables>;
export const GetCryptosListDocument = gql`
    query GetCryptosList($options: CryptoSearchInput!) {
  cryptos(options: $options) {
    datas {
      id
      name
      symbol
      current_price
      market_cap
      image
      current_price
      price_change_percentage_24h
    }
    count
  }
}
    `;

/**
 * __useGetCryptosListQuery__
 *
 * To run a query within a Vue component, call `useGetCryptosListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCryptosListQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetCryptosListQuery({
 *   options: // value for 'options'
 * });
 */
export function useGetCryptosListQuery(variables: GetCryptosListQueryVariables | VueCompositionApi.Ref<GetCryptosListQueryVariables> | ReactiveFunction<GetCryptosListQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetCryptosListQuery, GetCryptosListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetCryptosListQuery, GetCryptosListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetCryptosListQuery, GetCryptosListQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetCryptosListQuery, GetCryptosListQueryVariables>(GetCryptosListDocument, variables, options);
}
export function useGetCryptosListLazyQuery(variables: GetCryptosListQueryVariables | VueCompositionApi.Ref<GetCryptosListQueryVariables> | ReactiveFunction<GetCryptosListQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetCryptosListQuery, GetCryptosListQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetCryptosListQuery, GetCryptosListQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetCryptosListQuery, GetCryptosListQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetCryptosListQuery, GetCryptosListQueryVariables>(GetCryptosListDocument, variables, options);
}
export type GetCryptosListQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetCryptosListQuery, GetCryptosListQueryVariables>;
export const UpdateAccountDocument = gql`
    mutation UpdateAccount($firstName: String, $lastName: String) {
  updateAccount(updateUserInput: {firstName: $firstName, lastName: $lastName}) {
    ...UserSession
  }
}
    ${UserSessionFragmentDoc}`;

/**
 * __useUpdateAccountMutation__
 *
 * To run a mutation, you first call `useUpdateAccountMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAccountMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateAccountMutation({
 *   variables: {
 *     firstName: // value for 'firstName'
 *     lastName: // value for 'lastName'
 *   },
 * });
 */
export function useUpdateAccountMutation(options: VueApolloComposable.UseMutationOptions<UpdateAccountMutation, UpdateAccountMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdateAccountMutation, UpdateAccountMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<UpdateAccountMutation, UpdateAccountMutationVariables>(UpdateAccountDocument, options);
}
export type UpdateAccountMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdateAccountMutation, UpdateAccountMutationVariables>;