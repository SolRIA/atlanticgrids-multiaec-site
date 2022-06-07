<template>
  <q-page padding>
    <q-card class="card-title">
      <q-card-section>
        <h3>TUTORIAIS</h3>
      </q-card-section>
      <SimpleSeparator />
    </q-card>

    <div class="q-pa-lg flex flex-center">
      <q-btn-toggle v-model="banco" push rounded :options="bancos" />
    </div>

    <h5>Estudos</h5>

    <q-card flat bordered>
      <q-list>
        <q-item
          v-for="s in estudos"
          :key="s.link"
          clickable
          v-ripple
          target="_blank"
          :href="s.link"
        >
          <q-item-section avatar>
            <q-avatar rounded size="100px">
              <img :src="s.imagem" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ s.titulo }}</q-item-label>
            <q-item-label caption lines="2">{{ s.descricao }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-btn
              :icon="mdiDownload"
              flat
              text-color="primary"
              target="_blank"
              :href="s.link"
            />
          </q-item-section>
        </q-item>
      </q-list>
      <q-inner-loading :showing="loadEstudos">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </q-card>

    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="paginacaoEstudos.pagina"
        :max="paginacaoEstudos.total"
        :max-pages="6"
        boundary-numbers
        direction-links
      />
    </div>

    <h5>Webinars</h5>

    <q-card flat>
      <div class="row justify-center q-col-gutter-md q-pt-lg">
        <div v-for="v in videos" :key="v.url">
          <q-video :src="v.url" class="col-xs-12 col-sm-4 col-md-2" />
        </div>
      </div>
      <q-inner-loading :showing="loadVideos">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </q-card>

    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="paginacaoVideos.pagina"
        :max="paginacaoVideos.total"
        :max-pages="6"
        boundary-numbers
        direction-links
      />
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab :icon="mdiHome" color="accent" to="/" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref, watch } from 'vue'
import { mdiFilePdfBox, mdiDownload, mdiHome } from '@quasar/extras/mdi-v6'
import { post, get } from 'boot/api'
import { useQuasar } from 'quasar'
import SimpleSeparator from 'src/components/SimpleSeparator.vue'

export default defineComponent({
  setup() {
    const $q = useQuasar()
    onMounted(async () => {
      try {
        const banks = await get('bancos/read.php')
        bancos.value = banks.map(function (b) {
          return { label: b.nome, value: b.id }
        })
        banco.value = bancos.value[0].value
      } catch (e) {
        console.error(e)
        $q.notify({
          message: 'Não foi possível obter os bancos',
          type: 'warning'
        })
      }
    })
    const bancos = ref([])
    const banco = ref({})
    const estudos = ref([])
    const videos = ref([])
    const loadEstudos = ref(false)
    const loadVideos = ref(false)
    const paginacaoEstudos = ref({
      total: 0,
      pagina: 1
    })
    const paginacaoVideos = ref({
      total: 0,
      pagina: 1
    })
    watch(banco, async (_current, _old) => {
      paginacaoEstudos.value.pagina = 1
      paginacaoVideos.value.pagina = 1
      await obterEstudos()
      await obterVideos()
    })
    watch(
      () => paginacaoEstudos.value.pagina,
      async (_current, _old) => {
        await obterEstudos()
      }
    )
    watch(
      () => paginacaoVideos.value.pagina,
      async (_current, _old) => {
        await obterVideos()
      }
    )
    const obterEstudos = async () => {
      loadEstudos.value = true
      try {
        const data = await post('tutoriais/read-estudos.php', {
          pagina: paginacaoEstudos.value.pagina,
          total: paginacaoEstudos.value.total,
          banco_id: banco.value,
          filtro: null
        })
        estudos.value = data.rows
        paginacaoEstudos.value.total = data.count
      } catch (e) {
        console.error(e)
        $q.notify({
          message: 'Não foi possível obter os estudos',
          type: 'warning'
        })
      }
      loadEstudos.value = false
    }
    const obterVideos = async () => {
      loadVideos.value = true
      try {
        const data = await post('tutoriais/read-videos.php', {
          pagina: paginacaoVideos.value.pagina,
          total: paginacaoVideos.value.total,
          banco_id: banco.value,
          filtro: null
        })
        videos.value = data.rows
        paginacaoVideos.value.total = data.count
      } catch (e) {
        console.error(e)
        $q.notify({
          message: 'Não foi possível obter os vídeos',
          type: 'warning'
        })
      }
      loadVideos.value = false
    }
    return {
      mdiFilePdfBox,
      mdiDownload,
      mdiHome,
      loadEstudos,
      loadVideos,
      bancos,
      banco,
      estudos,
      videos,
      paginacaoEstudos,
      paginacaoVideos
    }
  },
  components: { SimpleSeparator }
})
</script>
