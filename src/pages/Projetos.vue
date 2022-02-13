<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <p>Instituições Financeiras do projeto</p>
        <p>Este separador apresenta uma breve descrição de cada banco e qual o procurement atualmente disponível 
    no sector da construção por cada banco. ( até aqui esta informação é pública). Só os membros da PTPC podem ver informação adiciona</p>
        
      </q-card-section>
      <q-card-section>
        <div class="row q-col-gutter-md">
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

            <q-select v-model="pais" :options="paises" label="País" outlined dense class="col-xs-12 col-md-3" 
                  option-value="nome" option-label="nome" emit-value map-options clearable/>

            <q-input v-model="filtro" label="Pesquisa livre" debounce="500" outlined dense class="col-xs-6"/>
          </div>
          <p>{{ banco?.descricao ?? '' }}</p>
      </q-card-section>
    </q-card>
    <q-table class="q-mt-sm" color="positive"
      title="Projetos"
      ref="tableRef"
      selection="none"
      no-data-label="Sem dados"
      row-key="id"
      wrap-cells
      :grid="$q.screen.xs"
      :rows="projetos"
      :columns="columns"
      :rows-per-page-options="[5, 10, 15, 20, 50]"
      :loading="loading"
      v-model:pagination="pagination"
      v-model:selected="projetoEscolhido"
      @request="onServerRequest">

      <template v-slot:body-cell-data="props">
        <q-td :props="props">
          {{ props.row.data.substring(0, 10) }}
        </q-td>
      </template>
      <template v-slot:body-cell-referencia="props">
        <q-td :props="props">
         <q-btn to="/login" :label="props.row.referencia" flat rounded/>
        </q-td>
      </template>
      <template v-slot:body-cell-banco_id="props">
        <q-td :props="props" auto-width>
          {{ getBanco(props.row.banco_id) }}
        </q-td>
      </template>
      <template v-slot:body-cell-bancologo="props">
        <q-td :props="props" auto-width>
          <q-avatar rounded>
            <img :src="logobanco(props.row.bancologo)">
          </q-avatar>
        </q-td>
      </template>

      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
            :style="props.selected ? 'transform: scale(0.98);' : ''">
          <q-card class="full-height">
            
            <q-card-section>
              <div class="text-h6">{{ props.row.nome }}</div>
              <div class="text-subtitle2">{{ props.row.descricao }}</div>
            </q-card-section>
            
            <q-card-actions>
              <q-chip outline square color="positive" text-color="white">
                {{ props.row.pais }}
              </q-chip>
              <q-chip outline square color="positive" text-color="white">
                {{ props.row.data }}
              </q-chip>
              <q-btn label="Saber mais" outline dense color="primary"/>
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
import { mdiAlertDecagram } from '@quasar/extras/mdi-v6'
import { get, post, apiPublicUrl } from 'boot/api'
import { useQuasar } from 'quasar'

export default defineComponent({
  setup () {
    const $q = useQuasar()

    const tableRef = ref(null)
    const loading = ref(false)

    onMounted(async () => {
      loading.value = true
      try {
        bancos.value = await get('bancos/read.php')
      } catch {
        $q.notify({ message: 'Não foi possível efetuar obter os bancos', type: 'warning' })
      }
      
      try {
        paises.value = await get('paises/read.php')
      } catch {
        $q.notify({ message: 'Não foi possível obter os países', type: 'warning' })
      }

      tableRef.value.requestServerInteraction()
      loading.value = false
    })

    const bancos = ref([])
    const banco = ref()
    const paises = ref([])
    const pais = ref(null)
    const filtro = ref(null)

    const projetos = ref([])
    const columns = [
      { name: 'referencia', label: 'Referência', field: 'referencia', align: 'left' },
      { name: 'nome', label: 'Nome', field: 'nome', align: 'left' },
      { name: 'data', label: 'Data', field: 'data', align: 'left', style: "width: 100px" },
      { name: 'setor', label: 'Setor', field: 'setor', align: 'left' },
      { name: 'pais', label: 'País', field: 'pais', align: 'left' },
      { name: 'banco_id', label: 'Banco', field: 'banco_id', align: 'center' },
      { name: 'bancologo', label: '', field: 'bancologo', align: 'center' }
    ]

    const pagination = ref({
      descending: false,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 10,
      sortBy: null
    })

    const projetoEscolhido = ref([])

    watch([banco, pais, filtro], (_current, _previus) => {
      tableRef.value.requestServerInteraction()
    })

    const logobanco = (logo) => {
      return apiPublicUrl(logo)
    }
    const onServerRequest = async (props) => {
      try {
        loading.value = true
        const { page, rowsPerPage, sortBy, descending } = props.pagination
        let banco_id = 0
        if(typeof banco.value !== 'undefined' && banco.value !== null) {
          banco_id = banco.value.id
        }
        const result = await post('projetos/read.php', { page, rowsPerPage, sortBy, descending, banco_id: banco_id, filter: filtro.value, filterProject: null, pais: pais.value, tipo_id: null })

        projetos.value = result.rows;

        pagination.value.rowsNumber = result.count
        pagination.value.page = page
        pagination.value.rowsPerPage = rowsPerPage
        pagination.value.sortBy = sortBy
        pagination.value.descending = descending
      } catch (e) {
        console.log(e)
        $q.notify({ message: 'Não foi possível obter os projetos', type: 'warning' })
      }
      loading.value = false
    }
    const getBanco = (id) => {
      return bancos.value.find(p => p.id === id).codigo
    }

    return {
      mdiAlertDecagram,
      tableRef,
      loading,
      pagination,
      bancos,
      banco,
      paises,
      pais,
      filtro,
      projetos,
      projetoEscolhido,
      columns,
      logobanco,
      onServerRequest,
      getBanco
    }
  }
})
</script>

<style lang="sass" scoped>
.my-card-img
  height: 235px

.q-page
  background-color: #a6b3bf !important
</style>
