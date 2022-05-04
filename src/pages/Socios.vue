<template>
  <q-page padding>
    <q-card class="card-title">
      <q-card-section>
        <h3>ASSOCIADOS</h3>
      </q-card-section>
      <SimpleSeparator />
    </q-card>

    <!-- grupos -->
    <div v-for="(grupo, index) in grupos" :key="index">
      <h6>{{ grupo }}</h6>
      <div class="row items-center justify-center q-col-gutter-md">
        <div
          v-for="empresa in empresas.filter((e) => e.grupo === grupo)"
          :key="empresa.nome"
        >
          <q-card
            class="bg-grey-1 col-xs-12 col-sm-6 col-md-4 col-lg-2 q-pa-lg"
            style="width: 250px"
          >
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
                outline
                class="action-btn btn-white"
                :label="empresa.titulo"
                @click="abreEmpresa(empresa.id)"
              />
            </q-card-actions>
          </q-card>
        </div>
      </div>
      <SimpleSeparator class="q-mt-lg" />
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab :icon="mdiHome" color="accent" to="/" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mdiHome } from '@quasar/extras/mdi-v6'
import { defineComponent, ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { get, apiPublicUrl } from 'boot/api'
import SimpleSeparator from 'src/components/SimpleSeparator.vue'

export default defineComponent({
  setup() {
    const $q = useQuasar()
    const $router = useRouter()
    const loading = ref(false)
    const empresas = ref([])
    onMounted(async () => {
      try {
        empresas.value = await get('empresas/read-ativo.php')
      } catch {
        $q.notify({
          message: 'Não foi possível obter as empresa',
          type: 'warning'
        })
      }
    })
    const logoEmpresa = (logo) => {
      return apiPublicUrl(logo)
    }
    const abreEmpresa = (id) => {
      $router.push({ path: '/associado', query: { id: id } })
    }
    return {
      mdiHome,
      loading,
      empresas,
      grupos: [
        'Grandes empresas',
        'Entidades SCTN',
        'PME',
        'Entidades administração pública',
        'Associações'
      ],
      logoEmpresa,
      abreEmpresa
    }
  },
  components: { SimpleSeparator }
})
</script>
