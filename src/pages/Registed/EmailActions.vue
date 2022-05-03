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
            clearable
            class="col-xs-12 col-md-3"
          />

          <q-input
            v-model="filtro"
            label="Pesquisa livre"
            debounce="500"
            outlined
            dense
            clearable
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
          clearable
          toggle-color="grey-8"
          :options="accoes"
        >
          <template v-slot:one>
            <div class="row items-center">
              <div class="col-12 text-center">Com interesse</div>
              <div style="height: 4px" class="col-12 bg-accent"></div>
            </div>
          </template>
          <template v-slot:two>
            <div class="row items-center">
              <div class="col-12 text-center">Sem interesse</div>
              <div style="height: 4px" class="col-12 bg-primary"></div>
            </div>
          </template>
          <template v-slot:three>
            <div class="row items-center">
              <div class="col-12 text-center">Precisa apoio</div>
              <div style="height: 4px" class="col-12 bg-warning"></div>
            </div>
          </template>
          <template v-slot:four>
            <div class="row items-center">
              <div class="col-12 text-center">Não respondeu</div>
              <div style="height: 4px" class="col-12 bg-blue-grey-2"></div>
            </div>
          </template>
          <template v-slot:five>
            <div class="row items-center">
              <div class="col-12 text-center">Abriu link</div>
              <div style="height: 4px" class="col-12 bg-info"></div>
            </div>
          </template>
        </q-btn-toggle>
      </template>
      <template v-slot:body-cell-referencia="props">
        <q-td :props="props">
          <q-btn
            :label="props.row.referencia"
            @click="filtraReferenciaProjeto(props.row.referencia)"
            flat
          />
        </q-td>
      </template>
      <template v-slot:body-cell-abriu_link_banco="props">
        <q-td :props="props">
          <q-checkbox
            v-model="props.row.abriu_link_banco"
            color="info"
            disable
          />
        </q-td>
      </template>
      <template v-slot:body-cell-accao="props">
        <q-td :props="props" auto-width>
          <q-btn
            round
            :color="corAccao(props.row.accao)"
            @click="filtraAccao(props.row.accao)"
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, watch } from 'vue'
import { useQuasar } from 'quasar'
import { get, post } from 'boot/api'
import { accoes, corAccao } from 'src/models/accoes-projetos'

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

    const actionFilter = ref(0)

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

    const filtraReferenciaProjeto = (referencia) => {
      if (filtroProjeto.value === null) filtroProjeto.value = referencia
      else filtroProjeto.value = null
    }
    const filtraAccao = (accao) => {
      if (actionFilter.value === null || actionFilter.value === 0)
        actionFilter.value = accao
      else actionFilter.value = null
    }

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

    return {
      tableActionsRef,
      pagination,
      accoes,
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
          name: 'abriu_link_banco',
          label: 'Abriu link',
          field: 'abriu_link_banco',
          align: 'center'
        },
        {
          name: 'emails_enviados',
          label: 'Emails enviados',
          field: 'emails_enviados',
          align: 'right'
        }
      ],
      corAccao,
      onServerRequest,
      filtraReferenciaProjeto,
      filtraAccao
    }
  }
})
</script>
