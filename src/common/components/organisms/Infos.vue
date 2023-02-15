<script lang="ts" setup>
import moment from 'moment-with-locales-es6'
import type { Article } from '~/common/generated/graphql'
const momentDate = (date: string) => moment(date).format('LL')
const props = defineProps<{
  article: Article
}>()
</script>
<template>
  <div class="w-full flex-col flex">
    <div class="w-full flex-col mt-5 sm:flex-row-reverse items-center sm:items-start justify-around flex">
      <div id="img" class="border-4-black overflow-hidden sm:w-1/4 sm:self-center">
        <img
          class="inner-img w-1/2 sm:w-full mx-auto sm:mx-0"
          :src="props.article.picture"
          :alt="props.article.source"
        >
      </div>
      <div class="sm:w-1/2 sm:mx-3 flex-col flex text-center sm:text-start">
        <h1 class="text-xl sm:text-2xl mb-5 title hover:text-primary">
          {{ props.article.title }}
        </h1>
        <span class="text-md mb-5 sm:text-xl leading-8 description font-medium">
          {{ props.article.description }}
        </span>
        <div
          class="flex-col sm:flex-row flex mx-3 flex-wrap sub"
        >
          <p class="mr-5">
            {{ momentDate(props.article.publishedDate) }}
          </p>
          <p class="mr-5">
            {{ props.article.source }}
          </p>
          <p class="sub__author font-medium">
            {{ props.article.author }}
          </p>
        </div>
      </div>
    </div>
    <span class="w-3/4 mt-7 self-center divider" />
  </div>
</template>
<style lang="scss">

.title {
  color: rgba(142, 110, 202, 0.98) !important;
  line-height: 2.8rem;
  letter-spacing: -.18px;
  font-weight: bold;
}
.description {
  color: #86707a;
}
.divider {
  background-color: #d0cdcd;
  height: 0.2px;
}
.sub {
  &__author {
    word-break: break-all;
    color: #CA9A6F;
  }
}
</style>
