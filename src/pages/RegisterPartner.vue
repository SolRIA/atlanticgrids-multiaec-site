<template>
  <q-page-container class="col-sm-12 col-md-9">
    <q-page padding class="fit row justify-center items-center">
      <registo-parceiro
        v-bind:p="register"
        @canceled="returnPrevious"
        @saved="returnPrevious"
      />
    </q-page>
  </q-page-container>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import RegistoParceiro from 'src/components/RegistoParceiro.vue'

export default defineComponent({
  components: { RegistoParceiro },
  setup() {
    const $router = useRouter()
    const register = {}

    const returnPrevious = function () {
      $router.go(-1)
    }

    return {
      register,
      returnPrevious
    }
  }
})
</script>
