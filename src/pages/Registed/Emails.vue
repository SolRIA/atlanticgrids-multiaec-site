<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <q-input
          v-model="email_config.endereco"
          label="Endereço email"
          type="email"
          hint="Indique o endereço de email que irá receber as notificações criadas, como registo de novos utilizadores e resumos de interações com os projetos"
          outlined
          class="col-xs-12"
        >
          <template v-slot:prepend>
            <q-icon :name="mdiEmail" color="positive" />
          </template>
          <template v-slot:append>
            <q-btn
              :icon="mdiCheckboxMarkedOutline"
              @click="onGuardaConfig"
              flat
              color="primary"
            />
          </template>
        </q-input>
      </q-card-section>
    </q-card>

    <q-table
      class="q-mt-sm"
      color="positive"
      title="Templates Email"
      ref="tableRef"
      selection="single"
      no-data-label="Sem dados"
      row-key="id"
      :rows="emails"
      :columns="colunas"
      :rows-per-page-options="[0, 5, 10]"
      :loading="loading"
      :filter="filter"
      v-model:pagination="pagination"
      v-model:selected="emailEscolhido"
      @request="onServerRequest"
    >
      <template v-slot:top-right>
        <q-input v-model="filter" outlined dense clearable debounce="500">
          <template v-slot:append>
            <q-icon :name="mdiFilterOutline" />
          </template>
        </q-input>
      </template>

      <template v-slot:body-cell-ativo="props">
        <q-td :props="props" auto-width>
          <q-checkbox v-model="props.row.ativo" disable />
        </q-td>
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
    </q-table>

    <q-dialog persistent v-model="mostraEditor">
      <q-card style="min-width: 60vw">
        <q-card-section class="row items-center q-pb-md bg-primary text-white">
          <q-icon :name="mdiEmail" left size="2rem" />
          <div class="text-h6">{{ email.nome }}</div>
          <q-space />
          <q-btn :icon="mdiWindowClose" flat dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-md">
          <div class="row q-col-gutter-sm">
            <q-input
              v-model="email.nome"
              label="Nome"
              outlined
              readonly
              class="col-xs-12"
            />
            <q-input
              v-model="email.assunto"
              label="Assunto"
              outlined
              class="col-xs-12"
            />
          </div>
        </q-card-section>

        <!-- <q-card-section>
          <q-input v-model="email.mensagem" type="textarea" />
        </q-card-section> -->

        <q-card-actions align="right">
          <q-btn label="Cancelar" flat v-close-popup />
          <q-btn label="Guardar" color="primary" @click="onOk" />
        </q-card-actions>

        <q-inner-loading :showing="loading">
          <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import {
  mdiEmail,
  mdiWindowClose,
  mdiPencil,
  mdiCheckboxMarkedOutline,
  mdiFilterOutline
} from '@quasar/extras/mdi-v6'
import { defineComponent, ref, onMounted } from 'vue'
import { getAuth, postAuth } from 'boot/api'
import { useQuasar } from 'quasar'

export default defineComponent({
  setup() {
    const $q = useQuasar()

    const loading = ref(false)
    const mostraEditor = ref(false)
    const tableRef = ref(null)

    onMounted(async () => {
      try {
        email_config.value = await getAuth('emails/read-config.php')
      } catch {
        $q.notify({
          message: 'Não foi possível obter a configuração dos emails',
          type: 'warning'
        })
      }
      tableRef.value.requestServerInteraction()
    })

    const email_config = ref({ id: 0, endereco: null })
    const emails = ref([])
    const emailEscolhido = ref([])
    const email = ref({ id: 0, nome: '', assunto: null, mensagem: null })
    const colunas = [
      { name: 'nome', label: 'Nome', field: 'nome', align: 'left' },
      { name: 'assunto', label: 'Assunto', field: 'assunto', align: 'left' },
      { name: 'actions', label: '', field: 'actions' }
    ]

    const pagination = ref({
      descending: false,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 10,
      sortBy: null
    })
    const filter = ref(null)
    const onServerRequest = async (props) => {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const filter = props.filter

      loading.value = true
      try {
        const result = await postAuth('emails/read.php', {
          page,
          rowsPerPage,
          sortBy,
          descending,
          filter
        })

        emails.value = result.rows

        pagination.value.rowsNumber = result.count
        pagination.value.page = page
        pagination.value.rowsPerPage = rowsPerPage
        pagination.value.sortBy = sortBy
        pagination.value.descending = descending
      } catch {
        $q.notify({
          message: 'Não foi possível obter os emails',
          type: 'warning'
        })
      }
      loading.value = false
    }
    const onEdit = async (e) => {
      try {
        email.value = await getAuth('emails/read-single.php?id=' + e.id)
        emailEscolhido.value = [email.value]
        mostraEditor.value = true
        tableRef.value.requestServerInteraction()
      } catch {
        $q.notify({
          message: 'Não foi possível obter o email',
          type: 'warning'
        })
      }
    }
    const onOk = async () => {
      try {
        await postAuth('emails/update.php', email.value)
        mostraEditor.value = false
      } catch {
        $q.notify({ message: 'Não foi possível guardar', type: 'warning' })
      }
    }
    const onGuardaConfig = async () => {
      try {
        await postAuth('emails/update-config.php', email_config.value)
        $q.notify({
          message: 'As alterações foram guardadas com sucesso',
          type: 'positive'
        })
      } catch {
        $q.notify({ message: 'Não foi possível guardar', type: 'warning' })
      }
    }

    return {
      mdiEmail,
      mdiPencil,
      mdiWindowClose,
      mdiCheckboxMarkedOutline,
      mdiFilterOutline,
      loading,
      mostraEditor,
      tableRef,
      filter,
      pagination,
      email_config,
      emails,
      emailEscolhido,
      email,
      colunas,
      onServerRequest,
      onEdit,
      onOk,
      onGuardaConfig
    }
  }
})
</script>
