<template>
  <q-page padding>
    <q-card class="card-title">
      <q-card-section>
        <h3>
          <q-avatar rounded>
            <q-img :src="logobanco('imagens/bancos/iadb.png')" />
          </q-avatar>
          Banco Interamericano de Desenvolvimento (BID)
        </h3>
      </q-card-section>
      <SimpleSeparator />
    </q-card>

    <q-card class="q-mt-md">
      <q-card-section>
        <p>
          O Banco Interamericano de Desenvolvimento (BID) foi constituído em
          1959, é a principal fonte de financiamento para o desenvolvimento da
          América Latina e do Caribe. Fornece empréstimos, doações e assistência
          técnica aos países da região e conduz diversas tipologias de pesquisas
        </p>
        <p>
          A governança do BID é exercida pela Assembleia de Governadores, que
          encabeça a estrutura organizacional do Banco. Cada país membro nomeia
          um Governador, cujo poder de voto é proporcional ao capital do Banco
          subscrito pelo seu país. Os governadores são geralmente ministros das
          finanças, presidentes de bancos centrais. A Assembleia de Governadores
          realiza uma reunião anual em março ou abril de cada ano para rever as
          operações do Banco e tomar decisões políticas importantes. Também pode
          realizar reuniões extraordinárias sobre questões-chave. Estas decisões
          estão refletidas na lista de resoluções aprovadas na Assembleia de
          Governadores Os Governadores do BID são os responsáveis por
          supervisionar as atividades e a administração do Banco, embora, na
          prática, deleguem muitas dessas responsabilidades na Direção Executiva
          do Banco.
        </p>
        <p>
          O Banco Interamericano de Desenvolvimento (BID) tem atualmente três
          categorias de empréstimos com base na finalidade de desenvolvimento,
          elegibilidade e requisitos de desembolso do empréstimo, bem como nos
          critérios para determinar o tamanho dos montantes do empréstimo e os
          termos financeiros. Cada categoria de empréstimo inclui diferentes
          tipos de instrumentos e abordagens de empréstimo.
        </p>
        <p>CATEGORIAS DE EMPRÉSTIMO</p>
        <ol>
          <li>
            Os empréstimos para investimentos aos países membros mutuários do
            BID financiam bens, obras e serviços para promover o desenvolvimento
            social e económico. Esta categoria inclui instrumentos específicos
            para apoiar os países membros mutuários do BID em caso de desastre
            natural.
          </li>
          <li>
            Os empréstimos baseados em políticas fornecem aos países membros
            mutuários do Banco financiamento para apoiar reformas de políticas
            e/ou mudanças institucionais num determinado setor ou subsetor.
          </li>
          <li>
            Os empréstimos especiais para o desenvolvimento apoiam os países
            mutuários durante uma crise macroeconómica e atenuam os efeitos
            sobre o progresso económico e social dos países.
          </li>
        </ol>
        <p>
          INSTRUMENTOS DE GARANTIAS PARA OPERAÇÕES COM GARANTIA SOBERANA Além
          das três categorias de empréstimos, o BID pode garantir empréstimos
          feitos por fontes financeiras privadas em projetos do setor público.
          As garantias visam melhorar as condições de financiamento de projetos
          na América Latina e no Caribe e ajudam a promover o investimento nos
          países mutuários. Estas garantias são ao crédito de forma parcial e
          garantia de risco político.
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
