<template>
  <q-page padding>
    <q-table class="q-mt-sm" color="positive"
      title="Tipos Empresa"
      ref="tableRef"
      selection="single"
      no-data-label="Sem dados"
      row-key="id"
      :rows="tipos"
      :columns="colunas"
      :rows-per-page-options="[0, 5, 10]"
      :loading="loading"
      v-model:pagination="pagination"
      v-model:selected="tipoEscolhido"
      @request="onServerRequest">
      
      <template v-slot:top-right>
        <q-space/>
        <q-btn label="Novo" color="positive" @click="onNovo" :icon="mdiPlusBoxOutline" class="q-mr-md"/>
      </template>

      <template v-slot:body-cell-ativo="props">
        <q-td :props="props" auto-width>
          <q-checkbox v-model="props.row.ativo" disable/>
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props" auto-width>
          <q-btn dense flat color="positive" :icon="mdiPencil" @click="onEdit(props.row)"/>
        </q-td>
      </template>
    </q-table>

    <q-dialog persistent v-model="mostraEditor">
      <q-card style="min-width: 60vw;">
        <q-card-section class="row items-center q-pb-md bg-primary text-white">
          <q-icon :name="mdiOfficeBuildingCogOutline" left size="2rem" />
          <div class="text-h6">{{ tipo.nome }} ({{ tipo.id }})</div>
          <q-space />
          <q-btn :icon="mdiWindowClose" flat dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-md">
          <div class="row q-col-gutter-sm">
            <q-input v-model="tipo.nome" label="Nome" outlined class="col-xs-12" />
            <q-checkbox v-model="tipo.ativo" label="Ativo" />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Cancelar" flat v-close-popup />
          <q-btn label="Guardar" color="primary" @click="onOk"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mdiOfficeBuildingCogOutline, mdiWindowClose, mdiPlusBoxOutline, mdiPencil } from '@quasar/extras/mdi-v6'
import { defineComponent, ref, onMounted } from 'vue'
import { get, postAuth } from 'boot/api'
import { useQuasar } from 'quasar'

export default defineComponent({
  setup () {
    const $q = useQuasar()

    const loading = ref(false)
    const mostraEditor = ref(false)
    const tableRef = ref(null)

    onMounted(() => {
        tableRef.value.requestServerInteraction()
    })

    const tipos = ref([])
    const tipoEscolhido = ref([])
    const tipo = ref({ id: 0, nome: '', ativo: true })
    const colunas = [
      { name: 'nome', label: 'Nome', field: 'nome', align: 'left' },
      { name: 'ativo', label: 'Ativo', field: 'ativo', align: 'left' },
      { name: 'actions', label: '', field: 'actions' }
    ]

    const pagination = ref({
      descending: false,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 10
    })
    const onServerRequest = async (_props) => {
      loading.value = true
      try {
        tipos.value = await get('tiposempresa/read.php')
      } catch {
          $q.notify({ message: 'Não foi possível obter os tipos de empresa', type: 'warning' })
      }
      loading.value = false
    }

    return {
      mdiOfficeBuildingCogOutline,
      mdiWindowClose,
      mdiPlusBoxOutline,
      mdiPencil,
      loading,
      tableRef,
      mostraEditor,
      tipos,
      tipoEscolhido,
      tipo,
      colunas,
      pagination,
      onServerRequest,
      onNovo: () => {
        tipo.value = { id: 0, nome: '', ativo: true }
        mostraEditor.value = true
      },
      onEdit: (b) => {
        tipo.value = b
        tipoEscolhido.value = [b]
        mostraEditor.value = true
      },
      onOk: async () => {
        try {
          await postAuth('tiposempresa/update.php', tipo.value)
          tableRef.value.requestServerInteraction()
          mostraEditor.value = false
        } catch (e) {
          console.warn(e)
          $q.notify({ message: 'Não foi possível guardar', type: 'warning' })
        }
      }
    }
  }
  
})
</script>
