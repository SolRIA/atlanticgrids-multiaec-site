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
      v-model:pagination="pagination"
      v-model:selected="utilizadorEscolhido"
      @request="onServerRequest">
      
      <template v-slot:top-right>
        <q-space/>
        <q-btn label="Novo" color="positive" @click="onNovo" :icon="mdiPlusBoxOutline" class="q-mr-md"/>
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
            <q-select v-model="utilizador.tipo_id" :options="perfis" option-value="id" option-label="nome" emit-value map-options 
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
import { mdiAccountHardHat, mdiWindowClose, mdiPlusBoxOutline, mdiPencil, mdiCloseCircle, mdiEye, mdiEyeOff } from '@quasar/extras/mdi-v6'
import { defineComponent, ref, onMounted } from 'vue'
import { get, getAuth, postAuth } from 'boot/api'
import { useQuasar } from 'quasar'

export default defineComponent({
  setup () {
    const $q = useQuasar()

    const loading = ref(false)
    const mostraEditor = ref(false)
    const isPwd = ref(false)
    const tableRef = ref(null)

    onMounted(async () => {
        tableRef.value.requestServerInteraction()
        try {
          perfis.value = await getAuth('perfilutilizador/read.php')
        } catch {
            $q.notify({ message: 'Não foi possível obter os perfis de utilizador', type: 'warning' })
        }
        try {
          empresas.value = await get('empresas/read-ativo.php')
        } catch {
            $q.notify({ message: 'Não foi possível obter as empresas', type: 'warning' })
        }
    })

    const perfis = ref([])
    const empresas = ref([])
    const utilizadores = ref([])
    const utilizadorEscolhido = ref([])
    const utilizador = ref({ id: 0, username: '', password: '', tipo_id: 1, empresa_id: null, ativo: true })
    const colunas = [
      { name: 'username', label: 'Utilizador', field: 'username', align: 'left' },
      { name: 'empresa', label: 'Empresa', field: 'empresa', align: 'left' },
      { name: 'ativo', label: 'Ativo', field: 'ativo', align: 'left' },
      { name: 'actions', label: '', field: 'actions' }
    ]

    const pagination = ref({
      descending: false,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 10
    })
    const isPasswordValid = function (val) {
      return !!val || 'Insira a password'
    }
    const onServerRequest = async (_props) => {
      loading.value = true
      try {
        utilizadores.value = await getAuth('utilizadores/read.php')
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
      isPasswordValid,
      onServerRequest,
      onNovo: () => {
        utilizador.value = { id: 0, username: '', password: '', tipo_id: 1, empresa_id: null, ativo: true }
        mostraEditor.value = true
      },
      onEdit: (p) => {
        utilizador.value = p
        utilizadorEscolhido.value = [p]
        mostraEditor.value = true
      },
      onOk: async () => {
        try {
          await postAuth('utilizadores/update.php', utilizador.value)
          tableRef.value.requestServerInteraction()
          mostraEditor.value = false
        } catch (error) {
          $q.notify({ message: 'Não foi possível guardar', type: 'warning' })
        }
      }
    }
  }
  
})
</script>
