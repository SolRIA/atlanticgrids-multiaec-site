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
          <h6>{{ empresa.nome }}</h6>
          <p>
            <span v-html="empresa.descricao"></span>
          </p>
        </q-card-section>

        <q-card-actions>
          <q-btn
            rounded
            outline
            label="Voltar"
            class="action-btn btn-white"
            to="/associados"
          />
          <q-space />
          <q-btn
            flat
            round
            :icon="mdiWeb"
            :href="empresa.website"
            v-if="empresa.website"
            color="red"
            size="lg"
            target="_blank"
          />
          <q-btn
            flat
            round
            :icon="mdiEmail"
            :href="'mailto:' + empresa.email_publico"
            v-if="empresa.email_publico"
            color="red"
            size="lg"
            target="_blank"
          />
          <q-btn
            flat
            round
            :icon="mdiCellphone"
            :href="'tel:' + empresa.telemovel"
            v-if="empresa.telemovel"
            color="red"
            size="lg"
            target="_blank"
          />
          <q-btn
            flat
            round
            :icon="mdiPhoneClassic"
            :href="'tel:' + empresa.telefone"
            v-if="empresa.telefone"
            color="red"
            size="lg"
            target="_blank"
          />
          <q-btn
            flat
            round
            :icon="mdiFacebook"
            :href="empresa.facebook"
            color="red"
            size="lg"
            v-if="empresa.facebook"
          />
          <q-btn
            flat
            round
            :icon="mdiTwitter"
            :href="empresa.twitter"
            color="red"
            size="lg"
            v-if="empresa.twitter"
          />
          <q-btn
            flat
            round
            :icon="mdiLinkedin"
            :href="empresa.linkedin"
            color="red"
            size="lg"
            v-if="empresa.linkedin"
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
import {
  mdiWeb,
  mdiCellphone,
  mdiPhoneClassic,
  mdiEmail,
  mdiFacebook,
  mdiTwitter,
  mdiLinkedin,
} from "@quasar/extras/mdi-v6";

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
      mdiWeb,
      mdiCellphone,
      mdiPhoneClassic,
      mdiEmail,
      mdiFacebook,
      mdiTwitter,
      mdiLinkedin,
      empresa,
      logoEmpresa,
    };
  },
});
</script>
