<template>
  <q-page padding>
    <q-card v-if="mostrarFiltros">
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
                  <q-toggle :model-value="selected" @update:model-value="toggleOption(opt)" />
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-select label="País" outlined v-model="pais" dense :options="paises" class="col-xs-12 col-md-3" 
            option-value="id" option-label="nome" emit-value map-options clearable/>
          
          <q-select label="Banco" outlined v-model="banco" dense :options="bancos" class="col-xs-12 col-md-3" 
            option-value="id" option-label="nome" emit-value map-options clearable/>

          <q-input label="Projeto" outlined dense class="col-xs-12 col-md-3"/>
        </div>
      </q-card-section>
    </q-card>
    <q-table class="q-mt-sm" color="positive"
      title="Projetos"
      ref="tableRef"
      selection="single"
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
          <q-btn @click="mostrarFiltros=!mostrarFiltros" :icon="mdiFilterOutline" outline color="positive"/>
        </q-btn-group>
      </template>

      <template v-slot:body-cell-pais_id="props">
        <q-td :props="props" auto-width>
          {{ getPais(props.row.pais_id) }}
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props" auto-width>
          <q-btn dense flat color="positive" :icon="mdiPencil" @click="onEditProject(props.row)"/>
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
                {{ getPais(props.row.pais_id) }}
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
import { mdiPencil, mdiPlusBoxOutline, mdiRefresh, mdiAlertDecagram, mdiGridLarge, mdiFilterOutline } from '@quasar/extras/mdi-v6'
import { date, useQuasar } from 'quasar'
import { get, post, getAuth } from 'boot/api'
import ProjectEditor from 'src/components/Registed/Projeto.vue'

export default defineComponent({
  setup () {
    const $q = useQuasar()
    const tableRef = ref(null)
    const loading = ref(false)
    const showCards = ref(true)
    const permissaoEdicao = ref(false)
    const mostrarFiltros = ref(false)

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
        paises.value = await get('paises/read-ativo.php')
      } catch {
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

    watch(pais, (_current, _old) => {
      tableRef.value.requestServerInteraction()
    })
    watch(banco, (_current, _old) => {
      tableRef.value.requestServerInteraction()
    })
    watch(tipo, (_current, _old) => {
      tableRef.value.requestServerInteraction()
    })

    const projetos = ref([])
    const columns = [
      { name: 'nome', label: 'Nome', field: 'nome', align: 'left' },
      { name: 'data', label: 'Data', field: 'data', align: 'left' },
      { name: 'descricao', label: 'Descrição', field: 'descricao', align: 'left' },
      { name: 'pais_id', label: 'País', field: 'pais_id', align: 'left' },
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
        pais_id: null,
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
    const onServerRequest = async (props) => {
      try {
        loading.value = true
        const { page, rowsPerPage, sortBy, descending } = props.pagination

        const result = await post('projetos/read.php', { page, rowsPerPage, sortBy, descending, filter: filtroProjeto.value, pais_id: pais.value, banco_id: banco.value, tipo_id: tipo.value })

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
    const getPais = (id) => {
      return paises.value.find(p => p.id === id).nome
    }

    return {
      mdiPencil,
      mdiPlusBoxOutline,
      mdiRefresh,
      mdiAlertDecagram,
      mdiGridLarge,
      mdiFilterOutline,
      showCards,
      loading,
      permissaoEdicao,
      mostrarFiltros,
      pagination,
      tableRef,
      tipos,
      tipo,
      paises,
      pais,
      bancos,
      banco,
      filtroProjeto,
      projetos,
      projetoEscolhido,
      columns,
      refresh,
      toogleShowCards,
      onNovo,
      onEditProject,
      onServerRequest,
      getPais
    }
  }
})
</script>

<style lang="sass" scoped>
.my-card-img
  height: 235px
</style>
