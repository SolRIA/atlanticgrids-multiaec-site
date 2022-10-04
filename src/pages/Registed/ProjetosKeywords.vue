<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <BancoSelector :bancos="bancos" :banco="banco" @banco_updated="bancoAlterado" />
      </q-card-section>
    </q-card>
    <q-table class="q-mt-sm" color="positive" title="Keywords" ref="tableRef" selection="none" no-data-label="Sem dados" row-key="id" wrap_cells :rows="keywords" :columns="colunas" :rows-per-page-options="[0, 5, 10]" :loading="loading" v-model:pagination="pagination" @request="onServerRequest">
      <template v-slot:top-right>
        <q-btn label="Novo" @click="onNew" :icon="mdiPlusBoxOutline" color="positive" />
      </template>

      <template v-slot:body-cell-tipo_projeto_id="props">
        <q-td :props="props" auto-width>
          {{ getTipoProjeto(props.row.tipo_projeto_id) }}
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props" auto-width>
          <q-btn flat dense :icon="mdiDotsVertical" color="positive">
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup @click="onEdit(props.row)">
                  <q-item-section avatar>
                    <q-icon :name="mdiPencil" />
                  </q-item-section>
                  <q-item-section>Editar</q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="onDelete(props.row)">
                  <q-item-section avatar>
                    <q-icon :name="mdiDelete" color="primary" />
                  </q-item-section>
                  <q-item-section>Apagar</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
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
            <BancoSelector :bancos="bancos" :banco="rowEdit.banco_id" class="col-xs-12 col-md-6" />

            <q-select v-model="rowEdit.tipo_projeto_id" :options="tiposProjetos" label="Tipos de projetos" option-label="nome" option-value="id" @filter="filterFn" use-input emit-value map-options outlined dense class="col-xs-12 col-md-6" />

            <q-input v-model="rowEdit.keywords" label="Keywords" type="textarea" hint="As keywords devem ser separadas por ;" outlined class="col-xs-12" @banco_updated="bancoAlteradoKeyword" />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Cancelar" flat v-close-popup />
          <q-btn label="Guardar" color="primary" @click="onSave" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mdiPencil, mdiDelete, mdiDotsVertical, mdiWindowClose, mdiPlusBoxOutline } from '@quasar/extras/mdi-v6'
import { defineComponent, ref, onMounted } from 'vue'
import { get, postAuth, getAuth } from 'boot/api'
import { useQuasar } from 'quasar'
import BancoSelector from 'src/components/BancoSelector.vue'

export default defineComponent({
  components: { BancoSelector },
  setup() {
    const $q = useQuasar()

    const tableRef = ref(null)
    const loading = ref(false)
    const pagination = ref({
      descending: false,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 10,
      sortBy: null
    })
    onMounted(async () => {
      const tipos = await get('tiposprojeto/read-ativo.php')
      bancos.value = await get('bancos/read-ativo.php')

      tiposProjetosAll = Object.freeze(tipos.filter((t) => t.filtro))
      tiposProjetos.value = tiposProjetosAll

      banco.value = bancos.value[0]
    })

    const keywords = ref([])
    const rowEdit = ref({})
    let tiposProjetosAll = []
    const tiposProjetos = ref([])
    const bancos = ref([])
    const banco = ref({ id: 0, nome: '' })
    const mostraEditor = ref(false)

    const onServerRequest = async (_props) => {
      if (banco.value === undefined) return

      loading.value = true
      try {
        keywords.value = await getAuth('tiposprojeto/read-keywords.php?banco_id=' + banco.value.id)
      } catch (error) {
        console.error(error)
        $q.notify({
          message: 'Não foi possível obter os tipos de projeto',
          type: 'warning'
        })
      }
      loading.value = false
    }
    const getTipoProjeto = (id) => {
      const tipo = tiposProjetosAll.find((t) => t.id === id)
      if (tipo !== undefined && tipo !== null) {
        return tipo.nome.substring(0, tipo.nome.indexOf(' - '))
      }

      return ''
    }
    const bancoAlterado = (b) => {
      if (b.id !== undefined) banco.value = bancos.value.find((c) => c.id === b.id)
      else banco.value = bancos.value.find((c) => c.id === b)
      tableRef.value.requestServerInteraction()
    }
    const bancoAlteradoKeyword = (b) => {
      rowEdit.value.banco_id = b
    }
    const onEdit = (row) => {
      rowEdit.value = row
      mostraEditor.value = true
    }
    const onNew = () => {
      rowEdit.value = {
        id: 0,
        banco_id: banco.value.id,
        tipo_projeto_id: tiposProjetos.value.filter((c) => c.pai_id > 0)[0],
        keywords: null
      }
      mostraEditor.value = true
    }
    const onSave = async () => {
      mostraEditor.value = false
      rowEdit.value.banco_id = banco.value.id

      await postAuth('tiposprojeto/update-keywords.php', rowEdit.value)
      tableRef.value.requestServerInteraction()
    }
    const onDelete = (row) => {
      $q.dialog({
        title: 'Apagar',
        message: `Quer apagar o registo para ${getTipoProjeto(row.tipo_projeto_id)}?`,
        cancel: true,
        persistent: true
      }).onOk(async () => {
        await postAuth('tiposprojeto/delete-keywords.php', { id: row.id })
        tableRef.value.requestServerInteraction()
      })
    }
    const filterFn = (val, update) => {
      update(() => {
        if (val === '') {
          tiposProjetos.value = tiposProjetosAll
        } else {
          const needle = val.toLowerCase()
          tiposProjetos.value = tiposProjetosAll.filter((v) => v.nome.toLowerCase().indexOf(needle) > -1)
        }
      })
    }

    return {
      mdiPencil,
      mdiDelete,
      mdiDotsVertical,
      mdiWindowClose,
      mdiPlusBoxOutline,
      tableRef,
      loading,
      pagination,
      keywords,
      tiposProjetos,
      mostraEditor,
      bancos,
      banco,
      rowEdit,
      colunas: [
        { name: 'actions', label: '', field: 'actions' },
        {
          name: 'tipo_projeto_id',
          label: 'Tipo projeto',
          field: 'tipo_projeto_id',
          align: 'left'
        },
        {
          name: 'keywords',
          label: 'Keywords',
          field: 'keywords',
          align: 'left'
        }
      ],
      onServerRequest,
      getTipoProjeto,
      bancoAlterado,
      bancoAlteradoKeyword,
      onNew,
      onEdit,
      onSave,
      onDelete,
      filterFn
    }
  }
})
</script>
