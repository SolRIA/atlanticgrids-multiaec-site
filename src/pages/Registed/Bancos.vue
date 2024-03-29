<template>
  <q-page padding>
    <q-table class="q-mt-sm" color="positive"
      title="Bancos"
      ref="tableRef"
      selection="single"
      no-data-label="Sem dados"
      row-key="id"
      :rows="bancos"
      :columns="colunas"
      :rows-per-page-options="[0, 5, 10]"
      :loading="loading"
      v-model:pagination="pagination"
      v-model:selected="bancoEscolhido"
      @request="onServerRequest">
      
      <template v-slot:top-right>
        <q-space/>
        <q-btn label="Novo" color="positive" @click="onNovo" :icon="mdiPlusBoxOutline" class="q-mr-md"/>
      </template>

      <template v-slot:body-cell-logo="props">
        <q-td :props="props" auto-width>
          <q-avatar rounded>
            <img :src="logobanco(props.row.logo)">
          </q-avatar>
        </q-td>
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
          <q-icon :name="mdiBank" left size="2rem" />
          <div class="text-h6">{{ banco.nome }} ({{ banco.id }})</div>
          <q-space />
          <q-btn :icon="mdiWindowClose" flat dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-md">
          <div class="row q-col-gutter-sm">
            <q-input v-model="banco.codigo" label="Código" outlined class="col-xs-4" />
            <q-input v-model="banco.nome" label="Nome" outlined class="col-xs-8" />
            <q-input v-model="banco.descricao" label="Descrição" outlined class="col-xs-12" />

            <q-checkbox v-model="banco.ativo" label="Ativo" class="col-xs-12 col-md-4"/>
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
import { mdiBank, mdiWindowClose, mdiPlusBoxOutline, mdiPencil } from '@quasar/extras/mdi-v6'
import { defineComponent, ref, onMounted } from 'vue'
import { get, postAuth, apiPublicUrl } from 'boot/api'
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

    const bancos = ref([])
    const bancoEscolhido = ref([])
    const banco = ref({ id: 0, nome: '', codigo: '', ativo: true, descricao: null, website: null, logo: null })
    const colunas = [
      { name: 'logo', label: '', field: 'logo', align: 'center' },
      { name: 'codigo', label: 'Código', field: 'codigo', align: 'left' },
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
        bancos.value = await get('bancos/read.php')
      } catch {
        $q.notify({ message: 'Não foi possível obter os bancos', type: 'warning' })
      }
      loading.value = false
    }
    const logobanco = (logo) => {
      return apiPublicUrl(logo)
    }

    return {
      mdiBank,
      mdiWindowClose,
      mdiPlusBoxOutline,
      mdiPencil,
      loading,
      tableRef,
      mostraEditor,
      bancos,
      bancoEscolhido,
      banco,
      colunas,
      pagination,
      onServerRequest,
      logobanco,
      onNovo: () => {
        banco.value = { id: 0, nome: '', decricao: null, ativo: true, website: null, logo: null }
        mostraEditor.value = true
      },
      onEdit: (b) => {
        banco.value = b
        bancoEscolhido.value = [b]
        mostraEditor.value = true
      },
      onOk: async () => {
        try {
          await postAuth('bancos/update.php', banco.value)
          tableRef.value.requestServerInteraction()
          mostraEditor.value = false
        } catch {
          $q.notify({ message: 'Não foi possível guardar', type: 'warning' })
        }
      }
    }
  }
  
})
</script>
