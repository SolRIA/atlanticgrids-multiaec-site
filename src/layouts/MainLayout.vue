<template>
  <q-layout view="lHh Lpr lFf">
    <q-header style="background-color: #fff">
      <q-toolbar>
        <router-link to="/">
          <q-img src="/images/logo.jpg" style="width: 180px"/>
        </router-link>
        <q-space></q-space>
        <router-link to="/Projetos">
          <p class="hover-underline-animation">Projetos</p>
        </router-link>
        <router-link to="/Login" class="q-mr-lg">
          <p class="hover-underline-animation">Login</p>
        </router-link>
        <!-- <q-btn class="toolbar-btn" flat no-caps to="/">MULTI AEC</q-btn>
        <q-space></q-space>
        <q-btn class="toolbar-btn" flat no-caps label="Ver Projetos" to="/Projetos"/>
        <q-btn class="toolbar-btn q-mx-md" flat no-caps label="Login" to="/Login"/> -->
      </q-toolbar>
    </q-header>

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
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',
})
</script>
