<script setup lang='ts'>
import type { CryptoCurrencyMarket } from '~/common/generated/graphql'

interface Statistic {
  label: string
  value: string
}

const { t } = useI18n()
const props = defineProps<{
  crypto: CryptoCurrencyMarket
}>()

const statistics: Statistic[] = [
  {
    label: t('crypto.current_price'),
    value: `$${props.crypto.current_price}`,
  },
  {
    label: t('crypto.market_cap'),
    value: `$${props.crypto.market_cap}`,
  },
  {
    label: t('crypto.circulating_supply'),
    value: `${props.crypto.circulating_supply} ${props.crypto.symbol.toUpperCase()}`,
  },
  {
    label: t('crypto.market_cap_rank'),
    value: `${props.crypto.market_cap_rank}`,
  },
  {
    label: t('crypto.high_24h'),
    value: `$${props.crypto.high_24h}`,
  },
  {
    label: t('crypto.low_24h'),
    value: `$${props.crypto.low_24h}`,
  },
  {
    label: t('crypto.total_volume'),
    value: `$${props.crypto.total_volume}`,
  },
  {
    label: t('crypto.change_24h'),
    value: `${props.crypto.price_change_24h}%`,
  },
  {
    label: t('crypto.total_supply'),
    value: `$${props.crypto.total_supply}`,
  },
  {
    label: t('crypto.last_updated'),
    value: new Date(props.crypto.atl_date).toLocaleDateString('fr'),
  },
]

</script>

<template>
  <div class="grid grid-cols-3 gap-8">
    <CryptoDetailsStat
      v-for="statistic in statistics"
      :key="statistic.label"
      :label="statistic.label"
      :stat="statistic.value"
    />
  </div>
</template>
