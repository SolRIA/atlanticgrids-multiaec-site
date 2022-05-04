<template>
  <q-page padding>
    <q-card class="card-title">
      <q-card-section>
        <h3>NOTICIAS</h3>
      </q-card-section>
      <SimpleSeparator />
    </q-card>

    <div class="row items-stretch justify-center q-col-gutter-md q-pt-lg">
      <div v-for="p in projects" :key="p.title">
        <q-card
          class="bg-grey-1 col-xs-12 col-sm-6 col-md-4 col-lg-2"
          style="width: 350px"
        >
          <q-img :src="p.image" :alt="p.title">
            <div class="absolute-bottom text-subtitle2 text-center">
              {{ p.country }}
            </div>
          </q-img>
          <q-card-section>
            <p class="text-subtitle1">{{ p.title }}</p>
            <p class="text-body-1">{{ p.description }}</p>
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
import { defineComponent } from 'vue'
import SimpleSeparator from 'src/components/SimpleSeparator.vue'

export default defineComponent({
  setup() {
    const projects = [
      {
        link: 'https://www.miga.org/project/financiera-de-desarrollo-nacional-climate-finance-facility',
        country: 'COLOMBIA',
        title: 'Financiera de Desarrollo Nacional Climate Finance Facility',
        image:
          'https://www.miga.org/sites/default/files/styles/miga_teaser/public/2022-04/FDN SPG IMG.jpg',
        description:
          'Project Description: This summary covers a proposed senior unsecured loan facility to be provided to Financiera de Desarrollo Nacional S.A (FDN) by Banco Bilbao Vizcaya Argentaria, S.A. (BBVA) and other potential commercial...'
      },
      {
        link: 'https://www.miga.org/project/zrenjanin-wastewater-treatment-plant-0',
        country: 'SERBIA',
        title: 'Zrenjanin Wastewater Treatment Plant',
        image:
          'https://www.miga.org/sites/default/files/styles/miga_teaser/public/2022-03/iStock-628811958 -1_0.jpg',
        description:
          'Environmental and Social Review Summary  Zrenjanin Wastewater Treatment Plant  This Environmental and Social Review Summary (ESRS) is prepared by MIGA staff and disclosed prior to the date on which MIGA’s...'
      },
      {
        link: 'https://www.miga.org/project/sonnedix-south-africa-0',
        country: 'SOUTH AFRICA',
        title: 'Sonnedix South Africa',
        image:
          'https://www.miga.org/sites/default/files/styles/miga_teaser/public/2022-02/Solar Panel Home System_0.jpg',
        description:
          'Environmental and Social Review Summary  Mulilo Sonnedix Prieska Solar Photovoltaic Project  This Environmental and Social Review Summary (ESRS) is prepared by MIGA staff and disclosed prior to the date...'
      },
      {
        link: 'https://www.miga.org/project/scatec-bond-0',
        country: 'EGYPT, ARAB REPUBLIC OF',
        title: 'Scatec Bond',
        image:
          'https://www.miga.org/sites/default/files/styles/miga_teaser/public/2022-01/iStock-1023038930_0.jpg',
        description:
          'Environmental and Social Review Summary  Scatec Bond Project. This Environmental and Social Review Summary (ESRS) is prepared by MIGA staff and disclosed prior to the date on which MIGA’s Board of Directors...'
      }
    ]
    return {
      mdiHome,
      projects
    }
  },
  components: { SimpleSeparator }
})
</script>
