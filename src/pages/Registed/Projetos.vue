<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="row q-col-gutter-md">
          <q-select
            v-model="tipo"
            :options="tipos"
            label="Tipos de projetos"
            option-label="nome"
            option-value="id"
            class="col-xs-12 col-md-3"
            multiple
            emit-value
            map-options
            outlined
            clearable
            dense
          >
            <template
              v-slot:option="{ itemProps, opt, selected, toggleOption }"
            >
              <q-item v-bind="itemProps">
                <q-item-section>
                  <q-item-label>{{ opt.nome }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-checkbox
                    :model-value="selected"
                    @update:model-value="toggleOption(opt)"
                  />
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-select
            v-model="pais"
            :options="paises"
            label="País"
            outlined
            dense
            class="col-xs-12 col-md-3"
            clearable
          />

          <q-select
            v-model="banco"
            :options="bancos"
            label="Banco"
            outlined
            dense
            class="col-xs-12 col-md-3"
            option-value="id"
            option-label="nome"
            emit-value
            map-options
            clearable
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section avatar>
                  <img :src="logobanco(scope.opt.logo)" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ scope.opt.nome }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-input
            v-model="filtroProjeto"
            label="Projeto"
            debounce="500"
            outlined
            dense
            class="col-xs-12 col-md-3"
          />

          <q-input
            v-model="filtro"
            label="Pesquisa livre"
            debounce="500"
            outlined
            dense
            class="col-xs-12"
          />
        </div>
      </q-card-section>
    </q-card>

    <q-table
      class="q-mt-sm"
      color="positive"
      title="Projetos"
      ref="tableRef"
      selection="none"
      no-data-label="Não existem dados"
      no-results-label="A pesquisa efetuada não devolveu qualquer resultado"
      row-key="id"
      wrap-cells
      :rows="projetos"
      :columns="columns"
      :rows-per-page-options="[5, 10, 15, 20, 50]"
      :loading="loading"
      v-model:pagination="pagination"
      v-model:selected="projetoEscolhido"
      @request="onServerRequest"
    >
      <template v-slot:top-right>
        <q-btn-toggle
          v-model="actionFilterMain"
          no-caps
          rounded
          clearable
          toggle-color="positive"
          :options="accoesCliente"
          v-if="!permissaoEdicao"
        />
        <q-btn-group outline v-if="permissaoEdicao">
          <q-btn
            label="Novo"
            @click="onNovo"
            :icon="mdiPlusBoxOutline"
            color="positive"
          />
          <q-btn @click="refresh" :icon="mdiRefresh" outline color="positive" />
        </q-btn-group>
      </template>

      <template v-slot:body-cell-bancologo="props">
        <q-td :props="props" auto-width>
          <q-avatar rounded>
            <img :src="logobanco(props.row.bancologo)" />
          </q-avatar>
        </q-td>
      </template>

      <template v-slot:body-cell-data="props">
        <q-td :props="props">
          {{ props.row.data.substring(0, 10) }}
        </q-td>
      </template>
      <template v-slot:body-cell-banco_id="props">
        <q-td :props="props" auto-width>
          {{ getBanco(props.row.banco_id) }}
        </q-td>
      </template>

      <template v-slot:body-cell-link="props">
        <q-td :props="props" auto-width>
          <q-btn
            dense
            flat
            color="positive"
            :icon="mdiOpenInNew"
            @click="openProjectLink(props.row)"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" auto-width>
          <q-btn dense flat color="positive" :icon="mdiDotsVertical">
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item
                  clickable
                  v-close-popup
                  @click="onEditProject(props.row)"
                  v-if="permissaoEdicao"
                >
                  <q-item-section avatar>
                    <q-icon :name="mdiPencil" />
                  </q-item-section>
                  <q-item-section>Editar</q-item-section>
                </q-item>

                <q-item
                  clickable
                  v-close-popup
                  @click="onViewProject(props.row)"
                >
                  <q-item-section avatar>
                    <q-icon :name="mdiEye" />
                  </q-item-section>
                  <q-item-section>Ver detalhes</q-item-section>
                </q-item>

                <q-item
                  clickable
                  v-close-popup
                  @click="getSentEmails(props.row)"
                  v-if="permissaoEdicao"
                >
                  <q-item-section avatar>
                    <q-icon :name="mdiEmail" />
                  </q-item-section>
                  <q-item-section>Emails Enviados</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-td>
      </template>

      <template v-slot:no-data="{ message }">
        <div class="full-width row flex-center text-accent">
          <q-icon size="xl" :name="mdiAlertDecagram" class="q-mr-md" />
          <h3>
            {{ message }}
          </h3>
        </div>
      </template>
    </q-table>

    <q-dialog persistent v-model="mostraEmailsEnviados">
      <q-card style="min-width: 60vw">
        <q-card-section class="row items-center q-pb-md bg-primary text-white">
          <div class="text-h6">
            <q-chip color="positive" text-color="white">
              {{ projeto.referencia }}
            </q-chip>
            {{ projeto.nome }}
          </div>
          <q-space />
          <q-btn :icon="mdiWindowClose" flat dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-md">
          <q-table
            class="q-mt-sm"
            color="positive"
            title="Emails enviados"
            ref="tableActionsRef"
            selection="none"
            flat
            bordered
            no-data-label="Não existem dados"
            no-results-label="A pesquisa efetuada não devolveu qualquer resultado"
            row-key="id"
            wrap-cells
            :rows="emailsEnviados"
            :columns="columnsSentEmails"
            :rows-per-page-options="[5, 10, 15, 20, 0]"
            :loading="loadingSentEmails"
          >
            <template v-slot:top-right>
              <q-btn-toggle
                v-model="actionFilter"
                no-caps
                rounded
                toggle-color="positive"
                :options="accoes"
              />
            </template>
            <template v-slot:body-cell-accao="props">
              <q-td :props="props" auto-width>
                <q-chip color="positive" text-color="white">
                  {{ nomeAccao(props.row.accao) }}
                </q-chip>
              </q-td>
            </template>
          </q-table>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Fechar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, watch } from 'vue'
