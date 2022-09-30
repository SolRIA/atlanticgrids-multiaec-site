<template>
  <q-card bordered class="card-login">
    <q-card-section>
      <q-tabs v-model="tab" outside-arrows inline-label mobile-arrows dense align="center" narrow-indicator>
        <q-tab name="geral" :icon="mdiBadgeAccountHorizontalOutline" :label="$t('html.registerPartner.tabMain')" />
        <q-tab name="descricao" :icon="mdiFileDocumentEditOutline" :label="$t('html.registerPartner.tabDescription')" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab">
        <q-tab-panel name="geral">
          <div class="row q-col-gutter-md">
            <div class="text-h6 col-12">
              {{ $t('html.registerPartner.user') }}
            </div>
            <q-input v-model="empresa.username" outlined :label="$t('html.registerPartner.username')" class="col-xs-12 col-md-6" :rules="[isUsernamevalid]" ref="inputUserName">
              <template v-if="empresa.username" v-slot:append>
                <q-icon :name="mdiCloseCircle" @click.stop="empresa.username = null" class="cursor-pointer" />
              </template>
            </q-input>
            <q-input v-model="empresa.password" outlined :type="isPwd ? 'password' : 'text'" :label="$t('html.registerPartner.userPassword')" class="col-xs-12 col-md-6" :rules="[isPasswordValid]" ref="inputPassword">
              <template v-slot:append>
                <q-icon :name="isPwd ? mdiEyeOff : mdiEye" class="cursor-pointer" aria-hidden="true" @click="isPwd = !isPwd" />
                <q-icon v-if="empresa.password" :name="mdiCloseCircle" @click.stop="empresa.password = null" class="cursor-pointer" />
              </template>
            </q-input>
            <div class="text-h6 col-12">
              {{ $t('html.registerPartner.organization') }}
            </div>
            <q-input v-model="empresa.nome" outlined :rules="[isNameValid]" ref="inputName" :label="$t('html.registerPartner.name')" class="col-xs-12 col-md-6" />
            <q-input v-model="empresa.email" outlined :rules="[isEmailRule]" ref="inputEmail" :label="$t('html.registerPartner.contactEmail')" class="col-xs-12 col-md-6" />

            <TipoProjetoSelector :tipos="tiposProjeto" :tipo="empresa.tipos_projeto" :lang="lang" class="col-xs-12" />

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
              <q-file outlined v-model="empresa.logo" :label="$t('html.registerPartner.logo')">
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
    </q-card-section>

    <q-separator inset />

    <q-card-actions align="right">
      <LanguageSelector @language_changed="languageChanged" />
      <q-btn :label="$t('html.registerPartner.return')" type="reset" rounded flat @click="onCancel" />
      <q-btn color="primary" :label="$t('html.registerPartner.register')" rounded class="text-white action-btn" :icon="mdiLogin" size="lg" @click="onRegister" :loading="onCreatingAcount" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { mdiEyeOff, mdiEye, mdiLogin, mdiCloseCircle, mdiWeb, mdiFacebook, mdiTwitter, mdiLinkedin, mdiBadgeAccountHorizontalOutline, mdiFileDocumentEditOutline, mdiImageSearchOutline, mdiCellphone, mdiPhoneClassic } from '@quasar/extras/mdi-v6'
