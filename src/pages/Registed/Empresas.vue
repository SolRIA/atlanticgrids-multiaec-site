<template>
  <q-page padding>
    <q-table
      class="q-mt-sm"
      color="positive"
      title="Empresas"
      ref="tableRef"
      selection="single"
      no-data-label="Sem dados"
      row-key="id"
      :rows="empresas"
      :columns="colunas"
      :rows-per-page-options="[0, 5, 10]"
      :loading="loading"
      :filter="filter"
      v-model:pagination="pagination"
      v-model:selected="empresaEscolhida"
      @request="onServerRequest"
    >
      <template v-slot:top-right>
        <div class="row q-col-gutter-sm justify-end">
          <div class="col-sm-12 col-md-4">
            <q-toggle
              toggle-indeterminate
              v-model="active"
              :label="
                active === null ? 'Todas' : active ? 'Ativas' : 'Inativas'
              "
            />
          </div>

          <div class="col-sm-12 col-md-4">
            <q-toggle
              toggle-indeterminate
              v-model="pending"
              :label="
                pending === null ? 'Todas' : pending ? 'Pendentes' : 'Aprovadas'
              "
            />
          </div>

          <div class="col-sm-12 col-md-4">
            <q-btn
              label="Novo"
              color="positive"
              @click="onNovo"
              :icon="mdiPlusBoxOutline"
            />
          </div>

          <div class="col-sm-12">
            <q-input v-model="filter" outlined dense clearable debounce="500">
              <template v-slot:append>
                <q-icon :name="mdiFilterOutline" />
              </template>
            </q-input>
          </div>
        </div>
      </template>

      <template v-slot:body-cell-ativo="props">
        <q-td :props="props" auto-width>
          <q-checkbox v-model="props.row.ativo" disable />
        </q-td>
      </template>

      <template v-slot:body-cell-pendente="props">
        <q-td :props="props" auto-width>
          <q-checkbox v-model="props.row.pendente" disable />
        </q-td>
      </template>

      <template v-slot:body-cell-logo="props">
        <q-td :props="props">
          <q-img
            :src="apiPublicUrl(props.row.logo)"
            style="height: 50px"
            fit="scale-down"
          />
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props" auto-width>
          <q-btn dense flat color="positive" :icon="mdiDotsVertical">
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup @click="onEdit(props.row)">
                  <q-item-section avatar>
                    <q-icon :name="mdiPencil" color="positive" />
                  </q-item-section>
                  <q-item-section>Editar</q-item-section>
                </q-item>

                <q-item
                  clickable
                  v-close-popup
                  @click="onApprove(props.row)"
                  v-if="props.row.pendente"
                >
                  <q-item-section avatar>
                    <q-icon :name="mdiCheckCircleOutline" color="positive" />
                  </q-item-section>
                  <q-item-section>Aprovar</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-td>
      </template>
    </q-table>

    <q-dialog persistent v-model="mostraEditor">
      <q-card style="min-width: 60vw">
        <q-card-section class="row items-center q-pb-md bg-primary text-white">
          <q-icon :name="mdiAccountGroup" left size="2rem" />
          <div class="text-h6">{{ empresa.titulo }} ({{ empresa.id }})</div>
          <q-space />
          <q-btn :icon="mdiWindowClose" flat dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-tabs
            v-model="tab"
            outside-arrows
            inline-label
            mobile-arrows
            dense
            align="center"
            narrow-indicator
          >
            <q-tab
              name="geral"
              :icon="mdiBadgeAccountHorizontalOutline"
              label="Geral"
            />
            <q-tab
              name="descricao"
              :icon="mdiFileDocumentEditOutline"
              label="Descrição"
            />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab">
            <q-tab-panel name="geral">
              <div class="row q-col-gutter-md">
                <q-input
                  v-model="empresa.titulo"
                  label="Título"
                  outlined
                  class="col-xs-12 col-md-6"
                />
                <q-input
                  v-model="empresa.nome"
                  label="Nome Fiscal"
                  ref="inputName"
                  :rules="[isNameValid]"
                  outlined
                  class="col-xs-12 col-md-6"
                />
                <q-input
                  v-model="empresa.email"
                  label="Email"
                  outlined
                  :rules="[isEmailRule]"
                  ref="inputEmail"
                  class="col-xs-12 col-md-6"
                />
                <q-select
                  v-model="empresa.grupo"
                  :options="grupos"
                  label="Grupo"
                  outlined
                  clearable
                  class="col-xs-12 col-md-6"
                />

                <TipoProjetoSelector
                  :tipos="tiposProjeto"
                  :tipo="empresa.tipos_projeto"
                  @tipo_projeto_updated="tipoProjetoUpdated"
                  class="col-xs-12"
                />

                <q-select
                  v-model="empresa.concelho_id"
                  :options="concelhos"
                  label="Concelho"
                  option-label="nome"
                  option-value="id"
                  @filter="filterFn"
                  use-input
                  emit-value
                  map-options
                  outlined
                  :rules="[isConcelhoValid]"
                  ref="inputConcelho"
                  class="col-xs-12"
                />

                <q-input
                  v-model="empresa.website"
                  label="Web"
                  outlined
                  clearable
                  class="col-xs-12 col-md-3"
                >
                  <template v-slot:append>
                    <q-icon :name="mdiWeb" color="primary" />
                  </template>
                </q-input>
                <q-input
                  v-model="empresa.facebook"
                  label="Facebook"
                  outlined
                  clearable
                  class="col-xs-12 col-md-3"
                >
                  <template v-slot:append>
                    <q-icon :name="mdiFacebook" color="primary" />
                  </template>
                </q-input>
                <q-input
                  v-model="empresa.twitter"
                  label="Twitter"
                  outlined
                  clearable
                  class="col-xs-12 col-md-3"
                >
                  <template v-slot:append>
                    <q-icon :name="mdiTwitter" color="primary" />
                  </template>
                </q-input>
                <q-input
                  v-model="empresa.linkedin"
                  label="LinkedIn"
                  outlined
                  clearable
                  class="col-xs-12 col-md-3"
                >
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

                <q-checkbox
                  v-model="empresa.ativo"
                  label="Ativo"
                  class="col-xs-3"
                />
                <q-checkbox
                  v-model="empresa.pendente"
                  label="Pendente"
                  class="col-xs-3"
                />
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
                  [
                    'bold',
                    'italic',
                    'strike',
                    'underline',
                    'subscript',
                    'superscript'
                  ],
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
                }"
              />
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Cancelar" flat v-close-popup />
          <q-btn label="Guardar" color="primary" @click="onOk" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import {
  mdiAccountTie,
  mdiWindowClose,
  mdiPlusBoxOutline,
  mdiDotsVertical,
  mdiPencil,
  mdiCheckCircleOutline,
  mdiAccountGroup,
  mdiWeb,
  mdiFacebook,
  mdiTwitter,
  mdiLinkedin,
  mdiImageSearchOutline,
  mdiBadgeAccountHorizontalOutline,
  mdiFileDocumentEditOutline,
  mdiFilterOutline
} from '@quasar/extras/mdi-v6'
import { defineComponent, ref, onMounted, watch } from 'vue'
import { get, postFormAuth, apiPublicUrl, postAuth } from 'boot/api'
import { useQuasar } from 'quasar'
import { isEmail, isNifPt, isCae } from '/src/models/validations'
import TipoProjetoSelector from 'src/components/TipoProjetoSelector.vue'

