<template>
  <q-page>
    <q-table class="q-mt-sm" color="positive"
      title="Projetos"
      ref="tableRef"
      selection="single"
      no-data-label="Sem dados"
      row-key="id"
      grid
      :rows="projects"
      :columns="columns"
      :rows-per-page-options="[5, 10, 15, 20, 50]"
      :loading="loading"
      v-model:pagination="pagination"
      v-model:selected="selectedProject"
      @request="onServerRequest">
      
      <template v-slot:top>
        <q-select label="País" outlined v-model="country" dense :options="countries" class="q-mr-md" />
        <q-select label="Banco" outlined v-model="bank" dense :options="banks" class="q-mr-md" />
        <q-input label="Projeto" outlined dense/>
        <q-space/>
        <q-btn label="Novo" color="positive" @click="onNewProject" :icon="mdiPlusBoxOutline" class="q-mr-md"/>
        <q-btn label="Cache" color="positive" @click="onRefresh" :icon="mdiRefreshCircle"/>
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
              <q-btn :icon="mdiDelete" flat color="negative" @click="onDeleteProject(props.row)"/>
            </q-card-actions>
          </q-card>
        </div>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { methods, config } from 'boot/config.js'
import { mdiPencil, mdiPlusBoxOutline, mdiRefreshCircle, mdiDelete } from '@quasar/extras/mdi-v5'
import { date, useQuasar } from 'quasar'
import ProjectEditor from 'src/components/Registed/Project.vue'

export default defineComponent({
  setup () {
    const $q = useQuasar()
    const loading = ref(false)

    let countries = ref(['Todos', 'Angola', 'Moçambique'])
    let country = ref('Todos')

    let banks = ref(['Banco Mundial (BM)', 'Banco Interamericano de Desenvolvimento (BID)', 'Banco Europeu para a Reconstrução e Desenvolvimento (BERD)', 'Banco Europeu de Investimento (BEI)'])
    let bank = ref('Banco Mundial (BM)')

    let projects = ref(methods.getProjects())
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

    let selectedProject = ref([])

    const onNewProject = function () {
      const projectEdit = {
        id: projects.value.length + 1,
        nome: '',
        tipo: '',
        data: date.formatDate(new Date(), 'YYYY-MM-DD'),
        descricao: ''
      }

      $q.dialog({
        component: ProjectEditor,
        componentProps: {
          p: projectEdit
        }
      }).onOk(() => {
        tableRef.value.requestServerInteraction()
      })
    }
    const onEditProject = function (project) {
      $q.dialog({
        component: ProjectEditor,
        componentProps: {
          p: project
        }
      }).onOk(() => {
        tableRef.value.requestServerInteraction()
      })
    }

    const onDeleteProject = function (project) {
      $q.dialog({
        title: 'Apagar projeto',
        message: `Quer apagar o projeto ${project.nome}?`,
        cancel: true,
        persistent: true
      }).onOk(() => {
        methods.deleteProject(project.id)
      }).onDismiss(() => {
        tableRef.value.requestServerInteraction()
      })
    }

    const onServerRequest = function (props) {
      const savedProjects = methods.getProjects()

      projects.value.splice(0, projects.value.length, ...savedProjects)
    }

    const onRefresh = function () {
      methods.resetCache()
      projects = ref(methods.getProjects())
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
      countries,
      country,
      banks,
      bank,
      projects,
      columns,
      selectedProject,
      onNewProject,
      onEditProject,
      onDeleteProject,
      onServerRequest,
      onRefresh
    }
  }
})
</script>

<style lang="sass" scoped>
.my-card-img
  height: 235px
</style>
