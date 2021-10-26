<template>
  <q-page-container class="col-sm-12 col-md-9">
    <q-page padding class="fit row justify-center items-center">
      <q-card bordered class="card-login">
        <q-card-section>
          <div class="row q-col-gutter-sm">
            <div class="text-h6 col-12">Utilizador</div>
            <q-input v-model="register.email" outlined type="email" label="Email" class="col-xs-12 col-md-6"
                    :rules="[isEmailRule]" ref="inputName">
              <template v-if="register.email" v-slot:append>
                <q-icon :name="mdiCloseCircle" @click.stop="register.email = null" class="cursor-pointer" />
              </template>
            </q-input>
            <q-input v-model="register.password" outlined @keydown.enter.prevent="doRegister"
                    :type="isPwd ? 'password' : 'text'" label="Password" class="col-xs-12 col-md-6"
                    :rules="[isPasswordValid]" ref="inputPassword">
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? mdiEyeOff : mdiEye"
                  class="cursor-pointer" aria-hidden="true"
                  @click="isPwd = !isPwd"/>
                <q-icon v-if="register.password" :name="mdiCloseCircle" @click.stop="register.password = null" class="cursor-pointer" />
              </template>
            </q-input>

            <div class="text-h6 col-12">Empresa</div>
            <q-input v-model="register.orgname" outlined label="Nome" class="col-xs-12 col-md-9"/>
            <q-select v-model="register.type" :options="types" label="Àrea de especialização" outlined class="col-xs-12 col-md-3"/>
            <q-input v-model="register.web" outlined label="Web" class="col-xs-12 col-md-3">
              <template v-slot:append>
                <q-icon :name="mdiWeb" color="primary"/>
              </template>
            </q-input>
            <q-input v-model="register.facebook" outlined label="Facebook" class="col-xs-12 col-md-3">
            <template v-slot:append>
                <q-icon :name="mdiFacebook" color="primary"/>
              </template>
            </q-input>
            <q-input v-model="register.twitter" outlined label="Twitter" class="col-xs-12 col-md-3">
              <template v-slot:append>
                <q-icon :name="mdiTwitter" color="primary"/>
              </template>
            </q-input>
            <q-input v-model="register.linkedin" outlined label="LinkedIn" class="col-xs-12 col-md-3">
              <template v-slot:append>
                <q-icon :name="mdiLinkedin" color="primary"/>
              </template>
            </q-input>
          </div>
        </q-card-section>

        <q-card-section>
          <div class="row q-col-gutter-sm">
            <div class="col-xs-12 col-md-9">
              <q-editor v-model="register.descrition" />
            </div>

            <div class="col-xs-12 col-md-3">
              <q-uploader url="http://localhost" label="Logotipo" flat bordered />
            </div>
          </div>
        </q-card-section>

        <q-separator inset />
        
        <q-card-actions align="right">
          <q-btn label="Voltar" type="reset" flat
                @click="returnPrevious"/>
          <q-btn color="primary" label="Criar conta" :icon="mdiLogin" size="lg"
              @click="doRegister" :loading="onCreatingAcount"/>
        </q-card-actions>
      </q-card>
    </q-page>
  </q-page-container>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { mdiEyeOff, mdiEye, mdiLogin, mdiCloseCircle, mdiWeb, mdiFacebook, mdiTwitter, mdiLinkedin } from '@quasar/extras/mdi-v6'
import { useRouter } from 'vue-router'
import { methods } from 'boot/config.js'

export default defineComponent({
  setup () {
    const $router = useRouter()

    const inputName = ref(null)
    const inputPassword = ref(null)

    const types = ref([ 'Engenharia e Contruções', 'Fiscalização / Auditoria', 'Consultoria Especializada', 'Fornecimento Matérias Primas', 'Projetos & Estudos de Engenharia e Arquitetura' ])

    const register = ref({ email: '', password: '', orgname: '', type: 'Engenharia e Contruções', descrition: null, web: null, facebook: null, twitter: null, linkedin: null, logo: null })
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
        
        methods.setUsername(register.value.email)
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
      mdiWeb, 
      mdiFacebook, 
      mdiTwitter, 
      mdiLinkedin,
      inputName,
      inputPassword,
      register,
      types,
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
