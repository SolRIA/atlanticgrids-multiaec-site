<template>
  <q-page padding>
    <q-table class="q-mt-sm" color="positive"
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
      @request="onServerRequest">
      
      <template v-slot:top-right>
        <q-btn label="Novo" color="positive" @click="onNovo" :icon="mdiPlusBoxOutline" class="q-mr-md"/>
        <q-input v-model="filter" outlined dense clearable debounce="500">
          <template v-slot:append>
            <q-icon :name="mdiFilterOutline" />
          </template>
        </q-input>
      </template>

      <template v-slot:body-cell-ativo="props">
        <q-td :props="props" auto-width>
          <q-checkbox v-model="props.row.ativo" disable/>
        </q-td>
      </template>

      <template v-slot:body-cell-pendente="props">
        <q-td :props="props" auto-width>
          <q-checkbox v-model="props.row.pendente" disable/>
        </q-td>
      </template>

      <template v-slot:body-cell-logo="props">
        <q-td :props="props">
          <q-img :src="apiPublicUrl(props.row.logo)" style="height: 50px;" fit="scale-down"/>
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props" auto-width>
          <q-btn dense flat color="positive" :icon="mdiPencil" @click="onEdit(props.row)"/>
        </q-td>
      </template>
    </q-table>

    <q-dialog persistent v-model="mostraEditor">
      <q-card style="min-width: 60vw;">
        <q-card-section class="row items-center q-pb-md bg-primary text-white">
          <q-icon :name="mdiAccountGroup" left size="2rem" />
          <div class="text-h6">{{ empresa.nome }} ({{ empresa.id }})</div>
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
            narrow-indicator>
              <q-tab name="geral" :icon="mdiBadgeAccountHorizontalOutline" label="Geral" />
              <q-tab name="descricao" :icon="mdiFileDocumentEditOutline" label="Descrição" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab">
            <q-tab-panel name="geral">
              <div class="row q-col-gutter-sm">
                <q-input v-model="empresa.nome" outlined label="Nome" class="col-xs-12"/>
                <q-input v-model="empresa.email" outlined label="Email" class="col-xs-12 col-md-6"/>
                <q-select v-model="empresa.tipo_id" :options="tipos" label="Àrea de especialização" outlined option-label="nome" option-value="id" map-options emit-value class="col-xs-12 col-md-6"/>
                <q-input v-model="empresa.website" outlined label="Web" class="col-xs-12 col-md-3">
                  <template v-slot:append>
                    <q-icon :name="mdiWeb" color="primary"/>
                  </template>
                </q-input>
                <q-input v-model="empresa.facebook" outlined label="Facebook" class="col-xs-12 col-md-3">
                  <template v-slot:append>
                    <q-icon :name="mdiFacebook" color="primary"/>
                  </template>
                </q-input>
                <q-input v-model="empresa.twitter" outlined label="Twitter" class="col-xs-12 col-md-3">
                  <template v-slot:append>
                    <q-icon :name="mdiTwitter" color="primary"/>
                  </template>
                </q-input>
                <q-input v-model="empresa.linkedin" outlined label="LinkedIn" class="col-xs-12 col-md-3">
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
                
                <q-checkbox v-model="empresa.ativo" label="Ativo" class="col-xs-3"/>
                <q-checkbox v-model="empresa.pendente" label="Pendente" class="col-xs-3"/>
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
            </q-tab-panel>

          </q-tab-panels>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Cancelar" flat v-close-popup />
          <q-btn label="Guardar" color="primary" @click="onOk"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mdiAccountTie, mdiWindowClose, mdiPlusBoxOutline, mdiPencil, mdiAccountGroup, mdiWeb, mdiFacebook, mdiTwitter, mdiLinkedin, mdiImageSearchOutline, mdiBadgeAccountHorizontalOutline, mdiFileDocumentEditOutline, mdiFilterOutline } from '@quasar/extras/mdi-v6'
