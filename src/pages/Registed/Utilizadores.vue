<template>
  <q-page padding>
    <q-table class="q-mt-sm" color="positive"
      title="Utilizadores"
      ref="tableRef"
      selection="single"
      no-data-label="Sem dados"
      row-key="id"
      :rows="utilizadores"
      :columns="colunas"
      :rows-per-page-options="[0, 5, 10]"
      :loading="loading"
      :filter="filter"
      v-model:pagination="pagination"
      v-model:selected="utilizadorEscolhido"
      @request="onServerRequest">
      
      <template v-slot:top-right>
        <q-btn label="Novo" color="positive" @click="onNovo" :icon="mdiPlusBoxOutline" class="q-mr-md"/>
        <q-input v-model="filter" outlined dense clearable debounce="500">
          <template v-slot:append>
            <q-icon :name="mdiFilterOutline" />
          </template>
        </q-input>
      </template>

      <template v-slot:body-cell-ativo="props">
        <q-td :props="props" auto-width>
          <q-checkbox v-model="props.row.ativo" disable/>
        </q-td>
      </template>

      <template v-slot:body-cell-perfil_id="props">
        <q-td :props="props">
          {{ displayTipo(props.row) }}
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
          <q-icon :name="mdiAccountHardHat" left size="2rem" />
          <div class="text-h6">{{ utilizador.username }} ({{ utilizador.id }})</div>
          <q-space />
          <q-btn :icon="mdiWindowClose" flat dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-md">
          <div class="row q-col-gutter-sm">
            <q-input v-model="utilizador.username" outlined label="Utilizador" class="col-xs-12 col-md-6">
              <template v-if="utilizador.username" v-slot:append>
                <q-icon :name="mdiCloseCircle" @click.stop="utilizador.username = null" class="cursor-pointer" />
              </template>
            </q-input>
            <q-input v-model="utilizador.password" outlined
                    :type="isPwd ? 'password' : 'text'" label="Password" class="col-xs-12 col-md-6"
                    :rules="[isPasswordValid]" ref="inputPassword">
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? mdiEyeOff : mdiEye"
                  class="cursor-pointer" aria-hidden="true"
                  @click="isPwd = !isPwd"/>
                <q-icon v-if="utilizador.password" :name="mdiCloseCircle" @click.stop="utilizador.password = null" class="cursor-pointer" />
              </template>
            </q-input>
          </div>
          <div class="row q-col-gutter-sm">
            <q-select v-model="utilizador.perfil_id" :options="perfis" option-value="id" option-label="nome" emit-value map-options 
              label="Perfil" outlined class="col-xs-12 col-md-6" />
            <q-select v-model="utilizador.empresa_id" :options="empresas" option-value="id" option-label="nome" emit-value map-options clearable 
              label="Empresa" outlined class="col-xs-12 col-md-6" />
          </div>
          <div class="row">
            <q-checkbox v-model="utilizador.ativo" label="Ativo" />
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
import { mdiAccountHardHat, mdiWindowClose, mdiPlusBoxOutline, mdiPencil, mdiCloseCircle, mdiEye, mdiEyeOff, mdiFilterOutline } from '@quasar/extras/mdi-v6'
import { defineComponent, ref, onMounted } from 'vue'
import { get, postAuth } from 'boot/api'
import { useQuasar } from 'quasar'

export default defineComponent({
  setup () {
    const $q = useQuasar()

    const loading = ref(false)
    const mostraEditor = ref(false)
    const isPwd = ref(true)
    const tableRef = ref(null)

    onMounted(async () => {
      try {
        perfis.value = await get('perfilutilizador/read.php')
      } catch (e) {
        console.log(e)
        $q.notify({ message: 'Não foi possível obter os perfis de utilizador', type: 'warning' })
      }
      try {
        empresas.value = await get('empresas/read-ativo.php')
      } catch {
        $q.notify({ message: 'Não foi possível obter as empresas', type: 'warning' })
      }
      tableRef.value.requestServerInteraction()
    })

    const perfis = ref([])
    const empresas = ref([])
    const utilizadores = ref([])
    const utilizadorEscolhido = ref([])
    const utilizador = ref({ id: 0, username: '', password: '', perfil_id: 1, empresa_id: null, ativo: true })
    const colunas = [
      { name: 'username', label: 'Utilizador', field: 'username', align: 'left' },
      { name: 'perfil_id', label: 'Perfil', field: 'perfil_id', align: 'left' },
      { name: 'empresa', label: 'Empresa', field: 'empresa', align: 'left' },
      { name: 'ativo', label: 'Ativo', field: 'ativo', align: 'left' },
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

    const isPasswordValid = function (val) {
      return !!val || 'Insira a password'
    }
    const onServerRequest = async (props) => {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const filter = props.filter

      loading.value = true
      try {
        const result = await postAuth('utilizadores/read.php', { page, rowsPerPage, sortBy, descending, filter })

        utilizadores.value = result.rows

        pagination.value.rowsNumber = result.count
        pagination.value.page = page
        pagination.value.rowsPerPage = rowsPerPage
        pagination.value.sortBy = sortBy
        pagination.value.descending = descending
      } catch {
        $q.notify({ message: 'Não foi possível obter os utilizadores', type: 'warning' })
      }
      loading.value = false
    }

    return {
      mdiAccountHardHat,
      mdiWindowClose,
      mdiPlusBoxOutline,
      mdiPencil,
      mdiCloseCircle,
      mdiEye,
      mdiEyeOff,
      mdiFilterOutline,
      loading,
      mostraEditor,
      isPwd,
      tableRef,
      perfis,
      empresas,
      utilizadores,
      utilizadorEscolhido,
      utilizador,
      colunas,
      pagination,
      filter,
      isPasswordValid,
      onServerRequest,
      onNovo: () => {
        utilizador.value = { id: 0, username: '', password: '', perfil_id: 1, empresa_id: null, ativo: true }
        mostraEditor.value = true
      },
      onEdit: (p) => {
        p.password = null
        utilizador.value = p
        utilizadorEscolhido.value = [p]
        mostraEditor.value = true
      },
      onOk: async () => {
        try {
          if (utilizador.value.id > 0) {
            await postAuth('utilizadores/update.php', utilizador.value)
          } else {
            await postAuth('utilizadores/create.php', utilizador.value)
          }
          tableRef.value.requestServerInteraction()
          mostraEditor.value = false
        } catch (error) {
          $q.notify({ message: 'Não foi possível guardar', type: 'warning' })
        }
      },
      displayTipo: (t) => {
        if (t.perfil_id === null || perfis.value === null || perfis.value.length === 0) {
          return ''
        }
        const perfil = perfis.value.find(p => p.id === t.perfil_id)

        return perfil !== null ? perfil.nome : ''
      }
    }
  }
  
})
</script>
