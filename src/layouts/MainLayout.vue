<template>
  <q-layout view="lHh Lpr lFf">
    <q-header style="background-color: #fff">
      <q-toolbar>
        <q-btn class="toolbar-btn" flat no-caps to="/">MULTI AEC</q-btn>
        <q-space></q-space>
        <q-btn class="toolbar-btn" flat no-caps label="Ver Projetos" to="/Projetos"/>
        <q-btn class="toolbar-btn q-mx-md" flat no-caps label="Login" to="/Login"/>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',
})
</script>
