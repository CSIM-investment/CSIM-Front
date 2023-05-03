<script setup lang="ts">
import ChartjsDoughnutsLabel from 'chartjs-plugin-doughnutlabel-v3'
import { ref } from 'vue'
import { useSessionStore } from '~/authentication/stores/session'

const { user } = useSessionStore()

onMounted(() => {
  chartData.value.datasets[0].data = [
    user?.value?.sold?.newSold ?? 0,
  ]
})
const plugins = [ChartjsDoughnutsLabel]
const chartData = ref({
  datasets: [
    {
      borderWidth: 0,
      weight: 900,
      cutout: '80%',
      data: [300, 50, 100, 40],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#725791'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#725791'],
    },
  ],
})

const lightOptions = ref({
  plugins: {
    doughnutLabel: {
      labels: [
        {
          font: {
            size: 10,
            weight: 'bold',
          },
          text: 'Total',
        },
        {
          text: `${user?.value?.sold?.newSold.toFixed(2) ?? 0} €`,
          color: 'black',
          font: {
            size: 15,
            weight: 'bold',
          },
        },
        {
          text: `${user?.value?.sold?.soldRatio ?? 0}%`,
          color: `${user?.value?.sold?.soldRatio} > 0 ? 'green' : 'red'`,
          font: {
            size: 15,
            weight: 'bold',
          },
        },
      ],
    },
    datalabels: {
      color: '#ffffff',
      font: {
        family: '"Font Awesome 5 Free", "Font Awesome 5 Brands',
        size: 5,
        weight: 900,
      },
      display(context: { dataIndex: number }) {
        return 30
      },
    },
    formatter: (_value: number, context: { dataIndex: number; dataset: { icons: [] } }) => {
      return 30
    },
  },
  legend: {
    display: false,
  },
})
</script>

<template>
  <Chart :plugins="plugins" type="doughnut" :data="chartData" :options="lightOptions" />
</template>
