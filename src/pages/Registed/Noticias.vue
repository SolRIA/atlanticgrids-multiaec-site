<template>
  <q-page padding>
    <q-table
      class="q-mt-sm"
      color="positive"
      title="Notícias"
      ref="tableRef"
      selection="single"
      no-data-label="Sem dados"
      row-key="id"
      :rows="noticias"
      :columns="colunas"
      :rows-per-page-options="[0, 5, 10]"
      :loading="loading"
      v-model:pagination="pagination"
      v-model:selected="noticiaEscolhida"
      @request="onServerRequest"
    >
      <template v-slot:top-right>
        <q-space />
        <q-btn
          label="Novo"
          color="positive"
          @click="onNovo"
          :icon="mdiPlusBoxOutline"
          class="q-mr-md"
        />
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props" auto-width>
          <q-btn
            dense
            flat
            color="positive"
            :icon="mdiPencil"
            @click="onEdit(props.row)"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-banco_id="props">
        <q-td :props="props" auto-width>
          <q-avatar rounded>
            <img :src="logobanco(props.row.banco_id)" />
          </q-avatar>
        </q-td>
      </template>
    </q-table>

    <q-dialog persistent v-model="mostraEditor">
      <q-card style="min-width: 60vw">
        <q-card-section class="row items-center q-pb-md bg-primary text-white">
          <q-space />
          <q-btn :icon="mdiWindowClose" flat dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-md">
          <div class="row q-col-gutter-sm">
            <q-input
              v-model="noticia.titulo"
              label="Título"
              outlined
              class="col-xs-12"
            />
            <q-input
              v-model="noticia.link"
              label="Link"
              outlined
              class="col-xs-6"
            />
            <q-input
              v-model="noticia.imagem"
              label="Link imagem"
              outlined
              class="col-xs-6"
            />
            <q-input
              v-model="noticia.descricao"
              label="Descrição"
              outlined
              type="textarea"
              class="col-xs-12"
            />
            <q-select
              label="Banco"
              outlined
              v-model="noticia.banco_id"
              :options="bancos"
              class="col-xs-12"
              option-value="id"
              option-label="nome"
              emit-value
              map-options
            />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Cancelar" flat v-close-popup />
          <q-btn label="Guardar" color="primary" @click="onOk" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import {
  mdiWindowClose,
  mdiPlusBoxOutline,
  mdiPencil
} from '@quasar/extras/mdi-v6'
import { defineComponent, ref, onMounted } from 'vue'
import { get, postAuth, apiPublicUrl } from 'boot/api'
import { useQuasar } from 'quasar'

export default defineComponent({
  setup() {
    const $q = useQuasar()

    const loading = ref(false)
    const mostraEditor = ref(false)
    const tableRef = ref(null)

    onMounted(async () => {
      try {
        bancos.value = await get('bancos/read-ativo.php')
      } catch {
        $q.notify({
          message: 'Não foi possível obter os bancos',
          type: 'warning'
        })
      }

      tableRef.value.requestServerInteraction()
    })

    const bancos = ref([])
    const noticias = ref([])
    const noticiaEscolhida = ref([])
    const noticia = ref({
      id: 0,
      titulo: '',
      link: '',
      ativo: true,
      descricao: null,
      imagem: null,
      banco_id: 1
    })
    const colunas = [
      { name: 'titulo', label: 'titulo', field: 'titulo', align: 'left' },
      {
        name: 'created_at',
        label: 'Criado',
        field: 'created_at',
        align: 'left'
      },
      { name: 'banco_id', label: 'Banco', field: 'banco_id', align: 'left' },
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
        noticias.value = await get('noticias/read.php')
      } catch {
        $q.notify({
          message: 'Não foi possível obter as notícias',
          type: 'warning'
        })
      }
      loading.value = false
    }
    const logobanco = (banco_id) => {
      const logo = bancos.value.find((b) => b.id === banco_id).logo
      return apiPublicUrl(logo)
    }

    return {
      mdiWindowClose,
      mdiPlusBoxOutline,
      mdiPencil,
      loading,
      tableRef,
      mostraEditor,
      noticias,
      noticiaEscolhida,
      noticia,
      bancos,
      colunas,
      pagination,
      onServerRequest,
      onNovo: () => {
        noticia.value = {
          id: 0,
          titulo: '',
          link: '',
          ativo: true,
          descricao: null,
          imagem: null,
          banco_id: 1
        }
        mostraEditor.value = true
      },
      onEdit: (b) => {
        noticia.value = b
        noticiaEscolhida.value = [b]
        mostraEditor.value = true
      },
      onOk: async () => {
        try {
          await postAuth('noticias/update.php', noticia.value)
          tableRef.value.requestServerInteraction()
          mostraEditor.value = false
        } catch {
          $q.notify({ message: 'Não foi possível guardar', type: 'warning' })
        }
      },
      logobanco
    }
  }
})
</script>
