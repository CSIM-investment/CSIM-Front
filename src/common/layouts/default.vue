<template>
  <div class="app">
    <Header />
    <div class="app__page">
      <RouterView />
    </div>
  </div>
</template>

<style scoped lang="scss">
.app {
  height: 100%;

  &__page {
    height: calc(100vh - 64px);
  }
}
</style>
