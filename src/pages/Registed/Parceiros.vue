<template>
  <q-page padding>
    <q-table class="q-mt-sm" color="positive" title="Parceiros" ref="tableRef" selection="single" no-data-label="Sem dados" row-key="id" :rows="empresas" :columns="colunas" :rows-per-page-options="[0, 5, 10]" :loading="loading" :filter="filter" v-model:pagination="pagination" v-model:selected="empresaEscolhida" @request="onServerRequest">
      <template v-slot:top-right>
        <div class="row q-col-gutter-sm justify-end">
          <div class="col-sm-12 col-md-4">
            <q-toggle toggle-indeterminate v-model="active" :label="active === null ? 'Todas' : active ? 'Ativas' : 'Inativas'" />
          </div>

          <div class="col-sm-12 col-md-4">
            <q-toggle toggle-indeterminate v-model="pending" :label="pending === null ? 'Todas' : pending ? 'Pendentes' : 'Aprovadas'" />
          </div>
          <div class="col-sm-12 col-md-4">
            <q-btn label="Novo" color="positive" @click="onNovo" :icon="mdiPlusBoxOutline" />
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
          <q-img :src="apiPublicUrl(props.row.logo)" style="height: 50px" fit="scale-down" />
        </q-td>
      </template>

      <template v-slot:body-cell-avg_avaliacao="props">
        <q-td :props="props">
          <q-rating v-model="props.row.avg_avaliacao" readonly size="3em" color="primary" :icon="mdiStarOutline" :icon-selected="mdiStar" :icon-half="mdiStarHalfFull" />
          {{ props.row.avg_avaliacao }} de 5
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
                  <q-item-section>Ver</q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="onApprove(props.row)" v-if="permissaoEdicao && props.row.pendente">
                  <q-item-section avatar>
                    <q-icon :name="mdiCheckCircleOutline" color="positive" />
                  </q-item-section>
                  <q-item-section>Aprovar</q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="onMostraEditorAvalicao(props.row)">
                  <q-item-section avatar>
                    <q-icon :name="mdiStar" color="positive" />
                  </q-item-section>
                  <q-item-section>Avaliação</q-item-section>
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
          <q-icon :name="mdiHandshakeOutline" left size="2rem" />
          <div class="text-h6">{{ empresa.nome }} ({{ empresa.id }})</div>
          <q-space />
          <q-btn :icon="mdiWindowClose" flat dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-tabs v-model="tab" outside-arrows inline-label mobile-arrows dense align="center" narrow-indicator>
            <q-tab name="geral" :icon="mdiBadgeAccountHorizontalOutline" label="Geral" />
            <q-tab name="descricao" :icon="mdiFileDocumentEditOutline" label="Descrição" />
            <q-tab name="avaliacoes" :icon="mdiStar" label="Avaliações" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab">
            <q-tab-panel name="geral">
              <div class="row q-col-gutter-md">
                <q-input v-model="empresa.nome" label="Nome" :rules="[isNameValid]" ref="inputName" outlined :readonly="!permissaoEdicao" class="col-xs-12 col-md-6" />
                <q-input v-model="empresa.email" label="Email" :rules="[isEmailRule]" ref="inputEmail" outlined :readonly="!permissaoEdicao" class="col-xs-12 col-md-6" />

                <TipoProjetoSelector :tipos="tiposProjeto" :tipo="empresa.tipos_projeto" @tipo_projeto_updated="tipoProjetoUpdated" :readonly="!permissaoEdicao" class="col-xs-12" />

                <q-select v-model="empresa.pais_id" :options="paises" :label="$t('html.registerPartner.country')" :readonly="!permissaoEdicao" :option-label="lang === 'pt' ? 'nome' : lang === 'fr' ? 'nome_fr' : 'nome_en'" option-value="id" @filter="filterFn" :rules="[isCountryValid]" ref="inputCountry" use-input emit-value map-options outlined class="col-xs-12" />

                <q-input v-model="empresa.telefone" label="Telefone" outlined clearable :readonly="!permissaoEdicao" class="col-xs-12 col-md-6">
                  <template v-slot:append>
                    <q-icon :name="mdiPhoneClassic" color="primary" />
                  </template>
                </q-input>
                <q-input v-model="empresa.website" label="Web" outlined clearable :readonly="!permissaoEdicao" class="col-xs-12 col-md-6">
                  <template v-slot:append>
                    <q-icon :name="mdiWeb" color="primary" />
                  </template>
                </q-input>
                <q-input v-model="empresa.facebook" label="Facebook" outlined clearable :readonly="!permissaoEdicao" class="col-xs-12 col-md-4">
                  <template v-slot:append>
                    <q-icon :name="mdiFacebook" color="primary" />
                  </template>
                </q-input>
                <q-input v-model="empresa.twitter" label="Twitter" outlined clearable :readonly="!permissaoEdicao" class="col-xs-12 col-md-4">
                  <template v-slot:append>
                    <q-icon :name="mdiTwitter" color="primary" />
                  </template>
                </q-input>
                <q-input v-model="empresa.linkedin" label="LinkedIn" outlined clearable :readonly="!permissaoEdicao" class="col-xs-12 col-md-4">
                  <template v-slot:append>
                    <q-icon :name="mdiLinkedin" color="primary" />
                  </template>
                </q-input>

                <div class="col-xs-12 col-md-6">
                  <q-file outlined v-model="logo" label="Logotipo" :readonly="!permissaoEdicao">
                    <template v-slot:prepend>
                      <q-icon :name="mdiImageSearchOutline" />
                    </template>
                  </q-file>
                </div>

                <q-checkbox v-model="empresa.ativo" label="Ativo" class="col-xs-3" :readonly="permissaoEdicao" />
              </div>
            </q-tab-panel>

            <q-tab-panel name="descricao">
              <q-editor
                v-model="empresa.descricao"
                :readonly="!permissaoEdicao"
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
            </q-tab-panel>

            <q-tab-panel name="avaliacoes">
              <q-table class="q-mt-sm" color="positive" ref="tableAvaliacoes" selection="none" no-data-label="Sem dados" row-key="id" :rows="avaliacoes" :columns="colunasAvaliacoes">
                <template v-slot:body-cell-avaliacao="props">
                  <q-td :props="props">
                    <q-rating v-model="props.row.avaliacao" size="3em" color="primary" :icon="mdiStarOutline" :icon-selected="mdiStar" readonly />
                  </q-td>
                </template>
              </q-table>
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Fechar" flat v-close-popup />
          <q-btn label="Guardar" color="primary" @click="onOk" v-if="permissaoEdicao" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog persistent v-model="mostraAvalicacoes">
      <q-card style="min-width: 60vw">
        <q-card-section class="row items-center q-pb-md bg-primary text-white">
          <q-icon :name="mdiStar" left size="2rem" />
          <div class="text-h6">Avaliação</div>
          <q-space />
          <q-btn :icon="mdiWindowClose" flat dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="row q-col-gutter-md justify-center">
            <q-rating v-model="avaliacao.avaliacao" size="5em" color="primary" :icon="mdiStarOutline" :icon-selected="mdiStar" />
            <q-input v-model="avaliacao.descricao" label="Descrição" outlined autogrow class="col-xs-12" />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Cancelar" flat v-close-popup />
          <q-btn label="Guardar" color="primary" @click="onGravaAvaliacao" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mdiWindowClose, mdiPlusBoxOutline, mdiPencil, mdiStar, mdiStarOutline, mdiStarHalfFull, mdiCheckCircleOutline, mdiHandshakeOutline, mdiPhoneClassic, mdiWeb, mdiFacebook, mdiTwitter, mdiLinkedin, mdiImageSearchOutline, mdiBadgeAccountHorizontalOutline, mdiFileDocumentEditOutline, mdiFilterOutline, mdiDotsVertical } from '@quasar/extras/mdi-v6'
