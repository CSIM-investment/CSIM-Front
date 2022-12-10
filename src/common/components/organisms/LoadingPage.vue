<script setup>
const { t } = useI18n()
</script>

<template>
  <div>
    <div class="loading-page">
      <div class="loading-page__loader">
        <div class="loading-page__loader-logo">
          <CsimLogo />
        </div>
        <div class="loading-page__loader-spinner">
          <Spinner size="250px" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.loading-page {
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;

  &__loader {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    position: relative;
    width: 250px;
    height: 250px;

    &-logo {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &-spinner {
      width: 100%;
      max-width: 20rem;
    }
  }
}
</style>
