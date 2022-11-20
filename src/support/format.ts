const numberFormatEURO = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })
const numberFormatUSD = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
const dateFormat = new Intl.DateTimeFormat('fr-FR')

export const format = {
  euroPrice: (price: number) => {
    return numberFormatEURO.format(price)
  },

  dollarPrice: (price: number) => {
    return numberFormatUSD.format(price)
  },

  date: (date: Date) => {
    return dateFormat.format(date)
  },

  localDateString: (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  },
}
