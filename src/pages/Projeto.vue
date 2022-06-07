<template>
  <q-page padding>
    <q-card class="card-title">
      <q-card-section>
        <h3>PROJETO</h3>
      </q-card-section>
      <SimpleSeparator />
    </q-card>

    <q-card class="q-mt-md">
      <q-card-section>
        <p>
          O Projeto MULTI AEC é um projeto promovido pelo Cluster AEC, que visa
          o reforço das atividades de cooperação e parceria no sector da
          Arquitetura Engenharia e Construção, nos mercados das Multilaterais
          Financeiras, numa abordagem a quatro desses mercados
        </p>
        <ul>
          <li>Banco Mundial (BM);</li>
          <li>Banco Interamericano de Desenvolvimento (BID);</li>
          <li>Banco Europeu para a Reconstrução e Desenvolvimento (BERD);</li>
          <li>Banco Europeu de Investimento (Grupo BEI);</li>
        </ul>
        <p>
          promovendo a inovação e a capacidade competitiva internacional, bem
          como a promoção internacional do setor da construção, contribuindo
          para alavancar a presença do tecido empresarial nos mercados externos,
          privilegiando geografias estratégicas nas quais a eficiência, inovação
          e know-how do setor AEC sejam reconhecidas.
        </p>
        <p>
          O projeto MULTI AEC é concretizado ao nível de cinco objetivo
          operacionais, a saber:
        </p>
        <ul>
          <li>Objetivos:</li>
          <ul>
            <li>
              Criação da Rede Operacional de mobilização para as Instituições
              Multilaterais;
            </li>
            <li>
              Realização de Visitas de Trabalho às Instituições Multilaterais;
            </li>
            <li>Desenvolvimento de um Plano de Internacionalização;</li>
            <li>
              Capacitação Estratégica, preparação de concursos e demonstração;
            </li>
            <li>Promoção Coletiva do setor AEC.</li>
          </ul>
        </ul>
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
export default {
  components: { SimpleSeparator },
  setup() {
    return {
      mdiHome
    }
  }
}
</script>
