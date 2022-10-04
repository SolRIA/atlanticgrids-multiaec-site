<template>
  <q-dialog ref="dialogRef" persistent :maximized="maximized">
    <q-card :class="$q.screen.lt.md ? 'phone-dialog' : 'desktop-dialog'">
      <q-card-section class="row items-center q-pb-md bg-primary text-white">
        <div class="text-h6">
          <q-chip color="positive" text-color="white">
            {{ projeto.referencia }}
          </q-chip>
          {{ projeto.nome }}
        </div>
        <q-space />
        <q-btn
          :icon="maximized ? mdiWindowRestore : mdiWindowMaximize"
          flat
          dense
          @click="maximized = !maximized"
        />
        <q-btn :icon="mdiWindowClose" flat dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pt-md">
        <q-scroll-area class="dialog-scroll">
          <div class="row q-col-gutter-md">
            <q-input
              v-model="projeto.nome"
              label="Nome"
              outlined
              readonly
              class="col-xs-12"
            />

            <q-input
              v-model="projeto.cliente"
              label="Agência executora"
              outlined
              class="col-xs-12 col-md-6"
            />
            <q-input
              v-model="projeto.setor"
              label="Setor"
              outlined
              class="col-xs-12 col-md-6"
            />

            <q-input
              v-model="projeto.estado"
              label="Estado"
              outlined
              class="col-xs-12 col-md-4"
            />

            <q-input
              v-model="projeto.data"
              label="Data"
              outlined
              readonly
              class="col-xs-12 col-md-6"
            />
            <q-input
              v-model="projeto.data_fecho"
              label="Data fecho"
              outlined
              readonly
              class="col-xs-12 col-md-6"
            />

            <q-select
              v-model="projeto.tipos"
              :options="tipos"
              readonly
              label="Tipos de projetos"
              option-label="nome"
              option-value="id"
              class="col-xs-12 col-md-4"
              multiple
              emit-value
              map-options
              outlined
            />

            <q-select
              label="País"
              outlined
              v-model="projeto.pais"
              :options="paises"
              readonly
              class="col-xs-12 col-md-4"
              option-value="nome"
              option-label="nome"
              emit-value
              map-options
              clearable
            />

            <q-select
              label="Banco"
              outlined
              v-model="projeto.banco_id"
              :options="bancos"
              readonly
              class="col-xs-12 col-md-4"
              option-value="id"
              option-label="nome"
              emit-value
              map-options
            />

            <div v-html="projeto.descricao"></div>
          </div>
        </q-scroll-area>
      </q-card-section>

      <q-card-section
        v-if="mostraAccoes"
        style="height: 200px; background-color: #efefef; padding: 0px"
      >
        <h6 style="margin: 10px; padding: 10px">Indique o seu interesse</h6>
        <div class="flex flex-center">
          <q-btn-toggle
            v-model="accao"
            no-caps
            rounded
            size="lg"
            toggle-color="grey-8"
            :options="accoesCliente"
            @update:model-value="atualizaAccao"
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
                <div class="col-12 text-center">Preciso apoio</div>
                <div style="height: 4px" class="col-12 bg-warning"></div>
              </div>
            </template>
          </q-btn-toggle>
        </div>
      </q-card-section>

      <q-inner-loading :showing="loading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.dialog-scroll {
  /* set the max-height 100vh - 24 (top space)  - 68 (header) - 16 (margin) - 48 (footer) - 24 (bottom space) */
  height: calc(100vh - 390px);
}
.desktop-dialog {
  min-width: 60vw;
  overflow: hidden;
}
.phone-dialog {
  min-width: 100vw;
  overflow: hidden;
}
</style>

<script>
import {
  mdiWindowClose,
  mdiCalendarMonth,
  mdiWindowMaximize,
  mdiWindowRestore,
} from "@quasar/extras/mdi-v6";
import { defineComponent, ref, onMounted } from "vue";
import { useDialogPluginComponent, useQuasar } from "quasar";
import { postAuth, getAuth } from "boot/api";
import { accoesCliente } from "src/models/accoes-projetos";

export default defineComponent({
  name: "ProjectView",
  props: {
    p: { type: Object, required: true },
    tipos: { type: Array, required: true },
    paises: { type: Array, required: true },
    bancos: { type: Array, required: true },
    mostraAccoes: { type: Boolean, required: true },
  },
  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits,
  ],
  setup(props) {
    const $q = useQuasar();

    const { dialogRef } = useDialogPluginComponent();
    const loading = ref(false);
    const maximized = ref(false);

    const accao = ref(null);
    const projeto = ref(
      Object.assign(
        {
          id: 0,
          nome: "",
          tipos: [],
          pais_id: null,
          banco_id: null,
          ativo: true,
          referencia: "",
          data: "",
          accao: 0,
        },
        props.p
      )
    );

    onMounted(async () => {
      if (projeto.value.id > 0) {
        loading.value = true;
        try {
          // projeto
          projeto.value = await getAuth(
            "projetos/read-single.php?id=" + projeto.value.id
          );
          accao.value = projeto.value.accao;
        } catch {
          $q.notify({
            message: "Não foi possível obter todos os dados do projeto",
            type: "warning",
          });
        }
        loading.value = false;
      }
    });

    const atualizaAccao = async (value) => {
      await postAuth("projetos/update-accao-project.php", {
        projeto_id: projeto.value.id,
        accao: value,
      });
    };

    return {
      mdiWindowClose,
      mdiCalendarMonth,
      mdiWindowMaximize,
      mdiWindowRestore,
      loading,
      maximized,
      projeto,
      accao,
      accoesCliente,

      dialogRef,

      atualizaAccao,
    };
  },
});
</script>
