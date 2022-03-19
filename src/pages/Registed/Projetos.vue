<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="row q-col-gutter-md">
          <q-select v-model="tipo" :options="tipos" label="Tipos de projetos" option-label="nome" option-value="id" class="col-xs-12 col-md-3"
            multiple emit-value map-options outlined clearable dense>
            <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
              <q-item v-bind="itemProps">
                <q-item-section>
                  <q-item-label>{{ opt.nome }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-checkbox :model-value="selected" @update:model-value="toggleOption(opt)" />
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-select v-model="pais" :options="paises" label="País" outlined dense class="col-xs-12 col-md-3" 
            option-value="nome" option-label="nome" emit-value map-options clearable/>
          
          <q-select v-model="banco" :options="bancos" label="Banco" outlined dense class="col-xs-12 col-md-3" 
            option-value="id" option-label="nome" emit-value map-options clearable>
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section avatar>
                  <img :src="logobanco(scope.opt.logo)">
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ scope.opt.nome }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-input v-model="filtroProjeto" label="Projeto" debounce="500" outlined dense class="col-xs-12 col-md-3"/>
          
          <q-input v-model="filtro" label="Pesquisa livre" debounce="500" outlined dense class="col-xs-12"/>
        </div>
      </q-card-section>
    </q-card>

    <q-table class="q-mt-sm" color="positive"
      title="Projetos"
      ref="tableRef"
      selection="none"
      no-data-label="Não existem dados"
      no-results-label="A pesquisa efetuada não devolveu qualquer resultado"
      row-key="id"
      wrap-cells
      :grid="showCards"
      :rows="projetos"
      :columns="columns"
      :rows-per-page-options="[5, 10, 15, 20, 50]"
      :loading="loading"
      v-model:pagination="pagination"
      v-model:selected="projetoEscolhido"
      @request="onServerRequest">
      
      <template v-slot:top-right>
        <q-btn-group outline>
          <q-btn label="Novo" @click="onNovo" :icon="mdiPlusBoxOutline" color="positive" v-if="permissaoEdicao"/>
          <q-btn @click="refresh" :icon="mdiRefresh" outline color="positive"/>
          <q-btn @click="toogleShowCards" :icon="mdiGridLarge" outline color="positive"/>
        </q-btn-group>
      </template>

      <template v-slot:body-cell-bancologo="props">
        <q-td :props="props" auto-width>
          <q-avatar rounded>
            <img :src="logobanco(props.row.bancologo)">
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
          <q-btn dense flat color="positive" :icon="mdiOpenInNew" @click="openProjectLink(props.row)"/>
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" auto-width>
          <q-btn dense flat color="positive" :icon="mdiPencil" @click="onEditProject(props.row)" v-if="permissaoEdicao"/>
          <q-btn dense flat color="positive" :icon="mdiEye" @click="onViewProject(props.row)" v-if="!permissaoEdicao"/>
        </q-td>
      </template>

      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
            :style="props.selected ? 'transform: scale(0.98);' : ''">
          <q-card class="full-height">
            <q-img :src="props.row.imagem" class="my-card-img">
              <div class="absolute-bottom">
                <div class="text-h6">{{ props.row.nome }} ({{ props.row.id }})</div>
                <div class="text-subtitle2">{{ props.row.descricao }}</div>
              </div>
            </q-img>

            <q-card-actions align="right" class="vertical-bottom">
              <q-chip outline square color="positive" text-color="white">
                {{ props.row.pais }}
              </q-chip>
              <q-chip outline square color="primary" text-color="white">
                {{ props.row.data }}
              </q-chip>
              <q-btn :icon="mdiPencil" flat color="positive" @click="onEditProject(props.row)"/>
            </q-card-actions>
          </q-card>
        </div>
      </template>

      <template v-slot:no-data="{ message }">
        <div class="full-width row flex-center text-accent">
          <q-icon size="xl" :name="mdiAlertDecagram" class="q-mr-md"/>
          <h3>
            {{ message }}
          </h3>
        </div>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, watch } from 'vue'
import { mdiPencil, mdiPlusBoxOutline, mdiRefresh, mdiAlertDecagram, mdiGridLarge, mdiOpenInNew, mdiEye } from '@quasar/extras/mdi-v6'
import { date, useQuasar } from 'quasar'
import { get, post, getAuth, apiPublicUrl } from 'boot/api'
import ProjectEditor from 'src/components/Registed/Projeto.vue'
import ProjectView from 'src/components/Registed/ProjetoView.vue'

