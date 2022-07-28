<template>
  <q-page padding>
    <q-card class="card-title">
      <q-card-section>
        <h3>{{ $t('html.news.title') }}</h3>
      </q-card-section>
      <SimpleSeparator />
    </q-card>

    <div class="q-pa-lg flex flex-center">
      <q-btn-toggle v-model="banco" :options="bancos" size="lg" />
    </div>

    <div class="row items-stretch justify-center q-col-gutter-md q-pt-lg">
      <div v-for="p in noticias" :key="p.titulo">
        <q-card
          class="bg-grey-1 col-xs-12 col-sm-6 col-md-4 col-lg-2"
          style="width: 350px"
        >
          <q-img :src="p.imagem" :alt="p.titulo">
            <div class="absolute-bottom text-subtitle2 text-center">
              {{ p.country }}
            </div>
          </q-img>
          <q-card-section>
            <p class="text-subtitle1">{{ p.titulo }}</p>
            <p class="text-body-1">{{ p.descricao }}</p>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              flat
              label="ver mais"
              target="_blank"
              :href="p.link"
              color="primary"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab :icon="mdiHome" color="accent" to="/" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mdiHome } from '@quasar/extras/mdi-v6'
import { defineComponent, onMounted, ref, watch } from 'vue'
import { post, get, apiPublicUrl } from 'boot/api'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import SimpleSeparator from 'src/components/SimpleSeparator.vue'

export default defineComponent({
  components: { SimpleSeparator },
  setup() {
    const $q = useQuasar()
    const { t } = useI18n()

    onMounted(async () => {
      try {
        const banks = await get('bancos/read-ativo.php')
        bancos.value = banks.map(function (b) {
          const logo = apiPublicUrl(b.logo)
          return { label: b.nome, value: b.id, icon: 'img:' + logo }
        })
        banco.value = bancos.value[0].value
      } catch (e) {
        console.error(e)
        $q.notify({
          message: t('html.errors.errorLoadBanks'),
          type: 'warning'
        })
      }
    })

    const bancos = ref([])
    const banco = ref({})
    const noticias = ref([])
    const loadNoticias = ref(false)
    const paginacao = ref({
      total: 0,
      pagina: 1
    })

    watch(banco, async (_current, _old) => {
      paginacao.value.pagina = 1
      await obterNoticias()
    })
    const obterNoticias = async () => {
      loadNoticias.value = true
      try {
        const data = await post('noticias/read.php', {
          pagina: paginacao.value.pagina,
          total: paginacao.value.total,
          banco_id: banco.value,
          filtro: null
        })
        noticias.value = data.rows
        paginacao.value.total = data.count
      } catch (e) {
        console.error(e)
        $q.notify({
          message: t('html.errors.errorLoadNews'),
          type: 'warning'
        })
      }
      loadNoticias.value = false
    }

    return {
      mdiHome,
      bancos,
      banco,
      noticias
    }
  }
})
</script>
