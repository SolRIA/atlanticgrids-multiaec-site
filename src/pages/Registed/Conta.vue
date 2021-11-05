<template>
  <q-page padding>
    <q-card>
      <q-tabs
        v-model="tab"
        outside-arrows
        inline-label
        mobile-arrows
        align="center"
        class="bg-primary text-white shadow-2"
        narrow-indicator>
          <q-tab name="geral" :icon="mdiAccountTie" label="Utilizador" />
          <q-tab name="empresa" :icon="mdiAccountGroup" label="Empresa" :disable="!empresaExistente"/>
          <q-tab name="descricao" :icon="mdiFileDocumentEditOutline" label="Descrição" :disable="!empresaExistente"/>
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab">
        <q-tab-panel name="geral">
          <div class="row justify-center">
            <q-img :src="apiPublicUrl(empresa.logo)" style="height: 80px;" fit="scale-down"/>
          </div>
          <q-chip square color="primary" text-color="white" :icon="mdiShieldCheckOutline" size="lg">
            {{ utilizador.perfil }}
          </q-chip>
          <div class="row q-col-gutter-md">
            <q-input v-model="utilizador.username" outlined label="Utilizador" class="col-xs-12 col-md-6">
              <template v-if="utilizador.username" v-slot:append>
                <q-icon :name="mdiCloseCircle" @click.stop="utilizador.username = null" class="cursor-pointer" />
              </template>
            </q-input>
            <q-input v-model="utilizador.password" outlined lazy-rules=""
                    :type="isPwd ? 'password' : 'text'" label="Password" class="col-xs-12 col-md-6"
                    :rules="[isPasswordValid]" ref="inputPassword">
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? mdiEyeOff : mdiEye"
                  class="cursor-pointer" aria-hidden="true"
                  @click="isPwd = !isPwd"/>
                <q-icon v-if="utilizador.password" :name="mdiCloseCircle" @click.stop="utilizador.password = null" class="cursor-pointer" />
              </template>
            </q-input>
          </div>
        </q-tab-panel>

        <q-tab-panel name="empresa">
          <div class="row q-col-gutter-md">
            <q-input v-model="empresa.nome" label="Nome" outlined class="col-xs-12 col-md-6"/>
            <q-input v-model="empresa.email" label="Email" outlined clearable class="col-xs-12 col-md-6"/>
            
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
              <q-file outlined v-model="logo" label="Logotipo">
                <template v-slot:prepend>
                  <q-icon :name="mdiImageSearchOutline" />
                </template>
              </q-file>
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="descricao">
          <q-editor v-model="empresa.descricao" placeholder="Insira a descrição da sua empresa"
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
        </q-tab-panel>
      </q-tab-panels>
      <q-card-actions align="right">
        <q-btn label="Guardar" color="primary" size="lg" :icon="mdiCheckboxMarkedOutline" @click="guarda"/>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { mdiAccountTie, mdiShieldCheckOutline, mdiWeb, mdiFacebook, mdiTwitter, mdiLinkedin, mdiImageSearchOutline, mdiAccountGroup, mdiEyeOff, mdiEye, mdiCloseCircle, mdiFileDocumentEditOutline, mdiCheckboxMarkedOutline, mdiCellphone, mdiPhoneClassic } from '@quasar/extras/mdi-v6'
import { get, getAuth, postAuth, postFormAuth, apiPublicUrl } from 'boot/api'
import { useQuasar } from 'quasar'

export default defineComponent({
  setup () {
    const $q = useQuasar()

    const tab = ref('geral')
    const isPwd = ref(true)
    const empresaExistente = ref(false)

    onMounted(async () => {
      try {
        utilizador.value = await getAuth('utilizadores/read-single.php')
      } catch {
        $q.notify({ message: 'Não foi possível obter os dados do utilizador', type: 'warning' })
      }
      if (typeof utilizador.value.empresa_id !== 'undefined' && utilizador.value.empresa_id > 0) {
        // tipos de empresa
        try {
          tiposEmpresa.value = await get('tiposempresa/read-ativo.php')
        } catch {
          $q.notify({ message: 'Não foi possível obter os tipos de empresa', type: 'warning' })
        }
        // tipos de projeto
        try {
          tiposProjeto.value = await get('tiposprojeto/read-ativo.php')
        } catch {
          $q.notify({ message: 'Não foi possível obter os tipos de projeto', type: 'warning' })
        }
        // empresa
        try {
          empresa.value = await get('empresas/read-single.php?id=' + utilizador.value.empresa_id)
          empresaExistente.value = true
        } catch {
          $q.notify({ message: 'Não foi possível obter os dados da empresa', type: 'warning' })
        }
      }
    })

    const tiposEmpresa = ref([])
    const tiposProjeto = ref([])
    const logo = ref(null)
    const utilizador = ref({ username: '', password: '', perfil: '', empresa_id: 0 })
    const empresa = ref({ id: 0, nome: '', email: '', ativo: true, descricao: null, website: null, telemovel: null, telefone: null, facebook: null, twitter: null, linkedin: null, logo: null, tipos_empresa: [], tipos_projeto: [] })

    const isPasswordValid = (val) => {
      return !!val || 'Insira a password'
    }
    const guarda = async () => {
      // guardar o utilizador, só o username
      try {
        await postAuth('utilizadores/update-self.php', utilizador.value)
      } catch {
        $q.notify({ message: 'Não foi possível guardar os dados do utilizador', type: 'warning' })
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

    return {
      mdiAccountTie,
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
      tab,
      isPwd,
      empresaExistente,
      tiposEmpresa,
      tiposProjeto,
      logo,
      utilizador,
      empresa,
      username: localStorage.getItem('login'),
      isPasswordValid,
      guarda,
      apiPublicUrl
    }
  }
})
</script>
