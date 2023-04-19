import { defineConfig } from 'cypress'

export default defineConfig({
  env: {
    backendUrl: 'http://localhost:3002/graphql',
  },
  e2e: {
    baseUrl: 'http://localhost:4000',
    chromeWebSecurity: false,
    specPattern: 'cypress/e2e/**/*.spec.*',
  },
})
