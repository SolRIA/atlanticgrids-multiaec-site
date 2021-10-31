<template>
  <q-page padding>
    <q-table class="q-mt-sm" color="positive"
      title="Empresas"
      ref="tableRef"
      selection="single"
      no-data-label="Sem dados"
      row-key="id"
      :rows="empresas"
      :columns="colunas"
      :rows-per-page-options="[0, 5, 10]"
      :loading="loading"
      v-model:pagination="pagination"
      v-model:selected="empresaEscolhida"
      @request="onServerRequest">
      
      <template v-slot:top-right>
        <q-btn label="Novo" color="positive" @click="onNovo" :icon="mdiPlusBoxOutline" class="q-mr-md"/>
      </template>

      <template v-slot:body-cell-ativo="props">
        <q-td :props="props" auto-width>
          <q-checkbox v-model="props.row.ativo" disable/>
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props" auto-width>
          <q-btn dense flat color="positive" icon="edit" @click="onEdit(props.row)"/>
        </q-td>
      </template>
    </q-table>

    <q-dialog persistent v-model="mostraEditor">
      <q-card style="min-width: 60vw;">
        <q-card-section class="row items-center q-pb-md bg-primary text-white">
          <q-icon :name="mdiAccountGroup" left size="2rem" />
          <div class="text-h6">{{ empresa.nome }} ({{ empresa.id }})</div>
          <q-space />
          <q-btn :icon="mdiWindowClose" flat dense v-close-popup />
        </q-card-section>

       <q-card-section>
      <div class="row q-col-gutter-sm">
        <q-input v-model="empresa.nome" outlined label="Nome" class="col-xs-12 col-md-9"/>
        <q-select v-model="empresa.tipo_id" :options="tipos" label="Àrea de especialização" outlined option-label="nome" option-value="id" map-options emit-value class="col-xs-12 col-md-3"/>
        <q-input v-model="empresa.web" outlined label="Web" class="col-xs-12 col-md-3">
          <template v-slot:append>
            <q-icon :name="mdiWeb" color="primary"/>
          </template>
        </q-input>
        <q-input v-model="empresa.facebook" outlined label="Facebook" class="col-xs-12 col-md-3">
        <template v-slot:append>
            <q-icon :name="mdiFacebook" color="primary"/>
          </template>
        </q-input>
        <q-input v-model="empresa.twitter" outlined label="Twitter" class="col-xs-12 col-md-3">
          <template v-slot:append>
            <q-icon :name="mdiTwitter" color="primary"/>
          </template>
        </q-input>
        <q-input v-model="empresa.linkedin" outlined label="LinkedIn" class="col-xs-12 col-md-3">
          <template v-slot:append>
            <q-icon :name="mdiLinkedin" color="primary"/>
          </template>
        </q-input>
      </div>
    </q-card-section>

    <q-card-section>
      <div class="row q-col-gutter-sm">
        <div class="col-xs-12 col-md-9">
          <q-editor v-model="empresa.descricao" />
        </div>

        <div class="col-xs-12 col-md-3">
          <q-uploader url="http://localhost" label="Logotipo" flat bordered />
        </div>
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
import { mdiAccountTie, mdiWindowClose, mdiPlusBoxOutline, mdiAccountGroup, mdiWeb, mdiFacebook, mdiTwitter, mdiLinkedin } from '@quasar/extras/mdi-v6'
import { defineComponent, ref, onMounted } from 'vue'
import { get } from 'boot/api'
import { useQuasar } from 'quasar'

export default defineComponent({
  setup () {
    const $q = useQuasar()

    const loading = ref(false)
    const mostraEditor = ref(false)
    const tableRef = ref(null)

    onMounted(async () => {
      try {
        tipos.value = await get('tiposempresa/read-ativo.php')
      } catch {
        $q.notify({ message: 'Não foi possível obter os tipos de empresa', type: 'warning' })
      }
      tableRef.value.requestServerInteraction()
    })

    const tipos = ref([])
    const empresas = ref([])
    const empresaEscolhida = ref([])
    const empresa = ref({ id: 0, email: '', password: '', nome: '', ativo: true, tipo_id: 1, descricao: null, web: null, facebook: null, twitter: null, linkedin: null, logo: null })
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
        empresas.value = await get('empresas/read.php')
      } catch {
        $q.notify({ message: 'Não foi possível obter as empresas', type: 'warning' })
      }
      loading.value = false
    }

    return {
      mdiAccountTie,
      mdiWindowClose,
      mdiPlusBoxOutline,
      mdiAccountGroup,
      mdiWeb,
      mdiFacebook,
      mdiTwitter,
      mdiLinkedin,
      tableRef,
      loading,
      mostraEditor,
      tipos,
      empresas,
      empresaEscolhida,
      empresa,
      colunas,
      pagination,
      onServerRequest,
      onNovo: () => {
        empresa.value = { id: 0, email: '', password: '', nome: '', ativo: true, tipo_id: 1, descricao: null, web: null, facebook: null, twitter: null, linkedin: null, logo: null }
        mostraEditor.value = true
      },
      onEdit: (b) => {
        empresa.value = b
        mostraEditor.value = true
      },
      onOk: async () => {
        try {
          await postAuth('empresas/update.php', banco)
        } catch {
          $q.notify({ message: 'Não foi possível guardar', type: 'warning' })
        }
      }
    }
  }
  
})
</script>
