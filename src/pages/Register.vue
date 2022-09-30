<template>
  <q-page-container class="col-sm-12 col-md-9">
    <q-page padding class="fit row justify-center items-center">
      <registo-empresa v-bind:p="register" @canceled="returnPrevious" @saved="onCreated" />
    </q-page>
  </q-page-container>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import RegistoEmpresa from 'src/components/RegistoEmpresa.vue'

export default defineComponent({
  components: { RegistoEmpresa },
  setup() {
    const $q = useQuasar()
    const { t } = useI18n()
    const $router = useRouter()
    const register = {}

    onMounted(() => {
      $q.dialog({
        title: t('html.errors.warning'),
        message: t('html.login.associateWarning'),
        html: true
      })
    })

    const onCreated = function () {
      // mostrar mensagem de registo criado
      $q.dialog({
        title: t('html.registerPartner.register'),
        message: t('html.registerPartner.success'),
        persistent: true
      }).onOk(() => {
        $router.go(-1)
      })
    }
    const returnPrevious = function () {
      $router.go(-1)
    }

    return {
      register,
      onCreated,
      returnPrevious
    }
  }
})
</script>
