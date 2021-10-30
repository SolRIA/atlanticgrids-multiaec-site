<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          :icon="mdiMenu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          {{ username }}
        </q-toolbar-title>

        <q-space />

        <q-btn
          flat
          round
          dense
          :icon="mdiLogout"
          @click="onLogout"
        />
      </q-toolbar>

    </q-header>

    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :mini="miniState"
      mini-to-overlay
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      class="bg-grey-2">
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item clickable exact v-ripple active-class="text-green">
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
          </template>

        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { mdiMenu, mdiLogout, mdiCogs, mdiAccountHardHat, mdiAccountGroup, mdiBank, mdiFlag } from '@quasar/extras/mdi-v5'

export default {
  setup () {
    const $router = useRouter()

    methods.init()

    const leftDrawerOpen = ref(false)

    const menuList = [
      {
        icon: mdiCogs,
        label: 'Conta'
      },
      {
        icon: mdiAccountGroup,
        label: 'Empresas'
      },
      {
        icon: mdiAccountHardHat,
        label: 'Projetos'
      },
      {
        icon: mdiBank,
        label: 'Bancos'
      },
      {
        icon: mdiFlag,
        label: 'Paises'
      }
    ]

    return {
      mdiMenu,
      mdiLogout,
      leftDrawerOpen,
      miniState: ref(true),
      menuList,
      username: methods.getUsername(),
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      onLogout () {
        $router.push('/');
      }
    }
  }
}
</script>