import { defineComponent, ref, onMounted } from 'vue'
import { get, postFormAuth, apiPublicUrl, postAuth } from 'boot/api'
import { useQuasar } from 'quasar'

export default defineComponent({
  setup () {
    const $q = useQuasar()

    const loading = ref(false)
    const mostraEditor = ref(false)
    const tableRef = ref(null)
    const tab = ref('geral')

    onMounted(async () => {
      try {
        tipos.value = await get('tiposempresa/read-ativo.php')
      } catch {
        $q.notify({ message: 'Não foi possível obter os tipos de empresa', type: 'warning' })
      }
      tableRef.value.requestServerInteraction()
    })

    const tipos = ref([])
    const empresas = ref([])
    const empresaEscolhida = ref([])
    const empresa = ref({ id: 0, nome: '', ativo: true, pendente: true, tipo_id: 1, descricao: null, telefone: null, telemovel: null, email: null, website: null, facebook: null, twitter: null, linkedin: null, logo: null })
    const logo = ref(null)
    const colunas = [
      { name: 'logo', label: '', field: 'logo', align: 'center', style: 'width: 100px' },
      { name: 'nome', label: 'Nome', field: 'nome', align: 'left' },
      { name: 'ativo', label: 'Ativo', field: 'ativo', align: 'left' },
      { name: 'pendente', label: 'Pendente', field: 'pendente', align: 'left' },
      { name: 'actions', label: '', field: 'actions' }
    ]

    const pagination = ref({
      descending: false,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 10,
      sortBy: null
    })
    const filter = ref(null)
    const onServerRequest = async (props) => {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const filter = props.filter

      loading.value = true
      try {
        const result = await postAuth('empresas/read.php', { page, rowsPerPage, sortBy, descending, filter })

        empresas.value = result.rows

        pagination.value.rowsNumber = result.count
        pagination.value.page = page
        pagination.value.rowsPerPage = rowsPerPage
        pagination.value.sortBy = sortBy
        pagination.value.descending = descending
      } catch {
        $q.notify({ message: 'Não foi possível obter as empresas', type: 'warning' })
      }
      loading.value = false
    }

    return {
      mdiAccountTie,
      mdiWindowClose,
      mdiPlusBoxOutline,
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
      tableRef,
      tab,
      loading,
      filter,
      mostraEditor,
      tipos,
      empresas,
      empresaEscolhida,
      empresa,
      logo,
      colunas,
      pagination,
      onServerRequest,
      apiPublicUrl,
      onNovo: () => {
        empresa.value = { id: 0, nome: '', ativo: true, pendente: true, tipo_id: 1, descricao: null, telefone: null, telemovel: null, email: null, website: null, facebook: null, twitter: null, linkedin: null, logo: null }
        mostraEditor.value = true
      },
      onEdit: async (b) => {
        empresa.value = await get('empresas/read-single.php?id=' + b.id)
        empresaEscolhida.value = [b]
        mostraEditor.value = true
      },
      onOk: async () => {
        try {
          const data = new FormData()
          data.append('logo', logo.value)
          data.append('id', empresa.value.id)
          data.append('nome', empresa.value.nome)
          data.append('ativo', empresa.value.ativo)
          data.append('pendente', empresa.value.pendente)
          data.append('tipo_id', empresa.value.tipo_id)
          data.append('descricao', empresa.value.descricao)
          data.append('telefone', empresa.value.telefone)
          data.append('telemovel', empresa.value.telemovel)
          data.append('email', empresa.value.email)
          data.append('website', empresa.value.website)
          data.append('facebook', empresa.value.facebook)
          data.append('twitter', empresa.value.twitter)
          data.append('linkedin', empresa.value.linkedin)
          await postFormAuth('empresas/update.php', data)
          mostraEditor.value = false
          tableRef.value.requestServerInteraction()
        } catch {
          $q.notify({ message: 'Não foi possível guardar', type: 'warning' })
        }
      }
    }
  }
  
})
</script>
