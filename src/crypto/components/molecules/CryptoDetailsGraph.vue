<script setup lang="ts">
import { Line } from 'vue-chartjs'
import type { CryptoCurrencyMarket } from '~/common/generated/graphql'
import { CryptoChart } from '~/crypto/models/CryptoChartData'

const { t } = useI18n()

const props = defineProps<{
  crypto: CryptoCurrencyMarket
}>()

const selectedChart = ref<CryptoChart.Type>(CryptoChart.Data.chartTypes[0])
const selectedPeriod = ref<CryptoChart.Period>(CryptoChart.Data.periods[0])
const lineStylesData = ref<CryptoChart.LineStyleData>()

let cryptoChartData: CryptoChart.Data
const hasChartDataFetchFailed = ref(false)

onMounted(async() => {
  cryptoChartData = new CryptoChart.Data(props.crypto)
  try {
    lineStylesData.value = await cryptoChartData.lineStyleData(selectedChart.value, selectedPeriod.value)
  }
  catch {
    hasChartDataFetchFailed.value = true
  }
})

watch([selectedChart, selectedPeriod], async() => {
  lineStylesData.value = await cryptoChartData.lineStyleData(selectedChart.value, selectedPeriod.value)
})

const basicOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
}

</script>

<template>
  <div v-if="!hasChartDataFetchFailed" class="flex flex-col h-full w-11/12 md:w-full bg-grey-lighter p-2 md:p-8 rounded-xl">
    <div class="flex flex-wrap gap-2 justify-between mb-4">
      <div class="flex gap-2 items-center">
        <button
          v-for="chartType in CryptoChart.Data.chartTypes"
          :key="chartType"
          class="chart-action"
          :class="{selected: selectedChart === chartType}"
          @click="selectedChart = chartType"
        >
          {{ t(`crypto.${chartType}`, 2) }}
        </button>
      </div>
      <div class="flex gap-2">
        <button
          v-for="period in CryptoChart.Data.periods"
          :key="period"
          class="chart-action"
          :class="{selected: selectedPeriod === period}"
          @click="selectedPeriod = period"
        >
          {{ period }}
        </button>
      </div>
    </div>
    <div v-if="lineStylesData" class="flex-1">
      <Line type="line" :data="lineStylesData" :options="basicOptions" />
    </div>
  </div>
  <Error500 v-else />
</template>
