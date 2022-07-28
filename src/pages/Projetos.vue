<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <p>{{ $t('html.index.projects') }}</p>
      </q-card-section>
      <q-card-section>
        <div class="row q-col-gutter-md">
          <q-select
            v-model="banco"
            :options="bancos"
            :label="$t('html.index.bank')"
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
                  <img :src="logobanco(scope.opt.logo)" width="40" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ scope.opt.nome }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-select
            v-model="pais"
            :options="paises"
            :label="$t('html.index.countries')"
            outlined
            dense
            class="col-xs-12 col-md-3"
            option-value="nome"
            option-label="nome"
            emit-value
            map-options
            clearable
          />

          <q-input
            v-model="filtro"
            :label="$t('html.index.freesearch')"
            debounce="500"
            outlined
            dense
            class="col-xs-6"
          />
        </div>
        <p>{{ banco?.descricao ?? '' }}</p>
      </q-card-section>
    </q-card>
    <q-table
      class="q-mt-sm"
      color="positive"
      :title="$t('html.index.projects')"
      ref="tableRef"
      selection="none"
      :no-data-label="$t('html.errors.noData')"
      row-key="id"
      wrap-cells
      :grid="$q.screen.xs"
      :rows="projetos"
      :columns="columns"
      :rows-per-page-options="[5, 10, 15, 20, 50]"
      :loading="loading"
      v-model:pagination="pagination"
      v-model:selected="projetoEscolhido"
      @request="onServerRequest"
    >
      <template v-slot:body-cell-data="props">
        <q-td :props="props">
          {{ props.row.data.substring(0, 10) }}
        </q-td>
      </template>
      <template v-slot:body-cell-referencia="props">
        <q-td :props="props">
          <q-btn
            :label="props.row.referencia"
            @click="abreProjeto(props.row.id)"
            flat
            rounded
            style="min-width: 150px"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-banco_id="props">
        <q-td :props="props" auto-width>
          {{ getBanco(props.row.banco_id) }}
        </q-td>
      </template>
      <template v-slot:body-cell-bancologo="props">
        <q-td :props="props" auto-width>
          <q-avatar rounded>
            <img :src="logobanco(props.row.bancologo)" />
          </q-avatar>
        </q-td>
      </template>

      <template v-slot:no-data="{ message }">
        <div class="full-width row flex-center text-accent">
          <q-icon size="xl" :name="mdiAlertDecagram" class="q-mr-md" />
          <h3>
            {{ message }}
          </h3>
        </div>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { mdiAlertDecagram } from '@quasar/extras/mdi-v6'
import { defineComponent, ref, onMounted, watch } from 'vue'
import { get, post, apiPublicUrl } from 'boot/api'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  setup() {
    const $q = useQuasar()
    const $router = useRouter()
    const { t } = useI18n()

    const tableRef = ref(null)
    const loading = ref(false)

    onMounted(async () => {
      loading.value = true
      try {
        bancos.value = await get('bancos/read.php')
      } catch {
        $q.notify({
          message: t('html.errors.errorLoadBanks'),
          type: 'warning'
        })
      }

      try {
        paises.value = await get('paises/read.php')
      } catch {
        $q.notify({
          message: t('html.errors.errorLoadCountries'),
          type: 'warning'
        })
      }

      tableRef.value.requestServerInteraction()
      loading.value = false
    })

    const bancos = ref([])
    const banco = ref()
    const paises = ref([])
    const pais = ref(null)
    const filtro = ref(null)

    const projetos = ref([])

    const pagination = ref({
      descending: false,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 10,
      sortBy: null
    })

    const projetoEscolhido = ref([])

    watch([banco, pais, filtro], (_current, _previus) => {
      tableRef.value.requestServerInteraction()
    })

    const logobanco = (logo) => {
      return apiPublicUrl(logo)
    }
    const onServerRequest = async (props) => {
      try {
        loading.value = true
        const { page, rowsPerPage, sortBy, descending } = props.pagination
        let banco_id = 0
        if (typeof banco.value !== 'undefined' && banco.value !== null) {
          banco_id = banco.value
        }
        const result = await post('projetos/read.php', {
          page,
          rowsPerPage,
          sortBy,
          descending,
          banco_id: banco_id,
          filter: filtro.value,
          filterProject: null,
          pais: pais.value,
          tipo_id: null,
          accao: 0
        })

        projetos.value = result.rows

        pagination.value.rowsNumber = result.count
        pagination.value.page = page
        pagination.value.rowsPerPage = rowsPerPage
        pagination.value.sortBy = sortBy
        pagination.value.descending = descending
      } catch (e) {
        console.log(e)
        $q.notify({
          message: t('html.errors.errorLoadProjects'),
          type: 'warning'
        })
      }
      loading.value = false
    }
    const getBanco = (id) => {
      return bancos.value.find((p) => p.id === id).codigo
    }
    const abreProjeto = (id) => {
      $router.push({ path: '/registed', query: { id: id } })
    }

    return {
      mdiAlertDecagram,
      tableRef,
      loading,
      pagination,
      bancos,
      banco,
      paises,
      pais,
      filtro,
      projetos,
      projetoEscolhido,
      columns: [
        {
          name: 'referencia',
          label: t('html.projects.reference'),
          field: 'referencia',
          align: 'left'
        },
        { name: 'nome', label: 'Nome', field: 'nome', align: 'left' },
        {
          name: 'data',
          label: t('html.projects.data'),
          field: 'data',
          align: 'left',
          style: 'width: 100px'
        },
        {
          name: 'setor',
          label: t('html.projects.sector'),
          field: 'setor',
          align: 'left'
        },
        {
          name: 'pais',
          label: t('html.projects.country'),
          field: 'pais',
          align: 'left'
        },
        {
          name: 'banco_id',
          label: t('html.projects.bank'),
          field: 'banco_id',
          align: 'center'
        },
        { name: 'bancologo', label: '', field: 'bancologo', align: 'center' }
      ],
      logobanco,
      onServerRequest,
      getBanco,
      abreProjeto
    }
  }
})
</script>

<style lang="sass" scoped>
.my-card-img
  height: 235px

.q-page
  background-color: #a6b3bf !important
</style>
