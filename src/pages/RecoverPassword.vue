<template>
  <q-page-container class="col-sm-12 col-md-9">
    <q-page padding class="fit row justify-center items-center">
      <q-card dark bordered class="card-login">
        <q-card-section>
          <div class="text-h6">Recuperar password</div>
        </q-card-section>

        <q-separator dark inset />

        <q-card-section>
          <q-form class="q-gutter-sm">
            <q-input v-model="email" dark outlined type="email" label="email"
                    :rules="[isEmailRule]" ref="inputName">
              <template v-if="email" v-slot:append>
                <q-icon :name="mdiCloseCircle" @click.stop="email = null" class="cursor-pointer" />
              </template>
            </q-input>
          </q-form>
        </q-card-section>
        
        <q-card-actions>
          <q-btn color="primary" size="lg" class="full-width" label="Recuperar password" :icon="mdiEmailSend"
              @click="doRecover" :loading="onRecoverAccount"/>
        </q-card-actions>
        <q-card-section class="q-pa-none">
          <q-btn-group spread>
            <q-btn label="Voltar" type="reset" color="white" flat
                @click="returnPrevious"/>
          </q-btn-group>
        </q-card-section>
      </q-card>
    </q-page>
  </q-page-container>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { mdiEmailSend, mdiCloseCircle } from '@quasar/extras/mdi-v5'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup () {
    const $router = useRouter()

    const inputName = ref(null)

    const email = ref('')
    let onRecoverAccount = ref(false)

    const isEmailRule = function (val) {
      return !!val || 'Insira o utilizador'
    }
    const doRecover = function () {
      // do login
      if (inputName.value.validate() && inputPassword.value.validate()) {
        onRecoverAccount = true
        
        $router.push('/')

        onRecoverAccount = false
      }
    }

    const returnPrevious = function () {
      $router.go(-1)
    }

    return {
      mdiEmailSend,
      mdiCloseCircle,
      inputName,
      email,
      onRecoverAccount,
      isEmailRule,
      doRecover,
      returnPrevious
    }
  }
})
</script>
