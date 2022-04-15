<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="row q-col-gutter-md">
          <q-select
            v-model="tipo"
            :options="tipos"
            label="Tipos de projetos"
            option-label="nome"
            option-value="id"
            class="col-xs-12 col-md-3"
            multiple
            emit-value
            map-options
            outlined
            clearable
            dense
          >
            <template
              v-slot:option="{ itemProps, opt, selected, toggleOption }"
            >
              <q-item v-bind="itemProps">
                <q-item-section>
                  <q-item-label>{{ opt.nome }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-checkbox
                    :model-value="selected"
                    @update:model-value="toggleOption(opt)"
                  />
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-select
            v-model="banco"
            :options="bancos"
            label="Banco"
            outlined
            dense
            class="col-xs-12 col-md-3"
            option-value="id"
            option-label="nome"
            emit-value
            map-options
            clearable
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section avatar>
                  <img :src="logobanco(scope.opt.logo)" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ scope.opt.nome }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-input
            v-model="filtroProjeto"
            label="Projeto"
            debounce="500"
            outlined
            dense
            class="col-xs-12 col-md-3"
          />

          <q-input
            v-model="filtro"
            label="Pesquisa livre"
            debounce="500"
            outlined
            dense
            class="col-xs-12 col-md-3"
          />
        </div>
      </q-card-section>
    </q-card>

    <q-table
      class="q-mt-sm"
      color="positive"
      title="Emails enviados"
      ref="tableActionsRef"
      selection="none"
      flat
      bordered
      no-data-label="Não existem dados"
      no-results-label="A pesquisa efetuada não devolveu qualquer resultado"
      row-key="id"
      wrap-cells
      :rows="emailsEnviados"
      :columns="columnsSentEmails"
      :rows-per-page-options="[5, 10, 15, 20, 50]"
      :loading="loading"
      v-model:pagination="pagination"
      @request="onServerRequest"
    >
      <template v-slot:top-right>
        <q-btn-toggle
          v-model="actionFilter"
          no-caps
          rounded
          toggle-color="positive"
          :options="[
            { label: 'Com interesse', value: 1 },
            { label: 'Sem interesse', value: 2 },
            { label: 'Precisa apoio', value: 3 },
            { label: 'Não respondeu', value: 4 }
          ]"
        />
      </template>
      <template v-slot:body-cell-accao="props">
        <q-td :props="props" auto-width>
          <q-chip color="positive" text-color="white">
            {{ getActionName(props.row.accao) }}
          </q-chip>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, watch } from 'vue'
import { useQuasar } from 'quasar'
import { get, post } from 'boot/api'

export default defineComponent({
  setup() {
    const $q = useQuasar()
    const tableActionsRef = ref(null)

    onMounted(async () => {
      try {
        tipos.value = await get('tiposprojeto/read-ativo.php')
      } catch {
        $q.notify({
          message: 'Não foi possível obter os tipos de projeto',
          type: 'warning'
        })
      }

      try {
        bancos.value = await get('bancos/read-ativo.php')
      } catch {
        $q.notify({
          message: 'Não foi possível obter os bancos',
          type: 'warning'
        })
      }

      tableActionsRef.value.requestServerInteraction()
    })

    const pagination = ref({
      descending: false,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 10,
      sortBy: null
    })
    const emailsEnviados = ref([])
    const loading = ref(false)

    const bancos = ref([])
    const banco = ref(null)

    const tipos = ref([])
    const tipo = ref(null)

    const filtroProjeto = ref(null)
    const filtro = ref(null)

    const actionFilter = ref(1)

    watch(actionFilter, (_current, _old) => {
      tableActionsRef.value.requestServerInteraction()
    })
    watch(banco, (_current, _old) => {
      tableActionsRef.value.requestServerInteraction()
    })
    watch(tipo, (_current, _old) => {
      tableActionsRef.value.requestServerInteraction()
    })
    watch(filtroProjeto, (_current, _old) => {
      tableActionsRef.value.requestServerInteraction()
    })
    watch(filtro, (_current, _old) => {
      tableActionsRef.value.requestServerInteraction()
    })

    const onServerRequest = async (props) => {
      try {
        loading.value = true
        const { page, rowsPerPage, sortBy, descending } = props.pagination

        const result = await post('projetos/read-sent-emails.php', {
          page,
          rowsPerPage,
          sortBy,
          descending,
          accao: actionFilter.value,
          filterProject: filtroProjeto.value,
          filter: filtro.value,
          banco_id: banco.value,
          tipo_id: tipo.value
        })

        emailsEnviados.value = result.rows

        pagination.value.rowsNumber = result.count
        pagination.value.page = page
        pagination.value.rowsPerPage = rowsPerPage
        pagination.value.sortBy = sortBy
        pagination.value.descending = descending
      } catch (e) {
        $q.notify({
          message: 'Não foi possível obter os projetos',
          type: 'warning'
        })
      }
      loading.value = false
    }
    const getActionName = (id) => {
      switch (id) {
        case 1:
          return 'Com interesse'
        case 2:
          return 'Sem interesse'
        case 3:
          return 'Precisa apoio'
        default:
          return 'Não respondeu'
      }
    }

    return {
      tableActionsRef,
      pagination,
      bancos,
      banco,
      tipos,
      tipo,
      filtroProjeto,
      filtro,
      actionFilter,
      emailsEnviados,
      loading,
      columnsSentEmails: [
        { name: 'nome', label: 'Empresa', field: 'nome', align: 'left' },
        {
          name: 'referencia',
          label: 'Projeto',
          field: 'referencia',
          align: 'left'
        },
        { name: 'accao', label: 'Açcão', field: 'accao', align: 'center' },
        {
          name: 'emails_enviados',
          label: 'Emails enviados',
          field: 'emails_enviados',
          align: 'right'
        }
      ],
      onServerRequest,
      getActionName
    }
  }
})
</script>
