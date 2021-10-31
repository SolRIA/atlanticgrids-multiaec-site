<template>
  <q-dialog ref="dialogRef" persistent>
    <q-card style="min-width: 60vw;">
      <q-card-section class="row items-center q-pb-md bg-primary text-white">
        <q-icon :name="mdiAccountHardHat" left size="2rem" />
        <div class="text-h6">{{ project.nome }} ({{ project.id }})</div>
        <q-space />
        <q-btn :icon="mdiWindowClose" flat dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pt-md">
        <div class="row q-col-gutter-sm">
          <q-input v-model="project.nome" label="Nome" outlined class="col-xs-12" />
          <q-input v-model="project.tipo" label="Tipo" outlined class="col-xs-12 col-md-6"/>
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
          <q-input v-model="project.descricao" label="Descrição" outlined type="textarea" class="col-xs-12"/>
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
import { defineComponent, ref } from 'vue'
import { useDialogPluginComponent } from 'quasar'

export default defineComponent({
  name: 'ProjectEditor',
  props: { p: { type: Object, required: true } },
  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits
  ],
  setup (props) {
    const { dialogRef, onDialogOK, onDialogCancel } = useDialogPluginComponent()
    const project = ref(Object.assign({}, props.p))

    return {
      mdiWindowClose,
      mdiAccountHardHat,
      mdiCalendarMonth,
      project,

      data: ref('2021/07/01'),

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
