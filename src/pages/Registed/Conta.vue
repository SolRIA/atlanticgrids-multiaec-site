<template>
  <q-page padding>
    <q-card>
      <q-tabs v-model="tab" outside-arrows inline-label mobile-arrows align="center" class="bg-primary text-white shadow-2" narrow-indicator>
        <q-tab name="empresa" :icon="mdiAccountGroup" label="Empresa" :disable="!empresaExistente" />
        <q-tab name="descricao" :icon="mdiFileDocumentEditOutline" label="Descrição" :disable="!empresaExistente" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab">
        <q-tab-panel name="empresa">
          <div class="row justify-center">
            <q-img :src="apiPublicUrl(empresa.logo)" style="height: 80px" fit="scale-down" />
          </div>
          <q-chip square color="primary" text-color="white" :icon="mdiShieldCheckOutline" size="lg">
            {{ utilizador.perfil }}
          </q-chip>
          <div class="row q-col-gutter-md">
            <q-input v-model="utilizador.username" outlined label="Utilizador" :rules="[isUsernamevalid]" ref="inputUsername" class="col-xs-12 col-md-6">
              <template v-if="utilizador.username" v-slot:append>
                <q-icon :name="mdiCloseCircle" @click.stop="utilizador.username = null" class="cursor-pointer" />
              </template>
            </q-input>
            <q-input v-model="utilizador.password" outlined lazy-rules="" :type="isPwd ? 'password' : 'text'" label="Password" class="col-xs-12 col-md-6">
              <template v-slot:append>
                <q-icon :name="isPwd ? mdiEyeOff : mdiEye" class="cursor-pointer" aria-hidden="true" @click="isPwd = !isPwd" />
                <q-icon v-if="utilizador.password" :name="mdiCloseCircle" @click.stop="utilizador.password = null" class="cursor-pointer" />
              </template>
            </q-input>

            <q-input v-model="empresa.nome" :rules="[isNameValid]" label="Nome Fiscal" ref="inputName" outlined class="col-xs-12 col-md-6" />
            <q-input v-model="empresa.titulo" label="Nome" outlined class="col-xs-12 col-md-6" />
            <q-input v-model="empresa.email" label="Email" :rules="[isEmailRule]" ref="inputEmail" outlined clearable class="col-xs-12 col-md-4" />

            <q-input v-model="empresa.nif" outlined label="NIF" :rules="[isNifValid]" ref="inputNif" class="col-xs-12 col-md-4" />

            <q-input v-model="empresa.cae" outlined label="CAE" :rules="[isCaeValid]" ref="inputCae" class="col-xs-12 col-md-4" />

            <TipoProjetoSelector :tipos="tiposProjeto" :tipo="empresa.tipos_projeto" @tipo_projeto_updated="tipoProjetoUpdated" class="col-xs-12" />

            <q-select v-model="empresa.concelho_id" :options="concelhos" label="Concelho" option-label="nome" option-value="id" @filter="filterFn" use-input emit-value map-options outlined :rules="[isConcelhoValid]" ref="inputConcelho" class="col-xs-12" />

            <q-input v-model="empresa.morada" outlined type="textarea" label="Morada" class="col-xs-12" />

            <q-input v-model="empresa.telemovel" outlined label="Telemóvel" class="col-xs-12 col-md-4">
              <template v-slot:append>
                <q-icon :name="mdiCellphone" color="primary" />
              </template>
            </q-input>

            <q-input v-model="empresa.telefone" outlined label="Telefone" class="col-xs-12 col-md-4">
              <template v-slot:append>
                <q-icon :name="mdiPhoneClassic" color="primary" />
              </template>
            </q-input>

            <q-input v-model="empresa.website" outlined label="Web" class="col-xs-12 col-md-4">
              <template v-slot:append>
                <q-icon :name="mdiWeb" color="primary" />
              </template>
            </q-input>

            <q-input v-model="empresa.facebook" outlined label="Facebook" class="col-xs-12 col-md-4">
              <template v-slot:append>
                <q-icon :name="mdiFacebook" color="primary" />
              </template>
            </q-input>
            <q-input v-model="empresa.twitter" outlined label="Twitter" class="col-xs-12 col-md-4">
              <template v-slot:append>
                <q-icon :name="mdiTwitter" color="primary" />
              </template>
            </q-input>
            <q-input v-model="empresa.linkedin" outlined label="LinkedIn" class="col-xs-12 col-md-4">
              <template v-slot:append>
                <q-icon :name="mdiLinkedin" color="primary" />
              </template>
            </q-input>

            <div class="col-xs-12 col-md-6">
              <q-file outlined v-model="logo" label="Logotipo">
                <template v-slot:prepend>
                  <q-icon :name="mdiImageSearchOutline" />
                </template>
              </q-file>
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="descricao">
          <q-editor
            v-model="empresa.descricao"
            placeholder="Insira a descrição da sua empresa"
            :toolbar="[
              [
                {
                  label: $q.lang.editor.align,
                  icon: $q.iconSet.editor.align,
                  fixedLabel: true,
                  options: ['left', 'center', 'right', 'justify']
                },
                'fullscreen'
              ],
              ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
              ['token', 'hr', 'link', 'custom_btn'],
              [
                {
                  label: $q.lang.editor.formatting,
                  icon: $q.iconSet.editor.formatting,
                  list: 'no-icons',
                  options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code']
                },
                {
                  label: $q.lang.editor.fontSize,
                  icon: $q.iconSet.editor.fontSize,
                  fixedLabel: true,
                  fixedIcon: true,
                  list: 'no-icons',
                  options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7']
                },
                {
                  label: $q.lang.editor.defaultFont,
                  icon: $q.iconSet.editor.font,
                  fixedIcon: true,
                  list: 'no-icons',
                  options: ['default_font', 'arial', 'arial_black', 'comic_sans', 'courier_new', 'impact', 'lucida_grande', 'times_new_roman', 'verdana']
                },
                'removeFormat'
              ],
              ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

              ['undo', 'redo'],
              ['viewsource']
            ]"
            :fonts="{
              arial: 'Arial',
              arial_black: 'Arial Black',
              comic_sans: 'Comic Sans MS',
              courier_new: 'Courier New',
              impact: 'Impact',
              lucida_grande: 'Lucida Grande',
              times_new_roman: 'Times New Roman',
              verdana: 'Verdana'
            }"
          />
          <p>{{ empresa.descricao.length }}</p>
        </q-tab-panel>
      </q-tab-panels>

      <q-separator inset />

      <q-card-actions align="right">
        <q-btn label="Guardar" color="primary" size="lg" :icon="mdiCheckboxMarkedOutline" @click="guarda" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { mdiShieldCheckOutline, mdiWeb, mdiFacebook, mdiTwitter, mdiLinkedin, mdiImageSearchOutline, mdiAccountGroup, mdiEyeOff, mdiEye, mdiCloseCircle, mdiFileDocumentEditOutline, mdiCheckboxMarkedOutline, mdiCellphone, mdiPhoneClassic } from '@quasar/extras/mdi-v6'
