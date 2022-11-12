<template>
  <q-layout view="hHh lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style lang="sass" scoped>
.q-page-container
  padding-top: 0px !important

.q-header
  background: transparent
</style>