import {
  mdiPencil,
  mdiPlusBoxOutline,
  mdiRefresh,
  mdiAlertDecagram,
  mdiGridLarge,
  mdiOpenInNew,
  mdiEye,
  mdiDotsVertical,
  mdiEmail,
  mdiWindowClose
} from '@quasar/extras/mdi-v6'
import { date, useQuasar } from 'quasar'
import { get, post, getAuth, apiPublicUrl } from 'boot/api'
import { accoes, nomeAccao, accoesCliente } from 'src/models/accoes-projetos'
import ProjectEditor from 'src/components/Registed/Projeto.vue'
import ProjectView from 'src/components/Registed/ProjetoView.vue'

export default defineComponent({
  setup() {
    const $q = useQuasar()
    const tableRef = ref(null)
    const tableActionsRef = ref(null)
    const loading = ref(false)
    const loadingSentEmails = ref(false)
    const permissaoEdicao = ref(false)
    const mostraEmailsEnviados = ref(false)
    onMounted(async () => {
      try {
        const result = await getAuth('utilizadores/editor.php?m=2')
        permissaoEdicao.value = result.editor
      } catch {}
      try {
        tipos.value = await get('tiposprojeto/read-ativo.php')
      } catch {
        $q.notify({
          message: 'Não foi possível obter os tipos de projeto',
          type: 'warning'
        })
      }

      try {
        paises.value = await get('paises/read.php')
      } catch (error) {
        $q.notify({
          message: 'Não foi possível obter os países',
          type: 'warning'
        })
      }

      try {
        bancos.value = await get('bancos/read-ativo.php')
      } catch {
        $q.notify({
          message: 'Não foi possível obter os bancos',
          type: 'warning'
        })
      }

      if (permissaoEdicao.value === false) {
        // get the base filter for this user: tipos_projeto to apply
        tipo.value = await getAuth('empresas/read-tipos-projeto.php')
      }
      tableRef.value.requestServerInteraction()
    })

    let paises = ref([])
    const pais = ref(null)

    const bancos = ref([])
    const banco = ref(null)

    const tipos = ref([])
    const tipo = ref(null)

    const filtroProjeto = ref(null)
    const filtro = ref(null)

    const actionFilter = ref(1)
    const actionFilterMain = ref(null)

    watch(pais, (_current, _old) => {
      tableRef.value.requestServerInteraction()
    })
    watch(actionFilter, (_current, _old) => {
      getSentEmails()
    })
    watch(actionFilterMain, (_current, _old) => {
      tableRef.value.requestServerInteraction()
    })
    watch(banco, (_current, _old) => {
      tableRef.value.requestServerInteraction()
    })
    watch(tipo, (_current, _old) => {
      tableRef.value.requestServerInteraction()
    })
    watch(filtroProjeto, (_current, _old) => {
      tableRef.value.requestServerInteraction()
    })
    watch(filtro, (_current, _old) => {
      tableRef.value.requestServerInteraction()
    })

    const projetos = ref([])
    const pagination = ref({
      descending: false,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 10,
      sortBy: null
    })

    const projetoEscolhido = ref([])
    const projeto = ref({})
    const emailsEnviados = ref([])

    const logobanco = (logo) => {
      return apiPublicUrl(logo)
    }
    const refresh = () => {
      tableRef.value.requestServerInteraction()
    }
    const onNovo = () => {
      const p = {
        id: 0,
        nome: '',
        tipos: [],
        pais: null,
        banco_id: null,
        ativo: true,
        referencia: '',
        data: date.formatDate(new Date(), 'YYYY-MM-DD'),
        descricao: ''
      }

      $q.dialog({
        component: ProjectEditor,
        componentProps: {
          p: p,
          tipos: tipos.value,
          paises: paises.value,
          bancos: bancos.value
        }
      }).onOk(async () => {
        tableRef.value.requestServerInteraction()
      })
    }
    const onEditProject = (project) => {
      $q.dialog({
        component: ProjectEditor,
        componentProps: {
          p: project,
          tipos: tipos.value,
          paises: paises.value,
          bancos: bancos.value
        }
      }).onOk(async () => {
        tableRef.value.requestServerInteraction()
      })
    }
    const onViewProject = (project) => {
      $q.dialog({
        component: ProjectView,
        componentProps: {
          p: project,
          tipos: tipos.value,
          paises: paises.value,
          bancos: bancos.value
        }
      }).onOk(async () => {
        tableRef.value.requestServerInteraction()
      })
    }
    const onServerRequest = async (props) => {
      try {
        loading.value = true
        const { page, rowsPerPage, sortBy, descending } = props.pagination

        const result = await post('projetos/read.php', {
          page,
          rowsPerPage,
          sortBy,
          descending,
          filterProject: filtroProjeto.value,
          filter: filtro.value,
          pais: pais.value,
          banco_id: banco.value,
          tipo_id: tipo.value,
          accao: actionFilterMain.value
        })

        projetos.value = result.rows

        pagination.value.rowsNumber = result.count
        pagination.value.page = page
        pagination.value.rowsPerPage = rowsPerPage
        pagination.value.sortBy = sortBy
        pagination.value.descending = descending
      } catch (e) {
        $q.notify({
          message: 'Não foi possível obter os projetos',
          type: 'warning'
        })
      }
      loading.value = false
    }
    const openProjectLink = (row) => {
      window.open(row.link, '_blank')
    }
    const getBanco = (id) => {
      return bancos.value.find((p) => p.id === id).codigo
    }
    const getSentEmails = async (p) => {
      if (typeof p !== 'undefined') {
        projeto.value = p
      }
      mostraEmailsEnviados.value = true

      try {
        loadingSentEmails.value = true

        const result = await post('projetos/read-sent-emails-project.php', {
          projeto_id: projeto.value.id,
          accao: actionFilter.value,
          nome: ''
        })

        emailsEnviados.value = result
      } catch (e) {
        $q.notify({
          message: 'Não foi possível obter os emails enviados',
          type: 'warning'
        })
      }

      loadingSentEmails.value = false
    }

    return {
      mdiPencil,
      mdiPlusBoxOutline,
      mdiRefresh,
      mdiAlertDecagram,
      mdiGridLarge,
      mdiEye,
      mdiOpenInNew,
      mdiDotsVertical,
      mdiEmail,
      mdiWindowClose,
      loading,
      loadingSentEmails,
      permissaoEdicao,
      mostraEmailsEnviados,
      pagination,
      tableRef,
      tableActionsRef,
      tipos,
      tipo,
      paises,
      pais,
      bancos,
      banco,
      filtroProjeto,
      filtro,
      projetos,
      projeto,
      emailsEnviados,
      projetoEscolhido,
      actionFilter,
      actionFilterMain,
      accoes,
      accoesCliente,
      columns: [
        {
          name: 'referencia',
          label: 'Referência',
          field: 'referencia',
          align: 'left'
        },
        { name: 'nome', label: 'Nome', field: 'nome', align: 'left' },
        {
          name: 'data',
          label: 'Data',
          field: 'data',
          align: 'left',
          style: 'width: 100px'
        },
        { name: 'cliente', label: 'Cliente', field: 'cliente', align: 'left' },
        { name: 'setor', label: 'Setor', field: 'setor', align: 'left' },
        { name: 'pais', label: 'País', field: 'pais', align: 'left' },
        {
          name: 'banco_id',
          label: 'Banco',
          field: 'banco_id',
          align: 'center'
        },
        { name: 'bancologo', label: '', field: 'bancologo', align: 'center' },
        { name: 'link', label: '', field: 'link', align: 'center' },
        { name: 'actions', label: '', field: 'actions', align: 'center' }
      ],
      columnsSentEmails: [
        { name: 'nome', label: 'Empresa', field: 'nome', align: 'left' },
        { name: 'accao', label: 'Açcão', field: 'accao', align: 'center' },
        {
          name: 'emails_enviados',
          label: 'Emails enviados',
          field: 'emails_enviados',
          align: 'right'
        }
      ],
      logobanco,
      refresh,
      onNovo,
      onEditProject,
      onViewProject,
      onServerRequest,
      openProjectLink,
      getBanco,
      getSentEmails,
      nomeAccao
    }
  }
})
</script>
