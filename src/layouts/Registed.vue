<template>
  <q-layout view="hHh Lpr fFf">
    <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header elevated class="bg-grey-2">
      <q-toolbar>
        <q-btn
          :icon="mdiMenu"
          @click="toggleLeftDrawer"
          flat
          stretch
          color="black"
        />

        <q-toolbar-title>
          <div class="text-black">{{ username }}</div>
        </q-toolbar-title>

        <q-space />

        <LanguageSelector />

        <q-btn
          flat
          stretch
          color="black"
          :label="$t('html.registed.invite')"
          :href="
            'mailto:?subject=MultiAEC&body=' + $t('html.registed.inviteMessage')
          "
        />
        <q-btn :icon="mdiLogout" @click="onLogout" flat stretch color="black" />
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
      class="bg-grey-2"
    >
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
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.nome }}
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="bg-blue-grey-2">
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped lang="sass">
.q-router-link--exact-active
  background: $positive
.menu-list .q-item
  border-radius: 4px
  margin: 3px
</style>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth } from 'boot/api'
import { mdiMenu, mdiLogout } from '@quasar/extras/mdi-v6'
import LanguageSelector from 'src/components/LanguageSelector.vue'

export default {
  components: { LanguageSelector },
  setup() {
    const $router = useRouter()
    const leftDrawerOpen = ref(false)
    const menuList = ref([])
    onMounted(async () => {
      try {
        menuList.value = await getAuth('menu/read.php')
      } catch (e) {
        console.error(e)
      }
    })
    return {
      mdiMenu,
      mdiLogout,
      leftDrawerOpen,
      miniState: ref(true),
      menuList,
      username: localStorage.getItem('login'),
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      onLogout() {
        localStorage.removeItem('login')
        localStorage.removeItem('token')
        $router.push('/login')
      }
    }
  }
}
</script>
