<template>
  <q-page padding>
    <div class="column items-center justify-center">
      <q-card style="max-width: 350px">
        <q-card-section>
          <div class="text-h5 text-center">{{ message }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div v-if="showSuccess" class="column items-center">
            <q-icon
              :name="mdiCheckDecagramOutline"
              size="4rem"
              color="positive"
            />
          </div>
          <div v-if="showError" class="column items-center">
            <q-icon
              :name="mdiAlertDecagramOutline"
              size="4rem"
              color="primary"
            />
          </div>
        </q-card-section>

        <q-inner-loading :showing="loading">
          <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { post } from 'boot/api'
import { nomeAccao } from 'models/accoes-projetos.js'
import {
  mdiAlertDecagramOutline,
  mdiCheckDecagramOutline
} from '@quasar/extras/mdi-v6'

export default defineComponent({
  setup() {
    const $route = useRoute()

    const message = ref('')
    const loading = ref(false)
    const showSuccess = ref(false)
    const showError = ref(false)

    onMounted(async () => {
      try {
        loading.value = true
        const response = await post('projetos/accoes.php?', {
          codigo: $route.query.codigo
        })

        message.value =
          'O pedido foi guardado com sucesso. Acção registada: ' +
          nomeAccao(response.accao)
        showSuccess.value = true
      } catch {
        message.value = 'Não foi possível terminar o pedido'
        showError.value = true
      }
      loading.value = false
    })

    return {
      message,
      loading,
      showSuccess,
      showError,
      mdiCheckDecagramOutline,
      mdiAlertDecagramOutline
    }
  }
})
</script>
