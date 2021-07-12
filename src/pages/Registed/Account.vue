<template>
  <q-page padding>
    <h2>Conta: {{ username }}</h2>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { methods } from 'boot/config.js'

export default defineComponent({
  setup () {
    return {
      username: methods.getUsername()
    }
  }
})
</script>