import { defineComponent, ref, onMounted, watch } from 'vue'
import { get, postFormAuth, apiPublicUrl, postAuth, getAuth } from 'boot/api'
import { useQuasar } from 'quasar'
import { isEmail } from '/src/models/validations'
import TipoProjetoSelector from 'src/components/TipoProjetoSelector.vue'

export default defineComponent({
  components: { TipoProjetoSelector },
  setup() {
    const $q = useQuasar()

    const loading = ref(false)
    const mostraEditor = ref(false)
    const mostraAvalicacoes = ref(false)
    const tableRef = ref(null)
    const tab = ref('geral')
    const inputName = ref(null)
    const inputEmail = ref(null)
    const inputCountry = ref(null)
    const lang = ref('pt')
    const permissaoEdicao = ref(false)

    const avaliacao = ref({
      id: 0,
      avaliacao: 0,
      descricao: '',
      parceiro_id: 0,
      empresa_id: 0
    })

    const active = ref(null)
    const pending = ref(null)

    onMounted(async () => {
      try {
        tiposProjeto.value = await get('tiposprojeto/read-ativo.php')
      } catch {
        $q.notify({
          message: 'Não foi possível obter os tipos de projeto',
          type: 'warning'
        })
      }
      try {
        const result = await getAuth('utilizadores/editor.php?m=15')
        permissaoEdicao.value = result.editor
      } catch {}

      tableRef.value.requestServerInteraction()
    })

    const tiposProjeto = ref([])
    const paises = ref([])
    const avaliacoes = ref([])
    const empresas = ref([])
    const empresaEscolhida = ref([])
    const empresa = ref({
      id: 0,
      nome: '',
      titulo: '',
      ativo: true,
      pendente: true,
      tipos_projeto: [],
      descricao: null,
      email: null,
      website: null,
      facebook: null,
      twitter: null,
      linkedin: null,
      logo: null,
      telefone: null,
      pais_id: 0
    })
    const logo = ref(null)

    const pagination = ref({
      descending: false,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 10,
      sortBy: null
    })
    const filter = ref(null)

    watch([active, pending], (_val, _old) => {
      tableRef.value.requestServerInteraction()
    })

    const isEmailRule = (val) => {
      return isEmail(val) || 'Insira um email válido'
    }
    const isNameValid = function (val) {
      return !!val || t('html.errors.noName')
    }
    const isCountryValid = (val) => {
      if (val <= 0) return t('html.errors.noCountry')
      else return true
    }
    const filterFn = (val, update) => {
      update(async () => {
        if (val !== '') {
          paises.value = await get('paises/read-all.php?filtro=' + val)
        }
      })
    }
    const tipoProjetoUpdated = (e) => {
      empresa.value.tipos_projeto = e
    }
    const onServerRequest = async (props) => {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const filter = props.filter

      loading.value = true
      try {
        const result = await postAuth('empresas/read-parceiros.php', {
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
          message: 'Não foi possível obter os parceiros',
          type: 'warning'
        })
      }
      loading.value = false
    }

    return {
      mdiWindowClose,
      mdiPlusBoxOutline,
      mdiPencil,
      mdiStar,
      mdiStarOutline,
      mdiStarHalfFull,
      mdiCheckCircleOutline,
      mdiHandshakeOutline,
      mdiWeb,
      mdiFacebook,
      mdiTwitter,
      mdiLinkedin,
      mdiImageSearchOutline,
      mdiBadgeAccountHorizontalOutline,
      mdiFileDocumentEditOutline,
      mdiFilterOutline,
      mdiDotsVertical,
      mdiPhoneClassic,
      tableRef,
      tab,
      inputEmail,
      inputName,
      inputCountry,
      loading,
      filter,
      active,
      pending,
      lang,
      permissaoEdicao,
      mostraEditor,
      mostraAvalicacoes,
      avaliacao,
      tiposProjeto,
      paises,
      empresas,
      empresaEscolhida,
      empresa,
      avaliacoes,
      logo,
      pagination,
      colunas: [
        {
          name: 'logo',
          label: '',
          field: 'logo',
          align: 'center',
          style: 'width: 100px'
        },
        { name: 'nome', label: 'Nome', field: 'nome', align: 'left' },
        { name: 'pais', label: 'País', field: 'pais', align: 'left' },
        { name: 'avg_avaliacao', label: 'Avaliação média', field: 'avg_avaliacao', align: 'left' },
        { name: 'num_avaliacoes', label: 'Nº avaliações', field: 'num_avaliacoes', align: 'left' },
        { name: 'ativo', label: 'Ativo', field: 'ativo', align: 'left' },
        {
          name: 'pendente',
          label: 'Pendente',
          field: 'pendente',
          align: 'left'
        },
        { name: 'actions', label: '', field: 'actions' }
      ],
      colunasAvaliacoes: [
        { name: 'avaliacao', label: '', field: 'avaliacao', align: 'left' },
        { name: 'descricao', label: '', field: 'descricao', align: 'left' },
        { name: 'nome_empresa', label: 'Associado', field: 'nome_empresa', align: 'left' }
      ],
      onServerRequest,
      apiPublicUrl,
      isEmailRule,
      isNameValid,
      isCountryValid,
      filterFn,
      tipoProjetoUpdated,
      onNovo: () => {
        logo.value = null
        empresa.value = {
          id: 0,
          nome: '',
          ativo: true,
          pendente: true,
          tipos_projeto: [],
          descricao: null,
          email: null,
          website: null,
          facebook: null,
          twitter: null,
          linkedin: null,
          logo: null,
          pais_id: null
        }
        mostraEditor.value = true
      },
      onEdit: async (b) => {
        empresa.value = await get('empresas/read-single-parceiro.php?id=' + b.id)
        avaliacoes.value = await getAuth('empresas/read-avaliacoes.php?id=' + b.id)
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
        logo.value = null
        empresaEscolhida.value = [b]
        mostraEditor.value = true
      },
      onOk: async () => {
        if (permissaoEdicao.value === false) return

        try {
          if (inputName.value.validate() && inputEmail.value.validate() && inputCountry.value.validate()) {
            const data = new FormData()
            data.append('logo', logo.value)
            data.append('id', empresa.value.id)
            data.append('nome', empresa.value.nome)
            data.append('ativo', empresa.value.ativo)
            data.append('pendente', empresa.value.pendente)
            data.append('tipos_projeto', empresa.value.tipos_projeto)
            data.append('descricao', empresa.value.descricao)
            data.append('email', empresa.value.email)
            data.append('website', empresa.value.website)
            data.append('facebook', empresa.value.facebook)
            data.append('twitter', empresa.value.twitter)
            data.append('linkedin', empresa.value.linkedin)
            data.append('pais_id', empresa.value.pais_id)

            await postFormAuth('empresas/update-parceiro.php', data)
            mostraEditor.value = false
            tableRef.value.requestServerInteraction()
          }
        } catch {
          $q.notify({ message: 'Não foi possível guardar', type: 'warning' })
        }
      },
      onMostraEditorAvalicao: async (row) => {
        empresa.value = row

        //ler avaliacao atual do servidor
        try {
          avaliacao.value = await getAuth('empresas/read-avaliacao.php?id=' + row.id)
          mostraAvalicacoes.value = true
        } catch {}
      },
      onGravaAvaliacao: async () => {
        try {
          avaliacao.value.parceiro_id = empresa.value.id
          await postAuth('empresas/update-avaliacao.php', avaliacao.value)
          mostraAvalicacoes.value = false

          tableRef.value.requestServerInteraction()
        } catch {}
      },
      onApprove: (row) => {
        $q.dialog({
          title: 'Aprovar parceiro local',
          message: `Quer aprovar o parceiro ${row.nome}?`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          try {
            const result = await postAuth('empresas/aprovar-parceiro.php', {
              id: row.id
            })
            tableRef.value.requestServerInteraction()

            if (result.ok) $q.notify({ message: 'Aprovação concluída com sucesso' })
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
