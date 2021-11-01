<template>
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
        <q-input v-model="register.password" outlined
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
        <q-input v-model="register.nome" outlined label="Nome" class="col-xs-12 col-md-9"/>
        <q-select v-model="register.tipo_id" :options="tipos" label="Àrea de especialização" outlined option-label="nome" option-value="id" map-options emit-value class="col-xs-12 col-md-3"/>
        <q-input v-model="register.website" outlined label="Web" class="col-xs-12 col-md-3">
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
          <q-editor v-model="register.descricao" />
        </div>

        <div class="col-xs-12 col-md-3">
          <q-uploader url="http://localhost" label="Logotipo" flat bordered />
        </div>
      </div>
    </q-card-section>

    <q-separator inset />
    
    <q-card-actions align="right">
      <q-btn label="Voltar" type="reset" flat
            @click="onCancel"/>
      <q-btn color="primary" label="Criar conta" :icon="mdiLogin" size="lg"
          @click="onCancel" :loading="onCreatingAcount"/>
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { mdiEyeOff, mdiEye, mdiLogin, mdiCloseCircle, mdiWeb, mdiFacebook, mdiTwitter, mdiLinkedin } from '@quasar/extras/mdi-v6'
import { useQuasar } from 'quasar'
import { get } from 'boot/api'

export default defineComponent({
  name: 'RegistroEmpresa',
  props: { p: { type: Object, required: true } },
  emits: ['canceled', 'saved'],
  setup (props, { emit }) {
    const $q = useQuasar()

    const register = ref(Object.assign({ email: '', password: '', nome: '', ativo: true, tipo_id: 1, descricao: null, telefone: null, telemovel: null, website: null, facebook: null, twitter: null, linkedin: null, logo: null }, props.p))

    onMounted(async () => {
      try {
        tipos.value = await get('tiposempresa/read-ativo.php')
      } catch {
        $q.notify({ message: 'Não foi possível obter os tipos de empresa', type: 'warning' })
      }
    })

    const inputName = ref(null)
    const inputPassword = ref(null)

    const tipos = ref([])
    const isPwd = ref(true)
    let onCreatingAcount = ref(false)

    const isEmailRule = function (val) {
      return !!val || 'Insira o utilizador'
    }
    const isPasswordValid = function (val) {
      return !!val || 'Insira a password'
    }
    const onRegister = function () {
      // do login
      if (inputName.value.validate() && inputPassword.value.validate()) {
        onCreatingAcount = true
        
        // account has been created, 
        // TODO: create account on the api and show message to the user to wait for the aproval

        onCreatingAcount = false
        emit('saved')
      }
    }

    const onCancel = function () {
      emit('canceled')
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
      tipos,
      isPwd,
      onCreatingAcount,
      isEmailRule,
      isPasswordValid,
      onRegister,
      onCancel
    }
  }
})
</script>
