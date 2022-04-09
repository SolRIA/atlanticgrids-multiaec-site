<template>
  <q-dialog ref="dialogRef" persistent>
    <q-card style="min-width: 60vw">
      <q-card-section class="row items-center q-pb-md bg-primary text-white">
        <div class="text-h6">{{ e.nome }}</div>
        <q-space />
        <q-btn :icon="mdiWindowClose" flat dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pt-md">
        <div class="row q-col-gutter-md">
          <q-img height="70px" fit="scale-down" :src="logo" :alt="e.nome" />
          <p>
            <span v-html="e.descricao"></span>
          </p>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Fechar" color="primary" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import {
  mdiWindowClose,
  mdiAccountHardHat,
  mdiCalendarMonth,
} from "@quasar/extras/mdi-v6";
import { defineComponent } from "vue";
import { useDialogPluginComponent } from "quasar";

export default defineComponent({
  name: "Empresa",
  props: {
    e: { type: Object, required: true },
    logo: { type: String, required: true },
  },
  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits,
  ],
  setup(props) {
    const { dialogRef, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();

    return {
      mdiWindowClose,
      mdiAccountHardHat,
      mdiCalendarMonth,

      dialogRef,

      onOKClick: () => {
        // on OK, it is REQUIRED to
        // call onDialogOK (with optional payload)
        onDialogOK();
        // or with payload: onDialogOK({ ... })
        // ...and it will also hide the dialog automatically
      },

      // we can passthrough onDialogCancel directly
      onCancelClick: onDialogCancel,
    };
  },
});
</script>
