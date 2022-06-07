<template>
  <q-page padding>
    <q-card class="card-title">
      <q-card-section>
        <h3>
          <q-avatar rounded>
            <q-img :src="logobanco('imagens/bancos/ebrd.png')" />
          </q-avatar>
          Banco Europeu de Reconstrução e Desenvolvimento (BERD)
        </h3>
      </q-card-section>
      <SimpleSeparator />
    </q-card>

    <q-card class="q-mt-md">
      <q-card-section>
        <p>
          O Banco Europeu de Reconstrução e Desenvolvimento (BERD) foi criado
          para ajudar a construir uma nova era pós-Guerra Fria na Europa Central
          e Oriental. Desempenhou um papel histórico e ganhou experiência única
          na promoção de mudanças na região, tendo até ao momento investindo
          quase € 150 biliões em mais de 6.000 projetos.
        </p>
        <p>
          O BERD oferece muitas oportunidades para fornecedores, empreiteiros e
          consultores em todo o mundo. A maioria dessas oportunidades de
          aquisição está relacionada a projetos financiados pelo BERD nas
          regiões onde atua. Mas há também um número limitado de oportunidades
          de contratos envolvendo projetos e departamentos internos do BERD.
        </p>
        <p>
          O BERD oferece produtos financeiros adaptados a cada cliente, sejam
          eles Países ou empresas que atuem nos mercados cobertos pela
          instituição. Os potenciais clientes devem demonstrar que seu projeto
          ou negócio cumpre os requisitos mínimos para que o envolvimento do
          BERD se efetue.
        </p>
        <p>
          O financiamento do BERD para projetos do setor privado geralmente
          varia de € 5 milhões a € 250 milhões, na forma de empréstimos ou
          ações. O investimento médio do BERD é de € 25 milhões. Projetos
          menores podem ser financiados por intermediários financeiros ou por
          meio de programas especiais para investimentos diretos menores nos
          países menos avançados.
        </p>
        <p>As formas de financiamento direto que o BERD dispõe são:</p>
        <ul>
          <li>Empréstimos</li>
          <li>Investimentos igualitários</li>
          <li>Garantias para promover o comércio</li>
          <li>
            Apoio a PMEs, através de assistência de intermediários financeiros.
          </li>
        </ul>

        <iframe
          src="//players.brightcove.net/390587111001/default_default/index.html?videoId=3844666642001"
          allowfullscreen
          frameborder="0"
        ></iframe>
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
