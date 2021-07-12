<template>
  <q-page-container class="col-sm-12 col-md-9">
    <q-page padding class="fit row justify-center items-center">
      <q-card dark bordered class="card-login">
        <q-card-section>
          <div class="text-h6">Criar nova conta</div>
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
            <q-input v-model="password" dark outlined @keydown.enter.prevent="doRegister"
                    :type="isPwd ? 'password' : 'text'" label="password"
                    :rules="[isPasswordValid]" ref="inputPassword">
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? mdiEyeOff : mdiEye"
                  class="cursor-pointer" aria-hidden="true"
                  @click="isPwd = !isPwd"/>
                <q-icon v-if="password" :name="mdiCloseCircle" @click.stop="password = null" class="cursor-pointer" />
              </template>
            </q-input>
          </q-form>
        </q-card-section>
        
        <q-card-actions>
          <q-btn color="primary" size="lg" class="full-width" label="Criar conta" :icon="mdiLogin"
              @click="doRegister" :loading="onCreatingAcount"/>
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
import { mdiEyeOff, mdiEye, mdiLogin, mdiCloseCircle } from '@quasar/extras/mdi-v5'
import { useRouter } from 'vue-router'
import { methods } from 'boot/config.js'

export default defineComponent({
  setup () {
    const $router = useRouter()

    const inputName = ref(null)
    const inputPassword = ref(null)

    const email = ref('')
    const password = ref('')
    const isPwd = ref(true)
    let onCreatingAcount = ref(false)

    const isEmailRule = function (val) {
      return !!val || 'Insira o utilizador'
    }
    const isPasswordValid = function (val) {
      return !!val || 'Insira a password'
    }
    const doRegister = function () {
      // do login
      if (inputName.value.validate() && inputPassword.value.validate()) {
        onCreatingAcount = true
        
        methods.setUsername(email)
        $router.push('registed')

        onCreatingAcount = false
      }
    }

    const returnPrevious = function () {
      $router.go(-1)
    }

    return {
      mdiEyeOff,
      mdiEye,
      mdiLogin,
      mdiCloseCircle,
      inputName,
      inputPassword,
      email,
      password,
      isPwd,
      onCreatingAcount,
      isEmailRule,
      isPasswordValid,
      doRegister,
      returnPrevious
    }
  }
})
</script>
