<script lang="ts" setup>
import { useGetArticlesQuery } from '~/common/generated/graphql'

const { t } = useI18n()
const search = ref<string>('')
const {
  result,
  loading,
  refetch,
} = useGetArticlesQuery({
  search: search.value,
})

function debounce(fn: Function, delay: number) {
  let timer: any
  return function(this: any, ...args: any[]) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

function goUrl(url: string) {
  window.open(url, '_blank')
}

const debouncedSearch = debounce(() => {
  refetch({ search: search.value })
}, 500)

watch(search, () => {
  debouncedSearch()
})
</script>

<template>
  <div>
    <div class="flex flex-col items-center">
      <span class="text-3xl title mt-10 mb-3">{{ t('news.cryptocurrency') }}</span>
      <span v-if="result" class="text-md mb-3">{{ result.articles.length }} {{ t('news.articles') }}</span>
      <div class="grid sm:w-1/2 mb-10 p-fluid">
        <div class="col-12 md:col-4">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-search" />
            </span>
            <InputText v-model="search" :placeholder="t('news.search')" />
          </div>
        </div>
      </div>
      <Divider style="height: 1px; background-color:lightgrey" class="w-5/6 divider" />
      <span />
      <div v-if="result">
        <div v-for="article in result.articles" :key="article.id">
          <Infos v-if="article.picture" class="infos" :article="article" @click="goUrl(article.url)" />
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>
<style>
.infos:hover {
  background-color: #f1efef;
}

.inner-img:hover {
  transform: scale(1.1);
}

.infos:hover .inner-img {
  transform: scale(1.1);
}

.inner-img {
  transition: 0.3s;
}

.title {
  color: rgba(142, 110, 202, 0.98) !important;
  line-height: 2.8rem;
  letter-spacing: -.18px;
  font-weight: bold;
}
</style>
