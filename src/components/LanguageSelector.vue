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
      {{ localeOption.label }}
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
  setup() {
    const $q = useQuasar()
    const { locale } = useI18n({ useScope: 'global' })

    let currentLocale = localStorage.getItem('lang')
    if (typeof currentLocale === 'undefined' || currentLocale === null)
      currentLocale = $q.lang.getLocale()

    console.log('quasar locale useI18n', locale.value)
    console.log('quasar locale ', $q.lang.isoName)
    console.log('browser locale', currentLocale)

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
    $q.lang.set(locale)

    console.log('quasar locale after change', $q.lang.isoName)

    const getlogo = (name) => {
      return 'img:' + apiPublicUrl(name)
    }

    watch(locale, (_value, _old) => {
      localeOption.value = localeOptions.find((l) => l.value === locale.value)
      import('quasar/lang/' + locale.value /* @vite-ignore */).then((lang) => {
        $q.lang.set(lang.default)
      })
      localStorage.setItem('lang', locale.value)
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