import { defineComponent, ref, onMounted } from 'vue'
import { get, getAuth, postAuth, postFormAuth, apiPublicUrl } from 'boot/api'
import { useQuasar } from 'quasar'
import { isEmail } from '/src/models/validations'
import TipoProjetoSelector from 'src/components/TipoProjetoSelector.vue'

export default defineComponent({
  setup() {
    const $q = useQuasar()
    const utilizador = ref({
      username: '',
      password: '',
      perfil: '',
      empresa_id: 0,
      parceiro_id: 0
    })
    const empresa = ref({
      id: 0,
      email: '',
      nome: '',
      nif: '',
      cae: '',
      titulo: null,
      concelho_id: null,
      morada: null,
      tipos_projeto: [],
      ativo: true,
      descricao: null,
      website: null,
      telemovel: null,
      telefone: null,
      facebook: null,
      twitter: null,
      linkedin: null,
      logo: null
    })
    onMounted(async () => {
      try {
        utilizador.value = await getAuth('utilizadores/read-single.php')
      } catch {
        $q.notify({
          message: 'Não foi possível obter os dados do utilizador',
          type: 'warning'
        })
      }
      if (typeof utilizador.value.empresa_id !== 'undefined' && utilizador.value.empresa_id > 0) {
        // tipos de projeto
        try {
          tiposProjeto.value = await get('tiposprojeto/read-ativo.php')
        } catch {
          $q.notify({
            message: 'Não foi possível obter os tipos de projeto',
            type: 'warning'
          })
        }
        // empresa
        try {
          empresa.value = await get('empresas/read-single.php?id=' + utilizador.value.empresa_id)
          empresaExistente.value = true
        } catch {
          $q.notify({
            message: 'Não foi possível obter os dados da empresa',
            type: 'warning'
          })
        }
        // concelhos
        try {
          if (empresa.value.concelho_id > 0) {
            concelhos.value = await get('concelhos/read.php?id=' + empresa.value.concelho_id + '&filtro=')
          }
        } catch {
          $q.notify({
            message: 'Não foi possível obter os concelhos',
            type: 'warning'
          })
        }
      }
    })

    const inputName = ref(null)
    const inputUsername = ref(null)
    const inputEmail = ref(null)
    const inputNif = ref(null)
    const inputCae = ref(null)
    const inputConcelho = ref(null)
    const tiposProjeto = ref([])
    const isPwd = ref(true)
    const tab = ref('empresa')
    const empresaExistente = ref(false)
    const concelhos = ref([])
    const logo = ref(null)

    const isUsernamevalid = (val) => {
      return !!val || 'Insira o utilizador'
    }
    const isNameValid = (val) => {
      return !!val || 'Insira o Nome'
    }
    const isEmailRule = (val) => {
      return isEmail(val) || 'Insira um email válido'
    }
    const isNifValid = (val) => {
      let firstDigit = 0,
        checkDigit = 0,
        i = 0

      if (val !== null && val.length === 9) {
        firstDigit = parseInt(val.charAt(0))
        checkDigit = firstDigit * 9
        for (i = 2; i <= 8; i++) {
          checkDigit += parseInt(val.charAt(i - 1)) * (10 - i)
        }
        checkDigit = 11 - (checkDigit % 11)
        if (checkDigit >= 10) {
          checkDigit = 0
        }
        if (checkDigit === parseInt(val.charAt(8))) {
          return true
        }
      }
      return 'NIF inválido'
    }
    const isCaeValid = (val) => {
      if (val === null || val.length !== 5) return 'CAE inválido'
      else return true
    }
    const isConcelhoValid = (val) => {
      if (val <= 0) return 'Indique o concelho'
      else return true
    }
    const tipoProjetoUpdated = (e) => {
      empresa.value.tipos_projeto = e
    }
    const filterFn = (val, update) => {
      update(async () => {
        if (val !== '') {
          const needle = val.toLowerCase()
          concelhos.value = await get('concelhos/read.php?id=0&filtro=' + val)
        }
      })
    }
    const guarda = async () => {
      // guardar o utilizador, só o username
      // validate
      if (inputName.value.validate() && inputUsername.value.validate() && inputEmail.value.validate() && inputNif.value.validate() && inputCae.value.validate() && inputConcelho.value.validate()) {
        try {
          await postAuth('utilizadores/update-self.php', utilizador.value)
        } catch {
          $q.notify({
            message: 'Não foi possível guardar os dados do utilizador',
            type: 'warning'
          })
          return
        }
        if (typeof utilizador.value.empresa_id !== 'undefined' && utilizador.value.empresa_id > 0) {
          // guardar os dados da empresa
          await postAuth('empresas/update-self.php', empresa.value)
          //guardar o logotipo
          const data = new FormData()
          data.append('id', empresa.value.id)
          data.append('logo', logo.value)
          await postFormAuth('empresas/update-logo.php', data)
        }
        $q.notify({ message: 'Os dados foram guardados', type: 'positive' })
      }
    }
    return {
      mdiShieldCheckOutline,
      mdiWeb,
      mdiFacebook,
      mdiTwitter,
      mdiLinkedin,
      mdiImageSearchOutline,
      mdiAccountGroup,
      mdiEyeOff,
      mdiEye,
      mdiCloseCircle,
      mdiFileDocumentEditOutline,
      mdiCheckboxMarkedOutline,
      mdiCellphone,
      mdiPhoneClassic,
      inputName,
      inputUsername,
      inputEmail,
      inputNif,
      inputCae,
      inputConcelho,
      tab,
      isPwd,
      empresaExistente,
      tiposProjeto,
      logo,
      concelhos,
      utilizador,
      empresa,
      username: localStorage.getItem('login'),
      tipoProjetoUpdated,
      isUsernamevalid,
      isNameValid,
      isEmailRule,
      isNifValid,
      isCaeValid,
      isConcelhoValid,
      filterFn,
      guarda,
      apiPublicUrl
    }
  },
  components: { TipoProjetoSelector }
})
</script>
