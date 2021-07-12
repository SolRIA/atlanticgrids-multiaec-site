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
      
      <template v-slot:top-right>
        <q-btn label="Novo" color="positive" @click="onNewProject" class="q-mr-md" :icon="mdiPlusBoxOutline"/>
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
import { mdiPencil, mdiPlusBoxOutline, mdiDelete } from '@quasar/extras/mdi-v5'
import { date, useQuasar } from 'quasar'
import ProjectEditor from 'src/components/Registed/Project.vue'

export default defineComponent({
  // components: {
  //   Project: defineAsyncComponent(() => import('src/components/Registed/Project.vue')),
  // },
  setup () {
    const $q = useQuasar()
    const loading = ref(false)

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

    return {
      mdiPencil,
      mdiPlusBoxOutline,
      mdiDelete,
      theme_color: config.theme_color,
      bg_color: config.bg_color,
      loading,
      pagination,
      tableRef,
      projects,
      columns,
      selectedProject,
      onNewProject,
      onEditProject,
      onDeleteProject,
      onServerRequest
    }
  }
})
</script>

<style lang="sass" scoped>
.my-card-img
  height: 235px
</style>
