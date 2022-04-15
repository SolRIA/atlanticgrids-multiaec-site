<template>
  <q-page padding>
    <div class="flex items-center justify-center">
      <q-card class="bg-grey-1 col-xs-12 col-sm-6 col-md-4 col-lg-2 q-pa-lg">
        <q-card-section>
          <div class="flex flex-center text-center">
            <q-img
              height="150px"
              fit="scale-down"
              :src="logoEmpresa(empresa.logo)"
              :alt="empresa.nome"
            />
          </div>
        </q-card-section>

        <q-card-section>
          <h6>{{ empresa.titulo }}</h6>
          <p>
            <span v-html="empresa.descricao"></span>
          </p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            rounded
            outline
            label="Voltar"
            class="action-btn btn-white"
            to="/associados"
          />
          <q-btn
            rounded
            outline
            label="Website"
            class="action-btn btn-white"
            target="_blank"
            :icon="mdiOpenInNew"
            :href="empresa.website"
          />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { get, apiPublicUrl } from "boot/api";
import { mdiOpenInNew } from "@quasar/extras/mdi-v6";

export default defineComponent({
  setup() {
    const $route = useRoute();

    const empresa = ref({});
    onMounted(async () => {
      const id = parseInt($route.query.id);

      empresa.value = await get("empresas/read-single.php?id=" + id);
    });

    const logoEmpresa = (logo) => {
      return apiPublicUrl(logo);
    };

    return {
      mdiOpenInNew,
      empresa,
      logoEmpresa,
    };
  },
});
</script>
