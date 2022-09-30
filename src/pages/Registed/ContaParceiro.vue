<template>
  <q-page padding>
    <q-card>
      <q-tabs v-model="tab" outside-arrows inline-label mobile-arrows align="center" class="bg-primary text-white shadow-2" narrow-indicator>
        <q-tab name="empresa" :icon="mdiAccountGroup" :label="$t('html.registerPartner.tabMain')" />
        <q-tab name="descricao" :icon="mdiFileDocumentEditOutline" :label="$t('html.registerPartner.tabDescription')" />
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

            <q-input v-model="empresa.nome" :rules="[isNameValid]" label="Nome" ref="inputName" outlined class="col-xs-12 col-md-6" />

            <q-input v-model="empresa.email" label="Email" :rules="[isEmailRule]" ref="inputEmail" outlined class="col-xs-12 col-md-6" />

            <TipoProjetoSelector :tipos="tiposProjeto" :tipo="empresa.tipos_projeto" @tipo_projeto_updated="tipoProjetoUpdated" class="col-xs-12 col-md-6" />

            <q-select v-model="empresa.pais_id" :options="paises" :label="$t('html.registerPartner.country')" :option-label="lang === 'pt' ? 'nome' : lang === 'fr' ? 'nome_fr' : 'nome_en'" option-value="id" @filter="filterFn" :rules="[isCountryValid]" ref="inputCountry" use-input emit-value map-options outlined class="col-xs-12" />

            <q-input v-model="empresa.telefone" outlined label="Telefone" class="col-xs-12 col-md-6">
              <template v-slot:append>
                <q-icon :name="mdiPhoneClassic" color="primary" />
              </template>
            </q-input>

            <q-input v-model="empresa.website" outlined label="Web" class="col-xs-12 col-md-6">
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
  components: { TipoProjetoSelector },
  setup() {
    const $q = useQuasar()
    const lang = ref('pt')

    const utilizador = ref({
      username: '',
      password: '',
      perfil: '',
      parceiro_id: 0
    })
    const empresa = ref({
      id: 0,
      email: '',
      nome: '',
      tipos_projeto: [],
      descricao: null,
      email: null,
      website: null,
      telefone: null,
      facebook: null,
      twitter: null,
      linkedin: null,
      logo: null,
      pais_id: null
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
          empresa.value = await get('empresas/read-single-parceiro.php?id=' + utilizador.value.parceiro_id)
          empresaExistente.value = true
        } catch {
          $q.notify({
            message: 'Não foi possível obter os dados do parceiro',
            type: 'warning'
          })
        }
        // paises
        try {
          if (empresa.value.pais_id > 0) {
            paises.value = await get('paises/read-single.php?id=' + empresa.value.pais_id)
          }
        } catch {
          $q.notify({
            message: 'Não foi possível obter o país',
            type: 'warning'
          })
        }
      }
    })

    const inputName = ref(null)
    const inputUsername = ref(null)
    const inputEmail = ref(null)
    const inputCountry = ref(null)
    const tiposProjeto = ref([])
    const isPwd = ref(true)
    const tab = ref('empresa')
    const empresaExistente = ref(false)
    const paises = ref([])
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
    const isCountryValid = (val) => {
      if (val <= 0) return t('html.errors.noCountry')
      else return true
    }
    const tipoProjetoUpdated = (e) => {
      empresa.value.tipos_projeto = e
    }
    const filterFn = (val, update) => {
      update(async () => {
        if (val !== '') {
          paises.value = await get('paises/read-all.php?filtro=' + val)
        }
      })
    }
    const guarda = async () => {
      // guardar o utilizador, só o username
      // validate
      if (inputName.value.validate() && inputUsername.value.validate() && inputEmail.value.validate() && inputCountry.value.validate()) {
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
          await postAuth('empresas/update-self-parceiro.php', empresa.value)
          //guardar o logotipo
          const data = new FormData()
          data.append('id', empresa.value.id)
          data.append('logo', logo.value)
          await postFormAuth('empresas/update-logo-parceiro.php', data)
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
      inputCountry,
      tab,
      isPwd,
      lang,
      empresaExistente,
      tiposProjeto,
      logo,
      paises,
      utilizador,
      empresa,
      username: localStorage.getItem('login'),
      tipoProjetoUpdated,
      isUsernamevalid,
      isNameValid,
      isEmailRule,
      isCountryValid,
      filterFn,
      guarda,
      apiPublicUrl
    }
  }
})
</script>
