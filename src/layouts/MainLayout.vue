<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      class="q-py-sm"
      style="background-color: #1c1b21"
      :style="'border-bottom: 2px solid ' + theme_color">
      <q-toolbar>
        <q-btn flat to="/">MULTI AEC</q-btn>
        <q-space></q-space>
          <q-btn
            :style="'background:' + theme_color + '; color: white'"
            label="ver projetos"
            to="/Projetos"/>
          <q-btn class="q-mx-md"
            :style="'background:' + theme_color + '; color: white'"
            label="login"
            to="/Login"/>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import { config, methods } from 'boot/config.js'

export default defineComponent({
  name: 'MainLayout',

  setup () {
    methods.init()

    return {
      theme_color: config.theme_color,
      bg_color: config.bg_color
    }
  }
})
</script>
