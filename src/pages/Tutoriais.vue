<template>
  <q-page padding>
    <q-card flat class="bg-primary text-white q-mb-lg">
      <q-card-section>
        <div class="flex flex-center items-center">
          <h3>Tutoriais</h3>
        </div>
      </q-card-section>
    </q-card>

    <q-btn-toggle
      v-model="banco"
      push
      rounded
      :options="bancos"
      class="q-mb-lg"
    />

    <q-list bordered padding>
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

    <div class="row justify-center q-col-gutter-md q-pt-lg">
      <div v-for="v in videos" :key="v.url">
        <q-video :src="v.url" class="col-xs-12 col-sm-4 col-md-2" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { mdiFilePdfBox, mdiDownload } from '@quasar/extras/mdi-v6'
import { get } from 'boot/api'
import { useQuasar } from 'quasar'

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

      try {
        estudos.value = await get('tutoriais/read-estudos.php')
      } catch (e) {
        console.error(e)
        $q.notify({
          message: 'Não foi possível obter os estudos',
          type: 'warning'
        })
      }

      try {
        videos.value = await get('tutoriais/read-videos.php')
      } catch (e) {
        console.error(e)
        $q.notify({
          message: 'Não foi possível obter os vídeos',
          type: 'warning'
        })
      }
    })

    const bancos = ref([])
    const banco = ref({})

    const estudos = ref([])

    const videos = ref([])

    return {
      mdiFilePdfBox,
      mdiDownload,
      bancos,
      banco,
      estudos,
      videos
    }
  }
})
</script>
