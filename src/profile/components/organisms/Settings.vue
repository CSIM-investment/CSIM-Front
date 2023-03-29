<script lang="ts" setup>
import { ref } from 'vue'
import { useSessionStore } from '~/authentication/stores/session'

const { locale } = useI18n()
const enum Lang {
  FR = 'fr',
  EN = 'en',
}
const lang = ref<Lang>((localStorage.getItem('lang') as Lang) ?? Lang.FR)
const langOptions = [
  { name: 'Français', value: Lang.FR },
  { name: 'English', value: Lang.EN },
] as Array<Record<string, string>>

watch(lang, (newLang: Lang) => {
  switch (newLang) {
    case Lang.FR:
      locale.value = Lang.FR
      localStorage.setItem('lang', Lang.FR)
      break
    case Lang.EN:
      locale.value = Lang.EN
      localStorage.setItem('lang', Lang.EN)
      break
    default:
      lang.value = Lang.EN
  }
})

const user = useSessionStore().user

const firstName = ref<string>(user.value?.firstName ?? '')
const lastName = ref<string>(user.value?.lastName ?? '')
const email = ref<string>(user.value?.email ?? '')
</script>

<template>
  <div class="flex">
    <div class="max-w-5xl mx-auto lg:w-1/2 flex flex-col">
      <div class="flex">
        <div class="w-32 h-32 flex items-center">
          <img
            class="w-full"
            src="/src/common/assets/images/user.png"
            alt="user-photo"
          >
        </div>
        <div class="pl-8 w-full flex flex-col justify-center items-center">
          <p class="mb-4">
            Préférences de langage :
          </p>
          <SelectButton
            v-model="lang"
            :options="langOptions"
            option-label="name"
            option-value="value"
            aria-labelledby="basic"
          />
        </div>
      </div>
      <div class="flex flex-col my-14">
        <span class="p-float-label mb-10">
          <InputText id="firstName" v-model="firstName" class="w-full" />
          <label for="firstName">firstname</label>
        </span>
        <span class="p-float-label mb-10">
          <InputText id="lastName" v-model="lastName" class="w-full" />
          <label for="lastName">lastname</label>
        </span>
        <InputText id="email" v-model="email" class="w-full" placeholder="email" disabled />
      </div>
    </div>
    <div class="hidden lg:flex justify-center items-center lg:w-1/2">
      <img
        class="w-full"
        src="/src/common/assets/images/profile.svg"
        alt="profile-illustration"
      >
    </div>
  </div>
</template>
