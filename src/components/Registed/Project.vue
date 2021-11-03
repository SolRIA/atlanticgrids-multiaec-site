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

          <q-input v-model="data" label="Data" outlined class="col-xs-12 col-md-6">
            <template v-slot:append>
              <q-btn :icon="mdiCalendarMonth" flat dense color="positive">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="data">
                    <q-btn label="Fechar" color="positive" flat v-close-popup />
                  </q-date>
                </q-popup-proxy>
              </q-btn>
            </template>
          </q-input>
          
          <q-select v-model="projeto.tipo_id" :options="tipos" label="Tipos de projetos" option-label="nome" option-value="id" class="col-xs-12 col-md-6"
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

          <q-select label="País" outlined v-model="projeto.pais_id" :options="paises" class="col-xs-12 col-md-6" 
            option-value="id" option-label="nome" emit-value map-options clearable/>

          <q-input v-model="projeto.descricao" label="Descrição" outlined type="textarea" class="col-xs-12"/>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Cancelar" flat @click="onCancelClick" />
        <q-btn label="Guardar" color="primary" @click="onOKClick"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mdiWindowClose, mdiAccountHardHat, mdiCalendarMonth } from '@quasar/extras/mdi-v6'
import { defineComponent, ref, onMounted } from 'vue'
import { useDialogPluginComponent, date } from 'quasar'

export default defineComponent({
  name: 'ProjectEditor',
  props: { p: { type: Object, required: true }, tipos: { type: Array, required: true }, paises: { type: Array, required: true} },
  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits
  ],
  setup (props) {
    const { dialogRef, onDialogOK, onDialogCancel } = useDialogPluginComponent()
    const projeto = ref(Object.assign({ id: 0, nome: '', tipo_id: null, pais_id: null }, props.p))

    onMounted(() => {
      // get the properties
    })

    return {
      mdiWindowClose,
      mdiAccountHardHat,
      mdiCalendarMonth,
      projeto,

      data: ref(date.formatDate(Date.now(), 'YYYY/MM/DD')),

      dialogRef,

      onOKClick () {
        // TODO: save to the api
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
