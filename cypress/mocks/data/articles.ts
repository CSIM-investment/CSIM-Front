import { faker } from '@faker-js/faker'
import type { GetArticlesQuery } from '../../../src/common/generated/graphql'

// return an array of articles from a minimalistic arrow function
export const fakeArticles = (
  numberOfArticles = 10,
): GetArticlesQuery['articles'] => new Array(numberOfArticles).fill(0).map(() => ({
  author: faker.name.firstName(),
  url: faker.internet.url(),
  title: faker.lorem.sentence(),
  description: faker.lorem.sentence(),
  publishedDate: faker.date.past().toISOString(),
  picture: faker.image.imageUrl(),
  source: faker.lorem.paragraphs(1),
  symbol: faker.finance.currencyCode(),
}))
