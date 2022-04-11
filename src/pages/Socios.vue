<template>
  <q-page padding>
    <h2>Associados</h2>

    <!-- grupos -->
    <div v-for="(grupo, index) in grupos" :key="index">
      <h4>{{ grupo }}</h4>
      <div class="row items-center justify-center q-col-gutter-md">
        <div
          v-for="empresa in empresas.filter((e) => e.grupo === grupo)"
          :key="empresa.nome"
        >
          <q-card
            flat
            bordered
            class="bg-grey-1 col-xs-12 col-sm-6 col-md-4 col-lg-2 q-pa-lg"
            style="width: 250px"
          >
            <!-- <q-card-section>
              <div class="text-h6">{{ empresa.titulo }}</div>
            </q-card-section> -->

            <q-card-section>
              <div class="flex flex-center text-center">
                <q-img
                  height="70px"
                  fit="scale-down"
                  :src="logoEmpresa(empresa.logo)"
                  :alt="empresa.nome"
                />
              </div>
            </q-card-section>

            <q-card-actions>
              <q-btn
                rounded
                outline=""
                class="action-btn btn-white"
                :label="empresa.titulo"
                @click="abreEmpresa(empresa.id)"
              />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { get, apiPublicUrl } from "boot/api";

export default defineComponent({
  setup() {
    const $q = useQuasar();
    const $router = useRouter();

    const loading = ref(false);
    const empresas = ref([]);

    onMounted(async () => {
      try {
        empresas.value = await get("empresas/read-ativo.php");
      } catch {
        $q.notify({
          message: "Não foi possível obter as empresa",
          type: "warning",
        });
      }
    });

    const logoEmpresa = (logo) => {
      return apiPublicUrl(logo);
    };
    const abreEmpresa = (id) => {
      $router.push({ path: "/associado", query: { id: id } });
    };

    return {
      loading,
      empresas,
      grupos: [
        "Grandes empresas",
        "Entidades SCTN",
        "PME",
        "Entidades administração pública",
        "Associações",
      ],
      logoEmpresa,
      abreEmpresa,
    };
  },
});
</script>