export default defineComponent({
  setup () {
    const $q = useQuasar()
    const tableRef = ref(null)
    const loading = ref(false)
    const showCards = ref(true)
    const permissaoEdicao = ref(false)
    onMounted(async () => {
      showCards.value = JSON.parse(localStorage.getItem('showCards'))
      try {
        const result = await getAuth('utilizadores/editor.php?m=2')
        permissaoEdicao.value = result.editor
      } catch { }
      try {
        tipos.value = await get('tiposprojeto/read-ativo.php')
      } catch {
        $q.notify({ message: 'Não foi possível obter os tipos de projeto', type: 'warning' })
      }

      try {
        paises.value = await get('paises/read.php')
      } catch (error) {
        console.log(error)
        $q.notify({ message: 'Não foi possível obter os países', type: 'warning' })
      }

      try {
        bancos.value = await get('bancos/read-ativo.php')
      } catch {
        $q.notify({ message: 'Não foi possível obter os bancos', type: 'warning' })
      }

      if (permissaoEdicao.value === false) {
        // get the base filter for this user: tipos_projeto to apply
        tipo.value = await getAuth('empresas/read-tipos-projeto.php')
      }
      tableRef.value.requestServerInteraction()
    })

    const paises = ref([])
    const pais = ref(null)

    const bancos = ref([])
    const banco = ref(null)

    const tipos = ref([])
    const tipo = ref(null)

    const filtroProjeto = ref(null)
    const filtro = ref(null)

    watch(pais, (_current, _old) => {
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
    const columns = [
      { name: 'referencia', label: 'Referência', field: 'referencia', align: 'left' },
      { name: 'nome', label: 'Nome', field: 'nome', align: 'left' },
      { name: 'data', label: 'Data', field: 'data', align: 'left', style: "width: 100px" },
      { name: 'cliente', label: 'Cliente', field: 'cliente', align: 'left' },
      { name: 'setor', label: 'Setor', field: 'setor', align: 'left' },
      { name: 'pais', label: 'País', field: 'pais', align: 'left' },
      { name: 'banco_id', label: 'Banco', field: 'banco_id', align: 'center' },
      { name: 'bancologo', label: '', field: 'bancologo', align: 'center' },
      { name: 'link', label: '', field: 'link', align: 'center' },
      { name: 'actions', label: '', field: 'actions', align: 'center' }
    ]

    const pagination = ref({
      descending: false,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 10,
      sortBy: null
    })

    const projetoEscolhido = ref([])

    const logobanco = (logo) => {
      return apiPublicUrl(logo)
    }
    const toogleShowCards = () => {
      showCards.value = !showCards.value
      localStorage.setItem('showCards', JSON.stringify(showCards.value))
    }
    const refresh = () => {
      localStorage.setItem('showCards', JSON.stringify(showCards.value))
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

        const result = await post('projetos/read.php', { page, rowsPerPage, sortBy, descending, filterProject: filtroProjeto.value, filter: filtro.value, pais: pais.value, banco_id: banco.value, tipo_id: tipo.value })

        projetos.value = result.rows;

        pagination.value.rowsNumber = result.count
        pagination.value.page = page
        pagination.value.rowsPerPage = rowsPerPage
        pagination.value.sortBy = sortBy
        pagination.value.descending = descending
      } catch (e) {
        $q.notify({ message: 'Não foi possível obter os projetos', type: 'warning' })
      }
      loading.value = false
    }
    const openProjectLink = (row) => {
       window.open(row.link, "_blank");
    }
    const getBanco = (id) => {
      return bancos.value.find(p => p.id === id).codigo
    }

    return {
      mdiPencil,
      mdiPlusBoxOutline,
      mdiRefresh,
      mdiAlertDecagram,
      mdiGridLarge,
      mdiEye,
      mdiOpenInNew,
      showCards,
      loading,
      permissaoEdicao,
      pagination,
      tableRef,
      tipos,
      tipo,
      paises,
      pais,
      bancos,
      banco,
      filtroProjeto,
      filtro,
      projetos,
      projetoEscolhido,
      columns,
      logobanco,
      refresh,
      toogleShowCards,
      onNovo,
      onEditProject,
      onViewProject,
      onServerRequest,
      openProjectLink,
      getBanco
    }
  }
})
</script>

<style lang="sass" scoped>
.my-card-img
  height: 235px
</style>
