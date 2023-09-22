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

        <q-btn
          :label="$t('html.sideMenu.associates')"
          to="/associados"
          flat
          no-caps
          stretch
          class="toolbar-btn"
        />
        <q-btn
          :label="$t('html.sideMenu.projects')"
          to="/projetos"
          flat
          no-caps
          stretch
          class="toolbar-btn"
        />

        <q-btn
          :label="$t('html.sideMenu.tutoriais')"
          to="/tutoriais"
          flat
          no-caps
          stretch
          class="toolbar-btn"
        />

        <q-btn
          :label="$t('html.sideMenu.faqs')"
          to="/faqs"
          flat
          no-caps
          stretch
          class="toolbar-btn"
        />
        <q-btn
          :label="$t('html.sideMenu.login')"
          to="/login"
          flat
          no-caps
          stretch
          class="toolbar-btn"
        />
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
                {{ $t(menuItem.nome) }}
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

<style scoped lang="sass">
.toolbar-btn
  color: black
  font-size: 20px

.q-router-link--exact-active
  background: $primary

.menu-list .q-item
  border-radius: 4px
  margin: 3px

// .hover-underline-animation {
//   display: inline-block;
//   position: relative;
//   color: black;
//   font-size: 22px;
//   margin-right: 20px;
//   margin-top: 10px;
// }

// .hover-underline-animation:after {
//   content: '';
//   position: absolute;
//   width: 100%;
//   transform: scaleX(0);
//   height: 2px;
//   bottom: 0;
//   left: 0;
//   background-color: #ec1c23;
//   transform-origin: bottom right;
//   transition: transform 0.25s ease-out;
// }

// .hover-underline-animation:hover:after {
//   transform: scaleX(1);
//   transform-origin: bottom left;
// }
</style>

<script>
import { mdiMenu } from "@quasar/extras/mdi-v6";
import { defineComponent, ref } from "vue";
import LanguageSelector from "src/components/LanguageSelector.vue";

export default defineComponent({
  name: "MainLayout",
  setup() {
    const leftDrawerOpen = ref(false);
    const menuList = ref([
      { url: "/associados", nome: "html.sideMenu.associates" },
      { url: "/projetos", nome: "html.sideMenu.projects" },
      { url: "/projeto", nome: "html.sideMenu.project" },
      { url: "/mercado", nome: "html.sideMenu.multiAEC" },
      { url: "/noticias", nome: "html.sideMenu.news" },
      { url: "/tutoriais", nome: "html.sideMenu.tutoriais" },
    ]);
    return {
      mdiMenu,
      leftDrawerOpen,
      menuList,
    };
  },
  components: { LanguageSelector },
});
</script>
