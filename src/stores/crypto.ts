import { defineStore } from 'pinia'
import type { Crypto } from '~/interfaces/crypto.interface'

export const useCryptoStore = defineStore({
  id: 'crypto',
  state: () => ({
    cryptos: [] as Array<Crypto>,
    favorites: [] as Array<Crypto>,
  }),
  actions: {
    setCryptos(): void {
      this.cryptos = [
        {
          id: 1,
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/64px-Bitcoin.svg.png',
          name: 'Bitcoin',
          symbol: 'BTC',
          price: 20456,
          marketCap: 1,
          changes: -0.74,
        },
        {
          id: 2,
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Ethereum_logo_translucent.svg/langfr-220px-Ethereum_logo_translucent.svg.png',
          name: 'Ethereum',
          symbol: 'ETH',
          price: 1890,
          marketCap: 4,
          changes: 0.34,
        },
      ]
    },
    setFavorite(crypto: Crypto): void {
      if (this.favorites.includes(crypto)) {
        const index = this.favorites.indexOf(crypto)
        if (index !== -1)
          this.favorites.splice(index, 1)
      }
      else {
        this.favorites = [...this.favorites, crypto]
      }
    },
  },
  getters: {
    getCryptos(): Array<Crypto> {
      return this.cryptos
    },
    getFavorites(): Array<Crypto> {
      return this.favorites
    },
  },
})
