<script setup lang='ts'>
import { Line } from 'vue-chartjs'

const lineStylesData = ref(
  {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Third Dataset',
        data: [12, 51, 62, 33, 21, 62, 45],
        fill: true,
        borderColor: '#683EB8',
        tension: 0.4,
        backgroundColor: 'rgba(104,62,184,0.1)',
      },
    ],
  },
)

const basicOptions = ref(
  {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#495057',
        },
      },
    },
  },
)

</script>

<template>
  <div class="max-h-80">
    <p>Graph</p>
    <Line type="line" :data="lineStylesData" :options="basicOptions" />
  </div>
</template>
<style scoped>

</style>
