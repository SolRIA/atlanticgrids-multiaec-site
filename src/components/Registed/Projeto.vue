<template>
  <q-dialog ref="dialogRef" persistent>
    <q-card style="min-width: 60vw;">
      <q-card-section class="row items-center q-pb-md bg-primary text-white">
        <q-icon :name="mdiAccountHardHat" left size="2rem" />
        <div class="text-h6">{{ projeto.nome }} ({{ projeto.id }})</div>
        <q-space />
        <q-btn :icon="mdiWindowClose" flat dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pt-md">
        <div class="row q-col-gutter-md">
          <q-input v-model="projeto.nome" label="Nome" outlined class="col-xs-12 col-md-6" />

          <q-input v-model="projeto.data" label="Data" outlined class="col-xs-12 col-md-6">
            <template v-slot:append>
              <q-btn :icon="mdiCalendarMonth" flat dense color="positive">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="projeto.data" mask="YYYY-MM-DD">
                    <q-btn label="Fechar" color="positive" flat v-close-popup />
                  </q-date>
                </q-popup-proxy>
              </q-btn>
            </template>
          </q-input>
          
          <q-select v-model="projeto.tipos" :options="tipos" label="Tipos de projetos" option-label="nome" option-value="id" class="col-xs-12 col-md-4"
            multiple emit-value map-options outlined>
            <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
              <q-item v-bind="itemProps">
                <q-item-section>
                  <q-item-label>{{ opt.nome }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-toggle :model-value="selected" @update:model-value="toggleOption(opt)" />
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-select label="País" outlined v-model="projeto.pais_id" :options="paises" class="col-xs-12 col-md-4" 
            option-value="id" option-label="nome" emit-value map-options clearable/>

          <q-select label="Banco" outlined v-model="projeto.banco_id" :options="bancos" class="col-xs-12 col-md-4" 
            option-value="id" option-label="nome" emit-value map-options/>

          <q-input v-model="projeto.descricao" label="Descrição" outlined type="textarea" class="col-xs-12"/>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Cancelar" flat @click="onCancelClick" />
        <q-btn label="Guardar" color="primary" @click="onOKClick"/>
      </q-card-actions>

      <q-inner-loading :showing="loading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </q-card>
  </q-dialog>
</template>

<script>
import { mdiWindowClose, mdiAccountHardHat, mdiCalendarMonth } from '@quasar/extras/mdi-v6'
import { defineComponent, ref, onMounted } from 'vue'
import { useDialogPluginComponent, useQuasar } from 'quasar'
import { postAuth, getAuth } from 'boot/api'

export default defineComponent({
  name: 'ProjectEditor',
  props: { 
    p: { type: Object, required: true }, 
    tipos: { type: Array, required: true }, 
    paises: { type: Array, required: true},
    bancos: { type: Array, required: true} 
  },
  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits
  ],
  setup (props) {
    const $q = useQuasar()

    const { dialogRef, onDialogOK, onDialogCancel } = useDialogPluginComponent()
    const loading = ref(false)
    const projeto = ref(Object.assign({ id: 0, nome: '', tipos: [], pais_id: null, banco_id: null, ativo: true, referencia: '', data: '' }, props.p))

    onMounted(async () => {
      if (projeto.value.id > 0) {
        loading.value = true
        try {
          // projeto
          projeto.value = await getAuth('projetos/read-single.php?id=' + projeto.value.id)
        } catch {
          $q.notify({ message: 'Não foi possível obter todos os dados do projeto', type: 'warning' })
        }
        loading.value = false
        }
    })

    return {
      mdiWindowClose,
      mdiAccountHardHat,
      mdiCalendarMonth,
      loading,
      projeto,

      dialogRef,

      onOKClick: async () => {
        try {
          await postAuth('projetos/update.php', projeto.value)
        } catch {
          $q.notify({ message: 'Não foi possível guardar', type: 'warning' })
        }
        // on OK, it is REQUIRED to
        // call onDialogOK (with optional payload)
        onDialogOK()
        // or with payload: onDialogOK({ ... })
        // ...and it will also hide the dialog automatically
      },

      // we can passthrough onDialogCancel directly
      onCancelClick: onDialogCancel
    }
  }
})
</script>
