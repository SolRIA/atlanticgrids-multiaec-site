<template>
  <q-page padding>
    <h2>Conta: {{ username }}</h2>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      username: localStorage.getItem('login')

    }
  }
})
</script>
