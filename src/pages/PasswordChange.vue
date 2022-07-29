<template>
  <q-page-container class="col-sm-12 col-md-9">
    <q-page padding class="fit row justify-center items-center">
      <q-card bordered class="card-login q-pa-lg">
        <q-card-section>
          <div class="text-h6">{{ $t('html.index.passwordRecover') }}</div>
        </q-card-section>

        <q-separator inset />

        <q-card-section>
          <p>{{ $t('html.recover.changePasswordMessage') }}</p>
          <q-input
            v-model="password"
            outlined
            :type="isPwd ? 'password' : 'text'"
            label="Password"
            :rules="[isPasswordRule]"
            ref="inputPassword"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? mdiEyeOff : mdiEye"
                class="cursor-pointer"
                aria-hidden="true"
                @click="isPwd = !isPwd"
              />
              <q-icon
                v-if="password"
                :name="mdiCloseCircle"
                @click.stop="password = null"
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
import {
  mdiEmailSend,
  mdiCloseCircle,
  mdiHome,
  mdiEyeOff,
  mdiEye
} from '@quasar/extras/mdi-v6'
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import { post } from 'src/boot/api'

export default defineComponent({
  setup() {
    const $q = useQuasar()
    const $router = useRouter()
    const $route = useRoute()
    const { t } = useI18n()

    const inputPassword = ref(null)

    const password = ref('')
    const isPwd = ref(true)
    const token = ref('')
    let onRecoverAccount = ref(false)

    onMounted(() => {
      token.value = $route.query.token
    })

    const isPasswordRule = function (val) {
      return !!val || t('html.errors.noPassword')
    }
    const doRecover = async () => {
      // do login
      if (inputPassword.value.validate()) {
        onRecoverAccount = true

        try {
          const result = await post('utilizadores/password-recupera.php', {
            token: token.value,
            password: password.value
          })

          if (result.ok) {
            $router.push('/login')
          } else {
            $q.notify({
              message: t('html.errors.error'),
              type: 'warning'
            })
          }
        } catch {
          $q.notify({
            message: t('html.errors.error'),
            type: 'warning'
          })
        }

        onRecoverAccount = false
      }
    }

    return {
      mdiEmailSend,
      mdiCloseCircle,
      mdiHome,
      mdiEyeOff,
      mdiEye,
      inputPassword,
      password,
      isPwd,
      onRecoverAccount,
      isPasswordRule,
      doRecover
    }
  }
})
</script>

<style lang="sass" scoped>
.card-login
  width: 100%
  max-width: 500px
</style>
