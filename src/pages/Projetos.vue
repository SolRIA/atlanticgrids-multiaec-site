<template>
  <q-page>
    <q-table class="q-mt-sm" color="positive"
      title="Projetos"
      ref="docTable"
      selection="single"
      no-data-label="Sem dados"
      row-key="id"
      grid
      :rows="projetos"
      :columns="columns"
      :rows-per-page-options="[5, 10, 15, 20, 50]"
      :loading="loading"
      v-model:pagination="pagination"
      v-model:selected="projetoEscolhido">

      <template v-slot:top>
        <q-select v-model="banco" :options="bancos" option-value="id" option-label="nome" emit-value map-options
          label="Banco" outlined dense class="q-mr-md" style="min-width: 200px"/>
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
import { defineComponent, ref, onMounted } from 'vue'
import { mdiAlertDecagram } from '@quasar/extras/mdi-v6'
import { get } from 'boot/api'
import { useQuasar } from 'quasar'

export default defineComponent({
  setup () {
    const $q = useQuasar()

    const loading = ref(false)

    onMounted(async () => {
      loading.value = true
      try {
        bancos.value = await get('bancos/read.php')
      } catch {
          $q.notify({ message: 'Não foi possível efetuar obter os bancos', type: 'warning' })
      }
      loading.value = false
    })

    const bancos = ref([])
    const banco = ref()

    const projetos = ref([])
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

    const projetoEscolhido = ref([])

    return {
      mdiAlertDecagram,
      loading,
      pagination,
      bancos,
      banco,
      projetos,
      projetoEscolhido,
      columns
    }
  }
})
</script>

<style lang="sass" scoped>
.my-card-img
  height: 235px
</style>
