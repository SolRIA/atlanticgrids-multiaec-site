<template>
  <q-page-container class="col-sm-12 col-md-9">
    <q-page padding class="fit row justify-center items-center">
      <q-card bordered class="card-login">
        <q-card-section>
          <div class="text-h6">Login</div>
        </q-card-section>

        <q-separator inset />

        <q-card-section>
          <q-form class="q-gutter-sm">
            <q-input v-model="email" outlined label="utilizador"
                    :rules="[isEmailRule]" ref="inputName">
              <template v-if="email" v-slot:append>
                <q-icon :name="mdiCloseCircle" @click.stop="email = null" class="cursor-pointer" />
              </template>
            </q-input>
            <q-input v-model="password" outlined @keydown.enter.prevent="doLogin"
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
        
        <q-card-actions align="center">
          <q-btn rounded color="primary" class="text-white action-btn" size="lg" label="Login" :icon="mdiLogin"
              @click="doLogin" :loading="onLogin"/>
        </q-card-actions>
        <q-card-section class="q-pa-none">
          <q-btn-group spread>
            <q-btn label="Voltar" type="reset" flat
                @click="returnPrevious"/>
            <q-btn label="Criar conta" type="reset" flat
                to="/login/registo"/>
            <q-btn label="Recuperar senha" type="reset" flat
                to="/login/recuperarPassword" />
          </q-btn-group>
        </q-card-section>
      </q-card>
    </q-page>
  </q-page-container>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { mdiEyeOff, mdiEye, mdiLogin, mdiCloseCircle } from '@quasar/extras/mdi-v6'
import { post } from 'boot/api'
import { useQuasar } from 'quasar'
 
export default defineComponent({
  setup () {
    const $router = useRouter()
    const $q = useQuasar()

    const inputName = ref(null)
    const inputPassword = ref(null)

    const email = ref('')
    const password = ref('')
    const isPwd = ref(true)
    let onLogin = ref(false)

    const isEmailRule = function (val) {
      return !!val || 'Insira o utilizador'
    }
    const isPasswordValid = function (val) {
      return !!val || 'Insira a password'
    }
    const doLogin = async () => {
      // do login
      if (inputName.value.validate() && inputPassword.value.validate()) {
        onLogin = true

        try {
          const response = await post('utilizadores/login.php', { username: email.value, password: password.value });
          if (response.ok) {
            localStorage.setItem('login', email.value)
            localStorage.setItem('token', JSON.stringify(response))
            
            $router.push('registed')
          } else {
            $q.notify({ message: 'Credenciais inválidas', type: 'warning' })
          }
        } catch (error) {
          console.log(error)
          $q.notify({ message: 'Não foi possível efetuar o login', type: 'warning' })
        }

        onLogin = false
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
      onLogin,
      isEmailRule,
      isPasswordValid,
      doLogin,
      returnPrevious
    }
  }
})
</script>

<style lang="sass" scoped>
.card-login
  width: 100%
  max-width: 500px
</style>