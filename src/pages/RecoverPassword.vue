<template>
  <q-page-container class="col-sm-12 col-md-9">
    <q-page padding class="fit row justify-center items-center">
      <q-card bordered class="card-login">
        <q-card-section>
          <div class="text-h6">{{ $t('html.index.passwordRecover') }}</div>
        </q-card-section>

        <q-separator inset />

        <q-card-section>
          <q-input
            v-model="email"
            outlined
            type="email"
            label="email"
            :rules="[isEmailRule]"
            ref="inputName"
          >
            <template v-if="email" v-slot:append>
              <q-icon
                :name="mdiCloseCircle"
                @click.stop="email = null"
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

export default defineComponent({
  setup() {
    const $router = useRouter()
    const { t } = useI18n()

    const inputName = ref(null)

    const email = ref('')
    let onRecoverAccount = ref(false)

    const isEmailRule = function (val) {
      return !!val || t('html.errors.noUsername')
    }
    const doRecover = function () {
      // do login
      if (inputName.value.validate() && inputPassword.value.validate()) {
        onRecoverAccount = true

        //TODO: recover password
        $router.push('/')

        onRecoverAccount = false
      }
    }

    return {
      mdiEmailSend,
      mdiCloseCircle,
      mdiHome,
      inputName,
      email,
      onRecoverAccount,
      isEmailRule,
      doRecover
    }
  }
})
</script>
