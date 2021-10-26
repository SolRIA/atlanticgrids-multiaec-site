<template>
  <q-page padding>
    <h4>{{ company.name }} <q-chip color="primary" text-color="white">{{ company.type }}</q-chip> </h4>
    <div class="row">
      <q-img :src="company.logo" class="col-2"/>
      <div class="col-10" v-html="company.description"></div>
    </div>
    <div class="q-pa-md text-right">
      <q-btn-group flat>
        <q-btn :icon="mdiWeb" color="primary" size="md"/>
        <q-btn :icon="mdiFacebook" color="primary" size="md"/>
        <q-btn :icon="mdiTwitter" color="primary" size="md"/>
        <q-btn :icon="mdiLinkedin" color="primary" size="md"/>
      </q-btn-group>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { mdiWeb, mdiFacebook, mdiTwitter, mdiLinkedin } from '@quasar/extras/mdi-v6'

export default defineComponent({

  
  setup () {
    const description = `<div class="text-body1">Um percurso de mais de 70 anos, marcados por uma cultura de empreendedorismo e de inovação na procura permanente de novos horizontes.</div><br><br>
          <div class="text-body2">Líder em Portugal e com uma posição consolidada no ranking dos 25 maiores grupos europeus de construção, a Mota-Engil marca atualmente presença em 24 países, repartidos por 3 áreas geográficas – Europa, África e América Latina.</div><br>
          <div class="text-body2">Participando em mais de 200 empresas e com um posicionamento de mercado de acordo com os valores e a identidade cultural da organização, alicerçada numa visão estratégica única e integrada para a Mota-Engil do futuro: um Grupo mais internacional, inovador e competitivo à escala global.</div>`

    const company = { name: 'Grupo Mota-Engil', logo: '/companies/me.png', description: description, type: 'Engenharia e Contruções' }

    return {
      mdiWeb, 
      mdiFacebook, 
      mdiTwitter, 
      mdiLinkedin,
      company
    }
  }
})
</script>
