<template>
  <q-page>
    <q-carousel
      animated
      v-model="mainSlide"
      arrows
      swipeable
      navigation
      infinite
      autoplay
      control-color="white"
      transition-prev="slide-right"
      transition-next="slide-left"
      style="height: 70vh"
    >
      <q-carousel-slide
        class="q-pa-none"
        :name="1"
        img-src="/images/mainslide6_compressed.jpg"
      >
        <div
          class="full-height full-width flex flex-center"
          style="background-color: rgba(0, 0, 0, 0.6) !important"
        >
          <div class="custom-caption">
            <h2 class="text-white animation_2">
              PROJETO <span class="text-secondary">MULTI AEC</span>
            </h2>
            <h4 class="animation_1 text-white">
              GESTÃO INTEGRADA DAS MULTILATERAIS
            </h4>
            <div class="animation_2">
              <q-btn
                rounded
                class="text-white action-btn"
                color="primary"
                label="VER PROJETOS"
                to="/Projetos"
              />
            </div>
          </div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide
        class="q-pa-none"
        :name="2"
        img-src="/images/mainslide6_compressed.jpg"
      >
        <div
          class="full-height full-width flex flex-center"
          style="background-color: rgba(0, 0, 0, 0.68) !important"
        >
          <div class="custom-caption">
            <h2 class="animation_2 text-white">
              Banco Mundial
              <span class="text-secondary">(BM)</span>
            </h2>

            <div class="animation_2">
              <q-btn
                rounded
                class="text-white action-btn"
                color="primary"
                label="APRESENTAÇÃO"
                to="/Projetos"
              />
            </div>
          </div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide
        class="q-pa-none"
        :name="3"
        img-src="/images/mainslide2_compressed.jpg"
      >
        <div
          class="full-height full-width flex flex-center"
          style="background-color: rgba(0, 0, 0, 0.68) !important"
        >
          <div class="custom-caption">
            <h2 class="animation_2 text-white">
              Banco Interamericano de Desenvolvimento
              <span class="text-secondary">(BID)</span>
            </h2>
            <div class="animation_2">
              <q-btn
                rounded
                class="text-white action-btn"
                color="primary"
                label="APRESENTAÇÃO"
                to="/Projetos"
              />
            </div>
          </div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide
        class="q-pa-none"
        :name="4"
        img-src="/images/mainslide2_compressed.jpg"
      >
        <div
          class="full-height full-width flex flex-center"
          style="background-color: rgba(0, 0, 0, 0.68) !important"
        >
          <div class="custom-caption">
            <h2 class="animation_2 text-white">
              Banco Europeu para a Reconstrução e Desenvolvimento
              <span class="text-secondary">(BERD)</span>
            </h2>
            <div class="animation_2">
              <q-btn
                rounded
                class="text-white action-btn"
                color="primary"
                label="APRESENTAÇÃO"
                to="/Projetos"
              />
            </div>
          </div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide
        class="q-pa-none"
        :name="5"
        img-src="/images/mainslide2_compressed.jpg"
      >
        <div
          class="full-height full-width flex flex-center"
          style="background-color: rgba(0, 0, 0, 0.68) !important"
        >
          <div class="custom-caption">
            <h2 class="animation_2 text-white">
              Banco Europeu de Investimento
              <span class="text-secondary">(BEI)</span>
            </h2>
            <div class="animation_2">
              <q-btn
                rounded
                class="text-white action-btn"
                color="primary"
                label="APRESENTAÇÃO"
                to="/Projetos"
              />
            </div>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>

    <SimpleSeparator />

    <div class="quote q-mb-lg">
      <div class="q-pt-xl full-width full-height flex flex-center">
        <h3 class="text-black text-center">
          Neste separador damos a informação de como empresas do sector da
          construção se podem propor como integrantes da Rede Operacional.
          <br />
          <br />
          <q-btn
            rounded
            href="/login/registo"
            class="text-white action-btn"
            color="primary"
            label="Registar"
          />
        </h3>
      </div>
    </div>

    <div class="q-ma-lg" style="margin-top: 80px">
      <div class="row items-stretch justify-center q-col-gutter-lg">
        <div>
          <Section
            :icon="mdiInformationOutline"
            link="/projeto"
            title="Projeto"
            btnText="Ver mais"
            description="O Projeto MULTI AEC é um projeto promovido pelo Cluster AEC, que visa o reforço das atividades de cooperação e parceria no sector da Arquitetura Engenharia e Construção, nos mercados das Multilaterais Financeiras."
          />
        </div>
      </div>
    </div>

    <div class="q-ma-lg" style="margin-top: 80px">
      <div class="row items-stretch justify-center q-col-gutter-lg">
        <div>
          <Section
            :icon="mdiAlphaMCircleOutline"
            link="/mercado"
            title="Mercado das Multilaterais"
            btnText="Ver mais"
            description="As Multilaterais Financeiras são Instituições Financeiras Internacionais (IFI), que promovem o desenvolvimento económico e social, em países em desenvolvimento, tendo como objetivo a redução dos níveis de pobreza nos países de operação."
          />
        </div>

        <div>
          <Section
            :icon="mdiNewspaperVariantOutline"
            link="/noticias"
            title="Noticias"
            btnText="Ver mais"
            description="Aqui apresentamos informações sobre as atividades gerais das
                  Multilaterais financeiras, com enfase para as do projeto,
                  nomeadamente (bibliografia, eventos, informações de novos
                  apoios, videos etc"
          />
        </div>

        <div>
          <Section
            :icon="mdiAccountSchoolOutline"
            link="/tutoriais"
            title="Tutoriais"
            btnText="Ver mais"
            description="Este separador congrega tudo o que esteja disponível sobre
                  Webinars, Vídeos promocionais dos bancos, passo a passo para
                  abordar os mercados das multilaterais financeiras etc…"
          />
        </div>
      </div>
    </div>

    <div class="contact_us" id="id_contact_us">
      <div style="background-color: #a6b3bf !important">
        <div class="row flex flex-center text-center q-pb-xl q-mt-xl">
          <div class="q-pt-xl">
            <q-img src="/images/logo-ptpc.png" style="width: 160px" />
            <q-img src="/images/logo-aec.png" style="width: 160px" />
            <q-img
              src="/images/pt2020.svg"
              style="width: 180px"
              class="q-mx-md"
            />
          </div>
        </div>
      </div>
    </div>

    <q-toolbar
      class="flex flex-center text-white"
      style="background-color: #a6b3bf"
    >
      <div class="q-pa-sm q-gutter-sm">
        <q-btn
          round
          type="a"
          href="https://twitter.com/"
          class="text-white"
          color="secondary"
          :icon="mdiTwitter"
        />
        <q-btn
          round
          type="a"
          href="https://facebook.com/solriaerp"
          class="text-white"
          color="secondary"
          :icon="mdiFacebook"
        />
        <q-btn
          round
          type="a"
          href="https://www.instagram.com/"
          class="text-white"
          color="secondary"
          :icon="mdiInstagram"
        />
        <q-btn
          round
          type="a"
          href="https://www.youtube.com/"
          class="text-white"
          color="secondary"
          :icon="mdiYoutube"
        />
        <q-btn
          round
          type="a"
          href="https://github.com/"
          class="text-white"
          color="secondary"
          :icon="mdiGithub"
        />
        <q-btn
          round
          type="a"
          href="mailto:suporte@solria.pt"
          class="text-white"
          color="secondary"
          :icon="mdiEmail"
        />
      </div>
    </q-toolbar>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import {
  mdiSend,
  mdiTwitter,
  mdiFacebook,
  mdiInstagram,
  mdiYoutube,
  mdiGithub,
  mdiEmail,
  mdiInformationOutline,
  mdiNewspaperVariantOutline,
  mdiAccountSchoolOutline,
  mdiAlphaMCircleOutline
} from '@quasar/extras/mdi-v6'
import Section from 'src/components/Section.vue'
import SimpleSeparator from 'src/components/SimpleSeparator.vue'

export default defineComponent({
  components: { Section, SimpleSeparator },
  setup() {
    const mainSlide = ref(1)

    return {
      mdiSend,
      mdiTwitter,
      mdiFacebook,
      mdiInstagram,
      mdiYoutube,
      mdiGithub,
      mdiEmail,
      mdiInformationOutline,
      mdiNewspaperVariantOutline,
      mdiAccountSchoolOutline,
      mdiAlphaMCircleOutline,
      mainSlide
    }
  }
})
</script>

<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 12px
  color: white

.animation_1
  -webkit-animation: bounceIn 1s ease-in 800ms both
  animation: bounceIn 1s ease-in 800ms both

.animation_2
  -webkit-animation: flipInX 2s ease-in-out 800ms both
  animation: flipInX 1s ease-in-out 800ms both

.animation_3
  -webkit-animation: lightSpeedIn 1s ease-in 800ms both
  animation: lightSpeedIn 1s ease-in 800ms both
</style>
