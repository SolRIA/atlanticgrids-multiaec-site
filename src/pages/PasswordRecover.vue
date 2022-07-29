<template>
  <q-page-container class="col-sm-12 col-md-9">
    <q-page padding class="fit row justify-center items-center">
      <q-card bordered class="card-login q-pa-lg">
        <q-card-section>
          <div class="text-h6">{{ $t('html.index.passwordRecover') }}</div>
        </q-card-section>

        <q-separator inset />

        <q-card-section>
          <p>{{ $t('html.recover.recoverMessage') }}</p>
          <q-input
            v-model="username"
            outlined
            :label="$t('html.registerPartner.username')"
            :rules="[isUsernameRule]"
            ref="inputName"
          >
            <template v-if="username" v-slot:append>
              <q-icon
                :name="mdiCloseCircle"
                @click.stop="username = null"
                class="cursor-pointer"
              />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions>
          <q-btn
            color="primary"
            size="lg"
            class="full-width"
            :label="$t('html.index.passwordRecover')"
            :icon="mdiEmailSend"
            @click="doRecover"
            :loading="onRecoverAccount"
          />
        </q-card-actions>
      </q-card>

      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab :icon="mdiHome" color="accent" to="/" />
      </q-page-sticky>
    </q-page>
  </q-page-container>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { mdiEmailSend, mdiCloseCircle, mdiHome } from '@quasar/extras/mdi-v6'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import { post } from 'src/boot/api'

export default defineComponent({
  setup() {
    const $q = useQuasar()
    const $router = useRouter()
    const { t } = useI18n()

    const inputName = ref(null)

    const username = ref('')
    let onRecoverAccount = ref(false)

    const isUsernameRule = function (val) {
      return !!val || t('html.errors.noUsername')
    }
    const doRecover = async () => {
      // do login
      if (inputName.value.validate()) {
        onRecoverAccount = true

        try {
          await post('utilizadores/password-pedido-recuperacao.php', {
            username: username.value
          })
        } catch {
          $q.notify({
            message: t('html.errors.error'),
            type: 'warning'
          })
        }

        $router.push('/')

        onRecoverAccount = false
      }
    }

    return {
      mdiEmailSend,
      mdiCloseCircle,
      mdiHome,
      inputName,
      username,
      onRecoverAccount,
      isUsernameRule,
      doRecover
    }
  }
})
</script>

<style lang="sass" scoped>
.card-login
  width: 100%
  max-width: 600px
</style>
