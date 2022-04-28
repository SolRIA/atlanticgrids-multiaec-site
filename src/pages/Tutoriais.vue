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
        v-for="s in studies"
        :key="s.link"
        clickable
        v-ripple
        target="_blank"
        :href="s.link"
      >
        <q-item-section avatar>
          <q-avatar rounded size="100px">
            <img :src="s.image" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ s.title }}</q-item-label>
          <q-item-label caption lines="2">{{ s.description }}</q-item-label>
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
      <div v-for="v in videos" :key="v">
        <q-video :src="v" class="col-xs-12 col-sm-4 col-md-2" />
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
          message: 'Não foi possível efetuar obter os bancos',
          type: 'warning'
        })
      }
    })

    const bancos = ref([])
    const banco = ref({})

    const studies = [
      {
        link: 'https://openknowledge.worldbank.org/bitstream/handle/10986/36289/9781464818004.pdf',
        image:
          'https://openknowledge.worldbank.org/bitstream/handle/10986/36901/Debt-Report-2022-First-Edition.pdf.jpg',
        title: 'International Debt Statistics 2022',
        description:
          'This is the first of three Debt Reports for 2022 to be published online over the course of the year to provide users with data and analysis on external and public debt of low- and middle-income countries. Debt Report 2022 First Edition present summary analyses of the composition of external debt stocks and flows from the regional perspective.'
      },
      {
        link: 'https://openknowledge.worldbank.org/bitstream/handle/10986/36289/9781464818004.pdf',
        image:
          'https://openknowledge.worldbank.org/bitstream/handle/10986/36289/9781464818004.pdf.jpg',
        title: 'International Debt Statistics 2022',
        description:
          'This is the first of three Debt Reports for 2022 to be published online over the course of the year to provide users with data and analysis on external and public debt of low- and middle-income countries. Debt Report 2022 First Edition present summary analyses of the composition of external debt stocks and flows from the regional perspective.'
      },
      {
        link: 'https://openknowledge.worldbank.org/bitstream/handle/10986/36289/9781464818004.pdf',
        image:
          'https://openknowledge.worldbank.org/bitstream/handle/10986/35736/Purchasing-Power-Parities-for-Policy-Making-A-Visual-Guide-to-Using-Data-from-the-International-Comparison-Program.pdf.jpg',
        title: 'International Debt Statistics 2022',
        description:
          'This is the first of three Debt Reports for 2022 to be published online over the course of the year to provide users with data and analysis on external and public debt of low- and middle-income countries. Debt Report 2022 First Edition present summary analyses of the composition of external debt stocks and flows from the regional perspective.'
      }
    ]

    const videos = [
      'https://www.youtube.com/embed/U58Al1l7p-I',
      'https://www.youtube.com/embed/ho7-L9wdfb4',
      'https://www.youtube.com/embed/IbURhIc5VFY',
      'https://www.youtube.com/embed/SmKafT7Yxzs',
      'https://www.youtube.com/embed/1Rm1o7AaBdM'
    ]

    return {
      mdiFilePdfBox,
      mdiDownload,
      bancos,
      banco,
      studies,
      videos
    }
  }
})
</script>
