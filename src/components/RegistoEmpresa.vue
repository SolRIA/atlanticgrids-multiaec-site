<template>
  <q-card bordered class="card-login">
    <q-card-section>
      <q-tabs
        v-model="tab"
        outside-arrows
        inline-label
        mobile-arrows
        dense
        align="center"
        narrow-indicator>
          <q-tab name="geral" :icon="mdiBadgeAccountHorizontalOutline" label="Geral" />
          <q-tab name="descricao" :icon="mdiFileDocumentEditOutline" label="Descrição" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab">
        <q-tab-panel name="geral">
          <div class="row q-col-gutter-md">
            <div class="text-h6 col-12">Utilizador</div>
            <q-input v-model="empresa.username" outlined label="Utilizador" class="col-xs-12 col-md-6"
                    :rules="[isEmailRule]" ref="inputName">
              <template v-if="empresa.username" v-slot:append>
                <q-icon :name="mdiCloseCircle" @click.stop="empresa.username = null" class="cursor-pointer" />
              </template>
            </q-input>
            <q-input v-model="empresa.password" outlined
                    :type="isPwd ? 'password' : 'text'" label="Password" class="col-xs-12 col-md-6"
                    :rules="[isPasswordValid]" ref="inputPassword">
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? mdiEyeOff : mdiEye"
                  class="cursor-pointer" aria-hidden="true"
                  @click="isPwd = !isPwd"/>
                <q-icon v-if="empresa.password" :name="mdiCloseCircle" @click.stop="empresa.password = null" class="cursor-pointer" />
              </template>
            </q-input>
            <div class="text-h6 col-12">Empresa</div>
            <q-input v-model="empresa.nome" outlined label="Nome" class="col-xs-12 col-md-6"/>
            <q-input v-model="empresa.email" outlined label="Email" class="col-xs-12 col-md-6"/>
            
            <q-select v-model="empresa.tipos_empresa" :options="tiposEmpresa" label="Àreas de especialização" option-label="nome" option-value="id" class="col-xs-12 col-md-6"
              multiple emit-value map-options outlined>
              <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
                <q-item v-bind="itemProps">
                  <q-item-section>
                    <q-item-label>{{ opt.nome }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-toggle :model-value="selected" @update:model-value="toggleOption(opt)" />
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <q-select v-model="empresa.tipos_projeto" :options="tiposProjeto" label="Tipos de projetos" option-label="nome" option-value="id" class="col-xs-12 col-md-6"
              multiple emit-value map-options outlined>
              <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
                <q-item v-bind="itemProps">
                  <q-item-section>
                    <q-item-label>{{ opt.nome }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-toggle :model-value="selected" @update:model-value="toggleOption(opt)" />
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <q-input v-model="empresa.telemovel" outlined label="Telemóvel" class="col-xs-12 col-md-4">
              <template v-slot:append>
                <q-icon :name="mdiCellphone" color="primary"/>
              </template>
            </q-input>

            <q-input v-model="empresa.telefone" outlined label="Telefone" class="col-xs-12 col-md-4">
              <template v-slot:append>
                <q-icon :name="mdiPhoneClassic" color="primary"/>
              </template>
            </q-input>

            <q-input v-model="empresa.website" outlined label="Web" class="col-xs-12 col-md-4">
              <template v-slot:append>
                <q-icon :name="mdiWeb" color="primary"/>
              </template>
            </q-input>

            <q-input v-model="empresa.facebook" outlined label="Facebook" class="col-xs-12 col-md-4">
              <template v-slot:append>
                <q-icon :name="mdiFacebook" color="primary"/>
              </template>
            </q-input>
            <q-input v-model="empresa.twitter" outlined label="Twitter" class="col-xs-12 col-md-4">
              <template v-slot:append>
                <q-icon :name="mdiTwitter" color="primary"/>
              </template>
            </q-input>
            <q-input v-model="empresa.linkedin" outlined label="LinkedIn" class="col-xs-12 col-md-4">
              <template v-slot:append>
                <q-icon :name="mdiLinkedin" color="primary"/>
              </template>
            </q-input>

            <div class="col-xs-12 col-md-6">
              <q-file outlined v-model="empresa.logo" label="Logotipo">
                <template v-slot:prepend>
                  <q-icon :name="mdiImageSearchOutline" />
                </template>
              </q-file>
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="descricao">
          <q-editor v-model="empresa.descricao" 
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
                  options: [
                    'p',
                    'h1',
                    'h2',
                    'h3',
                    'h4',
                    'h5',
                    'h6',
                    'code'
                  ]
                },
                {
                  label: $q.lang.editor.fontSize,
                  icon: $q.iconSet.editor.fontSize,
                  fixedLabel: true,
                  fixedIcon: true,
                  list: 'no-icons',
                  options: [
                    'size-1',
                    'size-2',
                    'size-3',
                    'size-4',
                    'size-5',
                    'size-6',
                    'size-7'
                  ]
                },
                {
                  label: $q.lang.editor.defaultFont,
                  icon: $q.iconSet.editor.font,
                  fixedIcon: true,
                  list: 'no-icons',
                  options: [
                    'default_font',
                    'arial',
                    'arial_black',
                    'comic_sans',
                    'courier_new',
                    'impact',
                    'lucida_grande',
                    'times_new_roman',
                    'verdana'
                  ]
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
            }"/>
            <p>{{ empresa.descricao.length }}</p>
        </q-tab-panel>

      </q-tab-panels>
    </q-card-section>

    <q-separator inset />
    
    <q-card-actions align="right">
      <q-btn label="Voltar" type="reset" rounded flat @click="onCancel"/>
      <q-btn color="primary" label="Criar conta" rounded class="text-white action-btn" :icon="mdiLogin" size="lg"
          @click="onRegister" :loading="onCreatingAcount"/>
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { mdiEyeOff, mdiEye, mdiLogin, mdiCloseCircle, mdiWeb, mdiFacebook, mdiTwitter, mdiLinkedin, mdiBadgeAccountHorizontalOutline, mdiFileDocumentEditOutline, mdiImageSearchOutline, mdiCellphone, mdiPhoneClassic } from '@quasar/extras/mdi-v6'
import { useQuasar } from 'quasar'
import { get, postForm } from 'boot/api'

export default defineComponent({
  name: 'RegistroEmpresa',
  props: { p: { type: Object, required: true } },
  emits: ['canceled', 'saved'],
  setup (props, { emit }) {
    const $q = useQuasar()

    const empresa = ref(Object.assign({ username: '', password: '', email: '', nome: '', tipos_empresa: [], tipos_projeto: [], descricao: '', telefone: null, telemovel: null, website: null, facebook: null, twitter: null, linkedin: null, logo: null }, props.p))

    onMounted(async () => {
      try {
        tiposEmpresa.value = await get('tiposempresa/read-ativo.php')
      } catch {
        $q.notify({ message: 'Não foi possível obter os tipos de empresa', type: 'warning' })
      }
      try {
        tiposProjeto.value = await get('tiposprojeto/read-ativo.php')
      } catch {
        $q.notify({ message: 'Não foi possível obter os tipos de projeto', type: 'warning' })
      }
    })

    const inputName = ref(null)
    const inputPassword = ref(null)

    const tiposEmpresa = ref([])
    const tiposProjeto = ref([])
    const isPwd = ref(true)
    const tab = ref('geral')
    const onCreatingAcount = ref(false)

    const isEmailRule = function (val) {
      return !!val || 'Insira o utilizador'
    }
    const isPasswordValid = function (val) {
      return !!val || 'Insira a password'
    }
    const onRegister = async () => {
      // do login
      if (inputName.value.validate() && inputPassword.value.validate()) {
        onCreatingAcount.value = true
        
        // account has been created, 
        const data = new FormData()
        data.append('logo', empresa.value.logo)
        data.append('username', empresa.value.username)
        data.append('password', empresa.value.password)
        data.append('nome', empresa.value.nome)
        data.append('tipos_empresa', empresa.value.tipos_empresa)
        data.append('tipos_projeto', empresa.value.tipos_projeto)
        data.append('descricao', empresa.value.descricao)
        data.append('telefone', empresa.value.telefone)
        data.append('telemovel', empresa.value.telemovel)
        data.append('email', empresa.value.email)
        data.append('website', empresa.value.website)
        data.append('facebook', empresa.value.facebook)
        data.append('twitter', empresa.value.twitter)
        data.append('linkedin', empresa.value.linkedin)
        try {
          await postForm('empresas/create.php', data)
          emit('saved')
        } catch {
          $q.notify({ message: 'Não foi possível criar o registo', type: 'warning' })
        } finally {
          onCreatingAcount.value = false
        }
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
      mdiBadgeAccountHorizontalOutline,
      mdiFileDocumentEditOutline,
      mdiImageSearchOutline,
      mdiCellphone,
      mdiPhoneClassic,
      inputName,
      inputPassword,
      tab,
      empresa,
      tiposEmpresa,
      tiposProjeto,
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
