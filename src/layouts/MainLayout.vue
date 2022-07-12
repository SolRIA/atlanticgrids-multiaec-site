<template>
  <q-layout view="hHh Lpr fFf">
    <q-header style="background-color: #fff">
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          color="black"
          :icon="mdiMenu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <router-link to="/">
          <q-img
            src="/images/ptpc_logo_2022.png"
            style="width: 181px"
            class="q-ma-sm"
          />
        </router-link>
        <q-space></q-space>
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
        <!-- <router-link to="/Projetos">
          <p class="hover-underline-animation">Bancos</p>
        </router-link> -->
        <router-link to="/associados" class="desktop-only">
          <p class="hover-underline-animation">Associados</p>
        </router-link>
        <router-link to="/projetos" class="desktop-only">
          <p class="hover-underline-animation">Projetos</p>
        </router-link>
        <router-link to="/login" class="q-mr-lg desktop-only">
          <p class="hover-underline-animation">Login</p>
        </router-link>
        <!-- <q-btn class="toolbar-btn" flat no-caps to="/">MULTI AEC</q-btn>
        <q-space></q-space>
        <q-btn class="toolbar-btn" flat no-caps label="Ver Projetos" to="/Projetos"/>
        <q-btn class="toolbar-btn q-mx-md" flat no-caps label="Login" to="/Login"/> -->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" overlay bordered class="bg-grey-2">
      <q-scroll-area class="fit">
        <q-list class="menu-list">
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item
              clickable
              exact
              v-ripple
              active-class="text-white"
              :to="menuItem.url"
            >
              <q-item-section>
                {{ menuItem.nome }}
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.hover-underline-animation {
  display: inline-block;
  position: relative;
  color: black;
  font-size: 22px;
  margin-right: 20px;
  margin-top: 10px;
}

.hover-underline-animation:after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #ec1c23;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.hover-underline-animation:hover:after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>

<script>
import { mdiTranslate, mdiMenu } from '@quasar/extras/mdi-v6'
import { defineComponent, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import { apiPublicUrl } from 'boot/api'

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const $q = useQuasar()
    const { locale } = useI18n({ useScope: 'global' })

    console.log(locale.value)

    const currentLocale = ref($q.lang.getLocale())
    const localeOptions = [
      { value: 'pt', label: 'Português', icon: 'imagens/paises/pt.svg' },
      { value: 'en-US', label: 'English', icon: 'imagens/paises/us.svg' }
    ]
    const localeOption = ref(
      localeOptions.find((l) => l.value === locale.value)
    )

    const leftDrawerOpen = ref(false)
    const menuList = ref([
      { url: '/associados', nome: 'Associados' },
      { url: '/projetos', nome: 'Projetos' },
      { url: '/projeto', nome: 'Projeto' },
      { url: '/mercado', nome: 'Mercado das Multilaterais' },
      { url: '/noticias', nome: 'Noticias' },
      { url: '/tutoriais', nome: 'Tutoriais' }
    ])
    const getlogo = (name) => {
      return 'img:' + apiPublicUrl(name)
    }

    watch(locale, (_value, _old) => {
      localeOption.value = localeOptions.find((l) => l.value === locale.value)
    })

    return {
      mdiTranslate,
      mdiMenu,
      locale,
      localeOption,
      localeOptions,
      leftDrawerOpen,
      menuList,
      currentLocale,
      getlogo
    }
  }
})
</script>
