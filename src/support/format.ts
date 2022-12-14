const numberFormatEURO = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })
const numberFormatUSD = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
const dateFormat = new Intl.DateTimeFormat('fr-FR')

export const format = {
  euroPrice: (price: number) => {
    return `${price}€`
  },

  dollarPrice: (price: number) => {
    return `$${price}`
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

  percentage: (value: number | string) => {
    return `${value}%`
  },

  cap: (value: number | string) => {
    return `#${value}`
  },
}
