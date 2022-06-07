<template>
  <q-page padding>
    <q-card class="card-title">
      <q-card-section>
        <h3>
          <q-avatar rounded>
            <q-img :src="logobanco('imagens/bancos/wb.png')" />
          </q-avatar>
          Banco Muldial (BM)
        </h3>
      </q-card-section>
      <SimpleSeparator />
    </q-card>

    <q-card class="q-mt-md">
      <q-card-section>
        <p>
          O Banco Mundial é como uma cooperativa, composta por 189 países
          membros. Esses países membros, ou acionistas, são representados por
          uma Assembleia de Governadores , que são os principais responsáveis
          pelas políticas do Banco Mundial. Geralmente, os governadores são
          ministros das finanças ou ministros do desenvolvimento dos países
          membros. Reúnem-se uma vez por ano nas Reuniões Anuais dos Conselhos
          de Governadores do Grupo Banco Mundial e do Fundo Monetário
          Internacional.
        </p>
        <p>
          O Banco Mundial (BM) é constituído por 5 organizações independentes,
          mas que trabalham em conjunto para os objetivos da instituição:
        </p>
        <ol>
          <li>
            The International Bank for Reconstruction and Development (IBRD)
            <ul>
              <li>
                O IBRD presta auxilio financeiro a países com médios ou fracos
                recursos financeiros, mas que ainda assim sejam dignos de
                crédito pela instituição.
              </li>
            </ul>
          </li>

          <li>
            The International Development Association (IDA)
            <ul>
              <li>
                A IDA oferece empréstimos sem juros e promove doações a países
                muito pobres.
              </li>
            </ul>
          </li>

          <li>
            The International Finance Coorporation (IFC)
            <ul>
              <li>
                A IFC é uma instituição focada exclusivamente nos sectores
                privados. Ajuda países em desenvolvimento a alcançar um
                crescimento sustentável, financiando investimentos e mobilizando
                capital nos mercados financeiros e prestando consultoria a
                empresas e Governos.
              </li>
            </ul>
          </li>

          <li>
            The Multilateral Investment Guarantee Agency (MIGA)
            <ul>
              <li>
                A MIGA promove o investimento estrangeiro direto nos países em
                desenvolvimento, fornecendo seguros contra riscos políticos
                (Garantias) a investidores e credores.
              </li>
            </ul>
          </li>

          <li>
            The International center for Settlement of Investment Disputes
            (ICSID)
            <ul>
              <li>
                O ICSID é um centro de Arbitragem para disputas de investimentos
                nos países de atuação do Banco Mundial.
              </li>
            </ul>
          </li>
        </ol>
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
