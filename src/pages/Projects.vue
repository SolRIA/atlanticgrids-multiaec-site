<template>
  <q-page>
    <q-table class="q-mt-sm" color="positive"
      title="Projetos"
      ref="docTable"
      selection="single"
      no-data-label="Sem dados"
      row-key="id"
      grid
      :rows="projects"
      :columns="columns"
      :rows-per-page-options="[5, 10, 15, 20, 50]"
      :loading="loading"
      v-model:pagination="pagination"
      v-model:selected="selectedProject">

      <template v-slot:top>
        <q-select label="Banco" outlined v-model="bank" dense :options="banks" class="q-mr-md" />
      </template>

      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
            :style="props.selected ? 'transform: scale(0.98);' : ''">
          <q-card class="full-height">
            
            <q-img :src="props.row.imagem" class="my-card-img">
              <div class="absolute-bottom">
                <div class="text-h6">{{ props.row.nome }}</div>
                <div class="text-subtitle2">{{ props.row.descricao }}</div>
              </div>
            </q-img>

            <q-card-actions>
              <q-chip outline square color="positive" text-color="white">
                {{ props.row.pais }}
              </q-chip>
              <q-chip outline square color="primary" text-color="white">
                {{ props.row.data }}
              </q-chip>
            </q-card-actions>

          </q-card>
        </div>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { config, methods } from 'boot/config.js'

export default defineComponent({
  setup () {
    const loading = ref(false)

    let banks = ref(['Banco Mundial (BM)', 'Banco Interamericano de Desenvolvimento (BID)', 'Banco Europeu para a Reconstrução e Desenvolvimento (BERD)', 'Banco Europeu de Investimento (BEI)'])
    let bank = ref('Banco Mundial (BM)')

    const projects = methods.getProjects()
    const columns = [
      { name: 'nome', label: 'Nome', field: 'nome', align: 'left' },
      { name: 'tipo', label: 'Tipo', field: 'tipo', align: 'left' },
      { name: 'data', label: 'Data', field: 'data', align: 'left' },
      { name: 'imagem', label: 'Imagem', field: 'imagem', align: 'left' },
      { name: 'descricao', label: 'Descrição', field: 'descricao' }
    ]

    const pagination = {
      descending: false,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 10
    }

    const selectedProject = ref([])

    return {
      theme_color: config.theme_color,
      bg_color: config.bg_color,
      loading,
      pagination,
      banks,
      bank,
      projects,
      columns,
      selectedProject
    }
  }
})
</script>

<style lang="sass" scoped>
.my-card-img
  height: 235px
</style>
