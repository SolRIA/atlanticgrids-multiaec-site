<template>
  <q-page>
    <q-table class="q-mt-sm" color="positive"
      title="Projetos"
      ref="tableRef"
      selection="single"
      no-data-label="Sem dados"
      row-key="id"
      grid
      :rows="projetos"
      :columns="columns"
      :rows-per-page-options="[5, 10, 15, 20, 50]"
      :loading="loading"
      v-model:pagination="pagination"
      v-model:selected="projetoEscolhido"
      @request="onServerRequest">
      
      <template v-slot:top>
        <q-select label="País" outlined v-model="pais" dense :options="paises" class="q-mr-md" 
          option-value="id" option-label="nome" emit-value map-options/>
        <q-select label="Banco" outlined v-model="banco" dense :options="bancos" class="q-mr-md" 
          option-value="id" option-label="nome" emit-value map-options/>
        <q-input label="Projeto" outlined dense/>
        <q-space/>
        <q-btn label="Novo" color="positive" @click="onNovo" :icon="mdiPlusBoxOutline" class="q-mr-md"/>
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
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { mdiPencil, mdiPlusBoxOutline, mdiRefreshCircle, mdiDelete } from '@quasar/extras/mdi-v5'
import { date, useQuasar } from 'quasar'
import { postAuth, get } from 'boot/api'
import ProjectEditor from 'src/components/Registed/Project.vue'

export default defineComponent({
  setup () {
    const $q = useQuasar()
    const loading = ref(false)

    onMounted(async () => {
      try {
        const result = await get('paises/read.php')

        paises.value = await result.json()
      } catch {
          $q.notify({ message: 'Não foi possível obter os países', type: 'warning' })
      }

      try {
        const result = await get('bancos/read.php')

        bancos.value = await result.json()
      } catch {
          $q.notify({ message: 'Não foi possível obter os bancos', type: 'warning' })
      }
    })

    const paises = ref([])
    const pais = ref({})

    //const bancos = ref(['Banco Mundial (BM)', 'Banco Interamericano de Desenvolvimento (BID)', 'Banco Europeu para a Reconstrução e Desenvolvimento (BERD)', 'Banco Europeu de Investimento (BEI)'])
    const bancos = ref([])
    const banco = ref({})

    const projetos = ref([])
    const columns = [
      { name: 'nome', label: 'Nome', field: 'nome', align: 'left' },
      { name: 'tipo', label: 'Tipo', field: 'tipo', align: 'left' },
      { name: 'data', label: 'Data', field: 'data', align: 'left' },
      { name: 'imagem', label: 'Imagem', field: 'imagem', align: 'left' },
      { name: 'descricao', label: 'Descrição', field: 'descricao' }
    ]

    const pagination = ref({
      descending: false,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 10
    })
    const tableRef = ref(null)

    const projetoEscolhido = ref([])

    const onNovo = () => {
      const p = {
        id: projects.value.length + 1,
        nome: '',
        tipo: '',
        data: date.formatDate(new Date(), 'YYYY-MM-DD'),
        descricao: ''
      }

      $q.dialog({
        component: ProjectEditor,
        componentProps: {
          p: p
        }
      }).onOk(async () => {
        try {
          await postAuth('projetos/update.php', p)
          tableRef.value.requestServerInteraction()
        } catch {
          $q.notify({ message: 'Não foi possível guardar', type: 'warning' })
        }
      })
    }
    const onEditProject = (project) => {
      $q.dialog({
        component: ProjectEditor,
        componentProps: {
          p: project
        }
      }).onOk(async () => {
        try {
          await postAuth('projetos/update.php', project)
          tableRef.value.requestServerInteraction()
        } catch {
          $q.notify({ message: 'Não foi possível guardar', type: 'warning' })
        }
      })
    }

    const onServerRequest = async (props) => {
      try {
        // TODO: pagging and filter
        const result = await get('projetos/read.php')
        projects.value = await result.json()
      } catch {
          $q.notify({ message: 'Não foi possível obter os projetos', type: 'warning' })
      }
    }

    return {
      mdiPencil,
      mdiPlusBoxOutline,
      mdiRefreshCircle,
      mdiDelete,
      theme_color: config.theme_color,
      bg_color: config.bg_color,
      loading,
      pagination,
      tableRef,
      paises,
      pais,
      bancos,
      banco,
      projetos,
      projetoEscolhido,
      columns,
      onNovo,
      onEditProject,
      onServerRequest
    }
  }
})
</script>

<style lang="sass" scoped>
.my-card-img
  height: 235px
</style>
