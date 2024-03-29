<template>
  <q-page padding>
    <div class="q-pa-lg flex flex-center">
      <q-btn-toggle v-model="banco" push rounded :options="bancos" />
    </div>

    <q-table
      class="q-mt-sm"
      color="positive"
      title="Estudos"
      ref="tableEstudosRef"
      selection="single"
      no-data-label="Sem dados"
      row-key="id"
      :rows="estudos"
      :columns="colunasEstudos"
      :rows-per-page-options="[0, 5, 10]"
      :loading="loading"
      v-model:pagination="paginationEstudos"
      v-model:selected="estudoEscolhido"
      @request="onServerRequestEstudos"
    >
      <template v-slot:top-right>
        <q-space />
        <q-btn
          label="Novo"
          color="positive"
          @click="onNovoEstudo"
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
            @click="onEditEstudo(props.row)"
          />
        </q-td>
      </template>
    </q-table>

    <q-table
      class="q-mt-sm"
      color="positive"
      title="Videos"
      ref="tableVideosRef"
      selection="single"
      no-data-label="Sem dados"
      row-key="id"
      :rows="videos"
      :columns="colunasVideos"
      :rows-per-page-options="[0, 5, 10]"
      :loading="loading"
      v-model:pagination="paginationVideos"
      v-model:selected="videoEscolhido"
      @request="onServerRequestVideos"
    >
      <template v-slot:top-right>
        <q-space />
        <q-btn
          label="Novo"
          color="positive"
          @click="onNovoVideo"
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
            @click="onEditVideo(props.row)"
          />
        </q-td>
      </template>
    </q-table>

    <q-dialog persistent v-model="mostraEditorEstudo">
      <q-card style="min-width: 60vw">
        <q-card-section class="row items-center q-pb-md bg-primary text-white">
          <q-space />
          <q-btn :icon="mdiWindowClose" flat dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-md">
          <div class="row q-col-gutter-sm">
            <q-input
              v-model="estudo.titulo"
              label="Título"
              outlined
              class="col-xs-6"
            />
            <q-select
              label="Banco"
              outlined
              v-model="estudo.banco_id"
              :options="bancos"
              class="col-xs-6"
              emit-value
              map-options
            />
            <q-input
              v-model="estudo.link"
              label="Link"
              outlined
              class="col-xs-6"
            />
            <q-input
              v-model="estudo.imagem"
              label="Link imagem"
              outlined
              class="col-xs-6"
            />
            <q-input
              v-model="estudo.descricao"
              label="Descrição"
              type="textarea"
              outlined
              class="col-xs-12"
            />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Cancelar" flat v-close-popup />
          <q-btn label="Guardar" color="primary" @click="onGuardaEstudo" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog persistent v-model="mostraEditorVideo">
      <q-card style="min-width: 60vw">
        <q-card-section class="row items-center q-pb-md bg-primary text-white">
          <q-space />
          <q-btn :icon="mdiWindowClose" flat dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-md">
          <div class="row q-col-gutter-sm">
            <q-input
              v-model="video.nome"
              label="Nome"
              outlined
              class="col-xs-12"
            />

            <q-input
              v-model="video.url"
              label="Link"
              outlined
              class="col-xs-12"
            />

            <q-select
              label="Banco"
              outlined
              v-model="video.banco_id"
              :options="bancos"
              class="col-xs-12"
              emit-value
              map-options
            />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Cancelar" flat v-close-popup />
          <q-btn label="Guardar" color="primary" @click="onGuardaVideo" />
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
import { defineComponent, ref, onMounted, watch } from 'vue'
import { get, post, postAuth } from 'boot/api'
import { useQuasar } from 'quasar'

