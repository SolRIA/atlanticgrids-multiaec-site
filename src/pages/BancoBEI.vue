<template>
  <q-page padding>
    <q-card class="card-title">
      <q-card-section>
        <h3>
          <q-avatar rounded>
            <q-img :src="logobanco('imagens/bancos/eib.png')" />
          </q-avatar>
          Banco Europeu de Investimento (BEI)
        </h3>
      </q-card-section>
      <SimpleSeparator />
    </q-card>

    <q-card class="q-mt-md">
      <q-card-section>
        <p>
          O Banco Europeu de Investimento é um dos maiores credores
          multinacionais do mundo, é o braço de empréstimos da UE. O BEI atua
          não só na União Europeia como no resto do mundo.
        </p>
        <p>
          A maioria dos empréstimos do BEI é atribuída a projetos nos
          Estados-Membros da UE (cerca de 90% do volume total) que apoiam o
          desenvolvimento e a integração contínuos da União. Estes empréstimos
          são dirigidos a governos e ás empresas.
        </p>
        <p>
          As operações financeiras internacionais do BEI em todo o mundo ajudam
          a resolver os desequilíbrios e a estabelecer parcerias de colaboração
          mais estreitas, estimulam a economia mundial estável e aberta e
          permitem a integração de conhecimentos e tecnologias.
        </p>
        <ul>
          <li>
            O BEI fornece empréstimos a clientes de todos os tamanhos, sendo a
            sua presença muitas vezes fundamental para atrair outros
            investidores.
          </li>
          <li>
            O BEI estimula e catalisa capital privado através do investimento em
            equity.
          </li>
          <li>
            O BEI fornece garantias que cobrem os riscos de grandes e pequenos
            projetos. Também disponibiliza carteiras de crédito que tornam os
            projetos mais atrativos para outros investidores.
          </li>
        </ul>
        <p>
          O BEI oferece muitas oportunidades para fornecedores, empreiteiros e
          consultores em todo o mundo. A maioria dessas oportunidades de
          aquisição está relacionada a projetos financiados pelo BERD nas
          regiões onde atua. Mas há também um número limitado de oportunidades
          de contratos envolvendo projetos e departamentos internos do BERD.
        </p>
      </q-card-section>
    </q-card>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab :icon="mdiHome" color="accent" to="/" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mdiHome } from '@quasar/extras/mdi-v6'
import SimpleSeparator from 'src/components/SimpleSeparator.vue'
import { apiPublicUrl } from 'boot/api'
export default {
  components: { SimpleSeparator },
  setup() {
    const logobanco = (logo) => {
      return apiPublicUrl(logo)
    }
    return {
      mdiHome,
      logobanco
    }
  }
}
</script>
