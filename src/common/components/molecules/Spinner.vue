<script setup lang="ts">
import classnames from 'classnames'

interface Props {
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
})
</script>

<template>
  <div :class="classnames('half-circle-spinner', props.class)">
    <div class="circle circle-1" />
    <div class="circle circle-2" />
  </div>
</template>

<style scoped lang="postcss">
.half-circle-spinner, .half-circle-spinner * {
  box-sizing: border-box;
}

.half-circle-spinner {
  width: v-bind('size');
  height: v-bind('size');
  border-radius: 100%;
  position: relative;
}

.half-circle-spinner .circle {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  border: calc(60px / 10) solid transparent;
}

.half-circle-spinner .circle.circle-1 {
  @apply border-t-primary;
  animation: half-circle-spinner-animation 1s infinite;
}

.half-circle-spinner .circle.circle-2 {
  @apply border-t-primary;
  animation: half-circle-spinner-animation 1s infinite alternate;
}

@keyframes half-circle-spinner-animation {
  0% {
    transform: rotate(0deg);

  }
  100%{
    transform: rotate(360deg);
  }
}
</style>