import { defineComponent, ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import { get, postForm } from 'boot/api'
import { isEmail } from '/src/models/validations'
import LanguageSelector from './LanguageSelector.vue'
import TipoProjetoSelector from './TipoProjetoSelector.vue'

export default defineComponent({
  name: 'RegistoParceiro',
  components: { LanguageSelector, TipoProjetoSelector },
  props: { p: { type: Object, required: true } },
  emits: ['canceled', 'saved'],
  setup(props, { emit }) {
    const $q = useQuasar()
    const { t } = useI18n()
    const empresa = ref(
      Object.assign(
        {
          username: '',
          password: '',
          email: '',
          nome: '',
          tipos_projeto: [],
          descricao: '',
          telefone: null,
          telemovel: null,
          website: null,
          facebook: null,
          twitter: null,
          linkedin: null,
          telefone: null,
          logo: null,
          pais_id: null
        },
        props.p
      )
    )
    onMounted(async () => {
      try {
        tiposProjeto.value = await get('tiposprojeto/read-ativo.php')
        empresa.value.tipos_projeto = [tiposProjeto.value.filter((t) => t.pai_id > 0)[0].id]
      } catch {
        $q.notify({
          message: t('html.errors.getProjectTypes'),
          type: 'warning'
        })
      }
    })
    const inputUserName = ref(null)
    const inputPassword = ref(null)
    const inputName = ref(null)
    const inputEmail = ref(null)
    const inputCountry = ref(null)
    const tiposProjeto = ref([])
    const isPwd = ref(true)
    const tab = ref('geral')
    const onCreatingAcount = ref(false)
    const paises = ref([])
    const lang = ref('pt')

    const isUsernamevalid = function (val) {
      return !!val || t('html.errors.noUsername')
    }
    const isNameValid = function (val) {
      return !!val || t('html.errors.noName')
    }
    const isEmailRule = (val) => {
      return isEmail(val) || t('html.errors.noEmail')
    }
    const isPasswordValid = function (val) {
      return !!val || t('html.errors.noPassword')
    }
    const isCountryValid = (val) => {
      if (val <= 0) return t('html.errors.noCountry')
      else return true
    }
    const tipoProjetoUpdated = (e) => {
      empresa.value.tipos_projeto = e
    }
    const onRegister = async () => {
      // do login
      if (inputUserName.value.validate() && inputPassword.value.validate() && inputName.value.validate() && inputEmail.value.validate() && inputCountry.value.validate()) {
        onCreatingAcount.value = true
        // account has been created,
        const data = new FormData()
        data.append('logo', empresa.value.logo)
        data.append('username', empresa.value.username)
        data.append('password', empresa.value.password)
        data.append('nome', empresa.value.nome)
        data.append('tipos_projeto', empresa.value.tipos_projeto)
        data.append('pais_id', empresa.value.pais_id)
        data.append('descricao', empresa.value.descricao)
        data.append('telefone', empresa.value.telefone)
        data.append('telemovel', empresa.value.telemovel)
        data.append('email', empresa.value.email)
        data.append('website', empresa.value.website)
        data.append('facebook', empresa.value.facebook)
        data.append('twitter', empresa.value.twitter)
        data.append('linkedin', empresa.value.linkedin)
        data.append('telefone', empresa.value.telefone)
        try {
          const result = await postForm('empresas/create-parceiro.php', data)
          if (result.ok === true) {
            emit('saved')
          } else {
            $q.notify({
              message: result.message,
              type: 'warning'
            })
          }
        } catch (error) {
          console.log(error)
          $q.notify({
            message: t('html.registerPartner.error'),
            type: 'warning'
          })
        } finally {
          onCreatingAcount.value = false
        }
      }
    }
    const onCancel = function () {
      emit('canceled')
    }
    const languageChanged = (e) => {
      lang.value = e
    }
    const filterFn = (val, update) => {
      update(async () => {
        if (val !== '') {
          paises.value = await get('paises/read-all.php?filtro=' + val)
        }
      })
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
      mdiBadgeAccountHorizontalOutline,
      mdiFileDocumentEditOutline,
      mdiImageSearchOutline,
      mdiCellphone,
      mdiPhoneClassic,
      inputName,
      inputEmail,
      inputUserName,
      inputPassword,
      inputCountry,
      tab,
      paises,
      empresa,
      tiposProjeto,
      isPwd,
      onCreatingAcount,
      lang,
      isUsernamevalid,
      isNameValid,
      isEmailRule,
      isPasswordValid,
      isCountryValid,
      tipoProjetoUpdated,
      onRegister,
      onCancel,
      languageChanged,
      filterFn
    }
  }
})
</script>