export default defineComponent({
  setup() {
    const $q = useQuasar()

    const loading = ref(false)
    const mostraEditorEstudo = ref(false)
    const mostraEditorVideo = ref(false)
    const tableEstudosRef = ref(null)
    const tableVideosRef = ref(null)

    onMounted(async () => {
      try {
        const banks = await get('bancos/read-ativo.php')
        bancos.value = banks.map(function (b) {
          return { label: b.nome, value: b.id }
        })
        banco.value = bancos.value[0].value
      } catch {
        $q.notify({
          message: 'Não foi possível obter os bancos',
          type: 'warning'
        })
      }
    })

    const bancos = ref([])
    const banco = ref({})
    const estudos = ref([])
    const videos = ref([])
    const estudoEscolhido = ref([])
    const videoEscolhido = ref([])
    const estudo = ref({
      id: 0,
      titulo: '',
      link: '',
      ativo: true,
      descricao: null,
      imagem: null
    })
    const video = ref({
      id: 0,
      titulo: '',
      link: '',
      ativo: true,
      descricao: null,
      imagem: null
    })
    const colunasEstudos = [
      { name: 'titulo', label: 'titulo', field: 'titulo', align: 'left' },
      {
        name: 'created_at',
        label: 'Criado',
        field: 'created_at',
        align: 'left'
      },
      { name: 'actions', label: '', field: 'actions' }
    ]
    const colunasVideos = [
      { name: 'nome', label: 'Nome', field: 'nome', align: 'left' },
      { name: 'url', label: 'Endereço', field: 'url', align: 'left' },
      {
        name: 'created_at',
        label: 'Criado',
        field: 'created_at',
        align: 'left'
      },
      { name: 'actions', label: '', field: 'actions' }
    ]

    const paginationEstudos = ref({
      descending: false,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 10
    })
    const paginationVideos = ref({
      descending: false,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 10
    })

    watch(banco, (_current, _old) => {
      tableEstudosRef.value.requestServerInteraction()
      tableVideosRef.value.requestServerInteraction()
    })

    const onServerRequestEstudos = async (props) => {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const filter = props.filter
      loading.value = true
      try {
        const result = await post('tutoriais/read-estudos.php', {
          page,
          rowsPerPage,
          sortBy,
          descending,
          filter,
          banco_id: banco.value
        })

        estudos.value = result.rows

        paginationEstudos.value.rowsNumber = result.total
        paginationEstudos.value.page = page
        paginationEstudos.value.rowsPerPage = rowsPerPage
        paginationEstudos.value.sortBy = sortBy
        paginationEstudos.value.descending = descending
      } catch {
        $q.notify({
          message: 'Não foi possível obter os estudos',
          type: 'warning'
        })
      }
      loading.value = false
    }
    const onServerRequestVideos = async (props) => {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const filter = props.filter
      loading.value = true
      try {
        const result = await post('tutoriais/read-videos.php', {
          page,
          rowsPerPage,
          sortBy,
          descending,
          filter,
          banco_id: banco.value
        })

        videos.value = result.rows

        paginationVideos.value.rowsNumber = result.total
        paginationVideos.value.page = page
        paginationVideos.value.rowsPerPage = rowsPerPage
        paginationVideos.value.sortBy = sortBy
        paginationVideos.value.descending = descending
      } catch {
        $q.notify({
          message: 'Não foi possível obter os videos',
          type: 'warning'
        })
      }
      loading.value = false
    }

    return {
      mdiWindowClose,
      mdiPlusBoxOutline,
      mdiPencil,
      loading,
      tableEstudosRef,
      tableVideosRef,
      mostraEditorEstudo,
      mostraEditorVideo,
      bancos,
      banco,
      estudos,
      videos,
      estudoEscolhido,
      videoEscolhido,
      estudo,
      video,
      colunasEstudos,
      colunasVideos,
      paginationEstudos,
      paginationVideos,
      onServerRequestEstudos,
      onServerRequestVideos,
      onNovoEstudo: () => {
        estudo.value = {
          id: 0,
          titulo: '',
          link: '',
          descricao: null,
          imagem: null,
          banco_id: null
        }
        mostraEditorEstudo.value = true
      },
      onEditEstudo: (b) => {
        estudo.value = b
        estudoEscolhido.value = [b]
        mostraEditorEstudo.value = true
      },
      onGuardaEstudo: async () => {
        try {
          await postAuth('tutoriais/update-estudos.php', estudo.value)
          tableEstudosRef.value.requestServerInteraction()
          mostraEditorEstudo.value = false
        } catch {
          $q.notify({ message: 'Não foi possível guardar', type: 'warning' })
        }
      },
      onNovoVideo: () => {
        video.value = {
          id: 0,
          url: '',
          nome: '',
          banco_id: null
        }
        mostraEditorVideo.value = true
      },
      onEditVideo: (b) => {
        video.value = b
        videoEscolhido.value = [b]
        mostraEditorVideo.value = true
      },
      onGuardaVideo: async () => {
        try {
          await postAuth('tutoriais/update-videos.php', video.value)
          tableVideosRef.value.requestServerInteraction()
          mostraEditorVideo.value = false
        } catch {
          $q.notify({ message: 'Não foi possível guardar', type: 'warning' })
        }
      }
    }
  }
})
</script>
