<script setup lang='ts'>
import type { Crypto } from '~/interfaces/crypto.interface'

interface Statistic {
  label: string
  value: string
}

const { t } = useI18n()
const props = defineProps<{
  crypto: Crypto
}>()

const statistics: Statistic[] = [
  {
    label: t('crypto.current_price'),
    value: `$${props.crypto.price}`,
  },
  {
    label: t('crypto.market_cap'),
    value: `$${props.crypto.marketCap}`,
  },
  {
    label: t('crypto.circulating_supply'),
    value: `${props.crypto.price} ${props.crypto.symbol}`,
  },
  {
    label: t('crypto.market_cap_rank'),
    value: `$${props.crypto.price}`,
  },
  {
    label: t('crypto.high_24h'),
    value: `$${props.crypto.price}`,
  },
  {
    label: t('crypto.low_24h'),
    value: `$${props.crypto.price}`,
  },
  {
    label: t('crypto.total_volume'),
    value: `$${props.crypto.price}`,
  },
  {
    label: t('crypto.change_24h'),
    value: `${props.crypto.changes}%`,
  },
  {
    label: t('crypto.total_supply'),
    value: `$${props.crypto.price}`,
  },
  {
    label: t('crypto.last_updated'),
    value: new Date().toString(),
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
<style scoped>

</style>
