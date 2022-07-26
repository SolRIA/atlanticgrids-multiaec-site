<template>
  <q-select
    v-model="locale"
    :options="localeOptions"
    class="q-mx-md"
    borderless
    map-options
    emit-value
    hide-dropdown-icon
  >
    <template v-slot:prepend>
      <q-icon :name="getlogo(localeOption.icon)" />
    </template>
    <template v-slot:selected>
      <div class="text-subtitle2">{{ localeOption.label }}</div>
    </template>
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section avatar>
          <q-icon :name="getlogo(scope.opt.icon)" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ scope.opt.label }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import { apiPublicUrl } from 'boot/api'
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'LanguageSelector',
  emits: ['language_changed'],
  setup(_props, { emit }) {
    const $q = useQuasar()
    const { locale } = useI18n({ useScope: 'global' })

    let currentLocale = localStorage.getItem('lang')
    if (typeof currentLocale === 'undefined' || currentLocale === null)
      currentLocale = $q.lang.getLocale()

    const localeOptions = [
      { value: 'pt', label: 'Português', icon: 'imagens/paises/pt.svg' },
      { value: 'en-US', label: 'English', icon: 'imagens/paises/us.svg' }
    ]

    const localeOption = ref(
      localeOptions.find((l) =>
        l.value.startsWith(currentLocale.substring(0, 2))
      )
    )
    if (
      localeOption.value === null ||
      typeof localeOption.value === 'undefined'
    ) {
      localeOption.value = localeOptions[1]
    }
    locale.value = localeOption.value.value
    try {
      $q.lang.set(locale)
    } catch {}

    emit('language_changed', locale.value)

    const getlogo = (name) => {
      return 'img:' + apiPublicUrl(name)
    }

    watch(locale, (_value, _old) => {
      localeOption.value = localeOptions.find((l) => l.value === locale.value)
      import('quasar/lang/' + locale.value /* @vite-ignore */).then((lang) => {
        $q.lang.set(lang.default)
      })
      localStorage.setItem('lang', locale.value)
      emit('language_changed', locale.value)
    })

    return {
      locale,
      localeOption,
      localeOptions,
      getlogo
    }
  }
})
</script>
