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
          <q-img src="/images/logo.jpg" style="width: 180px" />
        </router-link>
        <q-space></q-space>
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
      <SimpleSeparator />
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
import { defineComponent, ref } from 'vue'
import { mdiMenu } from '@quasar/extras/mdi-v6'
import SimpleSeparator from 'src/components/SimpleSeparator.vue'

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
  components: { SimpleSeparator }
})
</script>
