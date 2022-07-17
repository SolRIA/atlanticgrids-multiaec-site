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
        <LanguageSelector />

        <!-- <router-link to="/Projetos">
          <p class="hover-underline-animation">Bancos</p>
        </router-link>
        <router-link to="/associados" class="desktop-only">
          <p class="hover-underline-animation">Associados</p>
        </router-link>
        <router-link to="/projetos" class="desktop-only">
          <p class="hover-underline-animation">Projetos</p>
        </router-link> -->
        <q-btn
          label="Associados"
          to="/associados"
          flat
          no-caps
          stretch
          class="toolbar-btn"
        />
        <q-btn
          label="Projetos"
          to="/projetos"
          flat
          no-caps
          stretch
          class="toolbar-btn"
        />
        <q-btn label="Login" flat stretch no-caps class="toolbar-btn">
          <q-menu>
            <q-list style="min-width: 200px">
              <q-item clickable v-close-popup to="/login">
                <q-item-section>
                  <q-item-label>Login Associados</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup to="/login">
                <q-item-section>
                  <q-item-label>Login Parceiros</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator inset />
              <q-item clickable v-close-popup to="/login/registo">
                <q-item-section>
                  <q-item-label>Registo Associados</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup to="/login/registo-parceiro">
                <q-item-section>
                  <q-item-label>Registo Parceiros</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
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
.toolbar-btn {
  color: black;
  font-size: 20px;
}
/* .hover-underline-animation {
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
} */
</style>

<script>
import { mdiMenu } from '@quasar/extras/mdi-v6'
import { defineComponent, ref } from 'vue'
import LanguageSelector from 'src/components/LanguageSelector.vue'

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const leftDrawerOpen = ref(false)
    const menuList = ref([
      { url: '/associados', nome: 'Associados' },
      { url: '/projetos', nome: 'Projetos' },
      { url: '/projeto', nome: 'Projeto' },
      { url: '/mercado', nome: 'Mercado das Multilaterais' },
      { url: '/noticias', nome: 'Noticias' },
      { url: '/tutoriais', nome: 'Tutoriais' }
    ])
    return {
      mdiMenu,
      leftDrawerOpen,
      menuList
    }
  },
  components: { LanguageSelector }
})
</script>
