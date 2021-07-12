<template>
  <q-layout class="image" view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<style lang="sass" scoped>
.image
  background-image: url('/images/mainslide5_compressed.jpg')
  background-size: cover
</style>