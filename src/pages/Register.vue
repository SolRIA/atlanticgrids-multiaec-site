<template>
  <q-page-container class="col-sm-12 col-md-9">
    <q-page padding class="fit row justify-center items-center">
      <registo-empresa v-bind:p="register" @canceled="returnPrevious" @saved="returnPrevious"/>
    </q-page>
  </q-page-container>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import RegistoEmpresa from 'src/components/RegistoEmpresa.vue'

export default defineComponent({
  components: { RegistoEmpresa },
  setup () {
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
