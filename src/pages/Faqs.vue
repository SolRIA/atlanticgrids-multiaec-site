<template>
  <q-page padding>
    <q-card class="card-title">
      <q-card-section>
        <h3>{{ $t("html.faqs.title") }}</h3>
      </q-card-section>
      <SimpleSeparator />
    </q-card>

    <q-list class="rounded-borders q-my-lg">
      <q-expansion-item
        popup
        expand-separator
        label="Projetos"
        caption="Como consigo pesquisar os projetos?"
        default-opened
      >
        <q-card>
          <q-card-section>
            Na página dos projetos podem ser consultados os projetos dos
            diferentes bancos.
          </q-card-section>
          <q-card-section>
            Existe uma área de pesquisa que permite filtrar os projetos
            apresentados. É possível filtrar por banco, país do projeto e existe
            um campo de pesquisa livre, que permite filtrar os projetos por nome
            ou referência.
          </q-card-section>
          <q-card-section>
            <q-img
              src="/images/faqs/ecra_00.png"
              fit="scale-down"
              style="max-height: 250px"
            />
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        popup
        expand-separator
        label="Registo"
        caption="O que é e como posso criar conta associado PTPC?"
      >
        <q-card>
          <q-card-section>
            Na página de login é possível criar uma conta para aceder a mais
            informações sobre os projetos.
          </q-card-section>
          <q-card-section>
            É necessário criar conta de Associado PTPC para aceder a mais
            informações sobre os projetos, bem como a notificações quando forem
            lançados novos projetos.
          </q-card-section>
          <q-card-section>
            <span v-html="$t('html.login.associateWarning')"></span>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        popup
        expand-separator
        label="Registo"
        caption="O que é e como posso criar conta parceiro local?"
      >
        <q-card>
          <q-card-section>
            Na página de login é possível criar uma conta de parceiro local.
          </q-card-section>
          <q-card-section>
            <span v-html="$t('html.login.partnerWarning')"></span>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        popup
        expand-separator
        label="Área privada"
        caption="Que operações existem na área privada e quais os benefícios?"
      >
        <q-card>
          <q-card-section>
            Na página inicial são apresentados os projetos, onde é possível
            obter mais informações dos próprios projetos e das acções de
            interesse de outros associados.
          </q-card-section>
          <q-card-section>
            <q-img
              src="/images/faqs/ecra_01.png"
              fit="scale-down"
              style="max-height: 250px"
            />
          </q-card-section>

          <q-card-section>
            A área de pesquisa disponibilizada na área restrita existem alguns
            filtros adicionais, como o tipo de projeto e o interesse que indicou
            a cada um.
          </q-card-section>
          <q-card-section>
            O tipo de projeto é pre-preechido com o tipo de projeto que indicou
            no formulário de registo de associado da PTPC e consta da área
            pessoal.
          </q-card-section>
          <q-card-section>
            O interesse no projeto pode ser definido na newsletter enviada por
            email com a informação de novos projetos.
          </q-card-section>
          <q-card-section>
            <q-img
              src="/images/faqs/email.png"
              fit="scale-down"
              style="max-height: 250px"
            />
          </q-card-section>
          <q-card-section>
            Cada projeto existe um menu na última coluna que permite aceder a
            informação detalhada do projeto e ver quais os associados com
            interesse nesse projeto.
          </q-card-section>
          <q-card-section>
            <q-img
              src="/images/faqs/ecra_01_01.png"
              fit="scale-down"
              style="max-height: 250px"
            />
          </q-card-section>
          <q-card-section>
            Ao abrir os detalhes do projeto é possível ver todos os campos e
            também definir o interesse no projeto.
          </q-card-section>
          <q-card-section>
            <q-img
              src="/images/faqs/ecra_01_02.png"
              fit="scale-down"
              style="max-height: 450px"
            />
          </q-card-section>
          <q-card-section>
            No menu lateral ainda é possível aceder aos dados de registo de
            associado da PTPC bem como a lista de parceiros locais registados.
            Nos parceiros locais é possível atribuir uma classificação, caso já
            exista algum trabalho feito em parceria e ver as classificações que
            outros associados atribuíram.
          </q-card-section>
          <q-card-section>
            <q-img
              src="/images/faqs/ecra_03.png"
              fit="scale-down"
              style="max-height: 250px"
            />
            <br />
            <br />
            <q-img
              src="/images/faqs/ecra_04.png"
              fit="scale-down"
              style="max-height: 250px"
            />
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { mdiMenu } from "@quasar/extras/mdi-v6";
import SimpleSeparator from "src/components/SimpleSeparator.vue";

export default defineComponent({
  components: { SimpleSeparator },
  setup() {
    return {
      mdiMenu,
    };
  },
});
</script>