export default defineComponent({
  components: { TipoProjetoSelector },
  setup() {
    const $q = useQuasar()

    const loading = ref(false)
    const mostraEditor = ref(false)
    const tableRef = ref(null)
    const tab = ref('geral')

    onMounted(async () => {
      try {
        tiposProjeto.value = await get('tiposprojeto/read-ativo.php')
      } catch {
        $q.notify({
          message: 'Não foi possível obter os tipos de projeto',
          type: 'warning'
        })
      }
      tableRef.value.requestServerInteraction()
    })

    const inputName = ref(null)
    const inputEmail = ref(null)
    const inputNif = ref(null)
    const inputCae = ref(null)
    const inputConcelho = ref(null)

    const active = ref(null)
    const pending = ref(null)

    const tiposProjeto = ref([])
    const concelhos = ref([])
    const empresas = ref([])
    const empresaEscolhida = ref([])
    const empresa = ref({
      id: 0,
      nome: '',
      titulo: '',
      grupo: '',
      ativo: true,
      pendente: true,
      tipos_projeto: [],
      descricao: null,
      telefone: null,
      telemovel: null,
      email: null,
      website: null,
      facebook: null,
      twitter: null,
      linkedin: null,
      logo: null,
      concelho_id: null
    })
    const logo = ref(null)
    const pagination = ref({
      descending: false,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 10,
      sortBy: null
    })

    watch([active, pending], (_val, _old) => {
      tableRef.value.requestServerInteraction()
    })

    const isNameValid = (val) => {
      return !!val || 'Insira o Nome'
    }
    const isEmailRule = (val) => {
      return isEmail(val) || 'Insira um email válido'
    }
    const isNifValid = (val) => {
      return isNifPt(val) || 'NIF inválido'
    }
    const isCaeValid = (val) => {
      return isCae(val) || 'CAE inválido'
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
          concelhos.value = await get('concelhos/read.php?id=0&filtro=' + val)
        }
      })
    }

    const filter = ref(null)
    const onServerRequest = async (props) => {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const filter = props.filter

      loading.value = true
      try {
        const result = await postAuth('empresas/read.php', {
          page,
          rowsPerPage,
          sortBy,
          descending,
          filter,
          active: active.value,
          pending: pending.value
        })

        empresas.value = result.rows

        pagination.value.rowsNumber = result.count
        pagination.value.page = page
        pagination.value.rowsPerPage = rowsPerPage
        pagination.value.sortBy = sortBy
        pagination.value.descending = descending
      } catch {
        $q.notify({
          message: 'Não foi possível obter as empresas',
          type: 'warning'
        })
      }
      loading.value = false
    }

    return {
      mdiAccountTie,
      mdiWindowClose,
      mdiPlusBoxOutline,
      mdiDotsVertical,
      mdiPencil,
      mdiAccountGroup,
      mdiWeb,
      mdiFacebook,
      mdiTwitter,
      mdiLinkedin,
      mdiImageSearchOutline,
      mdiBadgeAccountHorizontalOutline,
      mdiFileDocumentEditOutline,
      mdiFilterOutline,
      mdiCheckCircleOutline,
      tableRef,
      inputName,
      inputEmail,
      inputNif,
      inputCae,
      inputConcelho,
      tab,
      loading,
      filter,
      active,
      pending,
      mostraEditor,
      tiposProjeto,
      concelhos,
      empresas,
      empresaEscolhida,
      empresa,
      logo,
      pagination,
      grupos: [
        'Grandes empresas',
        'Entidades SCTN',
        'PME',
        'Entidades administração pública',
        'Associações'
      ],
      colunas: [
        {
          name: 'logo',
          label: '',
          field: 'logo',
          align: 'center',
          style: 'width: 100px'
        },
        { name: 'nome', label: 'Nome', field: 'nome', align: 'left' },
        { name: 'ativo', label: 'Ativo', field: 'ativo', align: 'left' },
        {
          name: 'pendente',
          label: 'Pendente',
          field: 'pendente',
          align: 'left'
        },
        { name: 'actions', label: '', field: 'actions' }
      ],
      onServerRequest,
      apiPublicUrl,
      tipoProjetoUpdated,
      isNameValid,
      isEmailRule,
      isNifValid,
      isCaeValid,
      isConcelhoValid,
      filterFn,
      onNovo: () => {
        logo.value = null
        empresa.value = {
          id: 0,
          nome: '',
          titulo: '',
          grupo: '',
          ativo: true,
          pendente: true,
          tipos_projeto: [],
          descricao: null,
          telefone: null,
          telemovel: null,
          email: null,
          website: null,
          facebook: null,
          twitter: null,
          linkedin: null,
          logo: null,
          concelho_id: null
        }
        mostraEditor.value = true
      },
      onEdit: async (b) => {
        empresa.value = await get('empresas/read-single.php?id=' + b.id)
        try {
          if (empresa.value.concelho_id > 0) {
            concelhos.value = await get(
              'concelhos/read.php?id=' + empresa.value.concelho_id
            )
          }
        } catch {
          $q.notify({
            message: 'Não foi possível obter os concelhos',
            type: 'warning'
          })
        }
        logo.value = null
        empresaEscolhida.value = [b]
        mostraEditor.value = true
      },
      onOk: async () => {
        try {
          if (
            inputName.value.validate() &&
            inputEmail.value.validate() &&
            inputNif.value.validate() &&
            inputCae.value.validate() &&
            inputConcelho.value.validate()
          ) {
            const data = new FormData()
            data.append('logo', logo.value)
            data.append('id', empresa.value.id)
            data.append('nome', empresa.value.nome)
            data.append('titulo', empresa.value.titulo)
            data.append('grupo', empresa.value.grupo)
            data.append('nif', empresa.value.nif)
            data.append('cae', empresa.value.cae)
            data.append('ativo', empresa.value.ativo)
            data.append('pendente', empresa.value.pendente)
            data.append('tipos_projeto', empresa.value.tipos_projeto)
            data.append('descricao', empresa.value.descricao)
            data.append('telefone', empresa.value.telefone)
            data.append('telemovel', empresa.value.telemovel)
            data.append('email', empresa.value.email)
            data.append('website', empresa.value.website)
            data.append('facebook', empresa.value.facebook)
            data.append('twitter', empresa.value.twitter)
            data.append('linkedin', empresa.value.linkedin)
            data.append('concelho_id', empresa.value.concelho_id)

            await postFormAuth('empresas/update.php', data)
            mostraEditor.value = false
            tableRef.value.requestServerInteraction()
          }
        } catch {
          $q.notify({ message: 'Não foi possível guardar', type: 'warning' })
        }
      },
      onApprove: (row) => {
        $q.dialog({
          title: 'Aprovar Associado',
          message: `Quer aprovar ${row.nome} como associado?`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          try {
            await postAuth('empresas/aprovar-associado.php', { id: row.id })
            tableRef.value.requestServerInteraction()

            if (result.ok)
              $q.notify({ message: 'Aprovação concluída com sucesso' })
            else $q.notify({ message: result.message, type: 'warning' })
          } catch {
            $q.notify({ message: 'Não foi possível aprovar', type: 'warning' })
          }
        })
      }
    }
  }
})
</script>
