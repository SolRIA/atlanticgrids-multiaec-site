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
      transition-next="slide-left" class="window-height">
      <q-carousel-slide
        class="q-pa-none"
        :name="1"
        img-src="/images/mainslide3_compressed.jpg">
        <div
          class="full-height full-width flex flex-center"
          style="background-color: rgba(0, 0, 0, 0.60) !important">
          <div class="custom-caption">
            <h2 class="text-white animation_2">
              PROJETO <span :style="'color:' + theme_color">MULTI AEC</span>
            </h2>
            <h4 class="animation_1 text-white">
              GESTÃO INTEGRADA DAS MULTILATERAIS
            </h4>
            <div class="animation_2">
              <q-btn
                size="xl"
                :style="'background:' + theme_color + '; color: white'"
                label="VER PROJETOS" 
                to="/Projetos"/>
            </div>
          </div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide
        class="q-pa-none"
        :name="2"
        img-src="/images/mainslide6_compressed.jpg">
        <div
          class="full-height full-width flex flex-center"
          style="background-color: rgba(0, 0, 0, 0.68) !important">
          <div class="custom-caption">
            <h2 class="animation_2 text-white">
              <span :style="'color:' + theme_color">PTPC</span>
            </h2>
            <h4 class="animation_1 text-white">
              Plataforma Tecnológica Portuguesa da Construção
            </h4>
            <div class="animation_2">
              <q-btn
                size="xl"
                :style="'background:' + theme_color + '; color: white'"
                label="VER PROJETOS" 
                to="/Projetos"/>
            </div>
          </div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide
        class="q-pa-none"
        :name="3"
        img-src="/images/mainslide2_compressed.jpg">
        <div
          class="full-height full-width flex flex-center"
          style="background-color: rgba(0, 0, 0, 0.68) !important">
          <div class="custom-caption">
            <h2 class="animation_2 text-white">
              <span :style="'color:' + theme_color">CLUSTER AEC</span>
            </h2>
            <h4 class="animation_1 text-white">
              Arquitetura, Engenharia e Construção
            </h4>
            <div class="animation_2">
              <q-btn
                size="xl"
                :style="'background:' + theme_color + '; color: white'"
                label="VER PROJETOS" 
                to="/Projetos" />
            </div>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>

    <div class="row justify-center">
      <div class="col-lg-2 offset-lg-1 col-md-4 col-sm-12">
        <q-card
          class="q-pa-sm flex flex-center text-center box-shadow"
          style="margin: 40px">
          <q-card-section>
            <q-icon
              size="110px"
              :name="mdiBallot"
              :style="'color:' + theme_color"/>
            <div class="text-h6">Web &nbsp;Design</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </q-card-section>
        </q-card>
      </div>

      <div class="col-lg-1"></div>

      <div class="col-lg-2 col-md-4 col-sm-12">
        <q-card
          class="q-pa-sm flex flex-center text-center box-shadow"
          style="margin: 40px">
          <q-card-section>
            <q-icon
              size="110px"
              :name="mdiViewComfy"
              :style="'color:' + theme_color"/>
            <div class="text-h6">Graphics Design</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </q-card-section>
        </q-card>
      </div>

      <div class="col-lg-1"></div>

      <div class="col-lg-2 col-md-4 col-sm-12">
        <q-card
          class="q-pa-sm flex flex-center text-center box-shadow"
          style="margin: 40px">
          <q-card-section>
            <q-icon
              size="110px"
              :name="mdiVuejs"
              :style="'color:' + theme_color"/>
            <div class="text-h6">Vue Theme</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </q-card-section>
        </q-card>
      </div>

      <div class="col-lg-1"></div>
    </div>

    <div class="quote">
      <div
        class="q-pt-xl full-width full-height flex flex-center"
        style="background-color: #000000ad !important">
        <h3 class="text-white text-center">
          Lorem ipsum dolor sit amet, consectetur <br />adipiscing elit, sed
          do eiusmod tempor incididunt ut <br />
          labore et dolore magna aliqua.
          <br />
          <br />
          <q-btn
            type="a"
            href="https://www.solria.pt"
            size="lg"
            :style="'background:' + theme_color + '; color: white'"
            label="Support Me"
          />
        </h3>
      </div>
    </div>

    <div class="row" id="id_about_us">
      <div class="col-md-12 col-lg-12 col-xs-12 col-sm-12">
        <h5 class="text-center">
          About Us
          <br />
          <span class="text-center text-grey text-h6">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
        </h5>
      </div>
    </div>

    <div class="contact_us" id="id_contact_us">
      <div style="background-color: #000000ad !important">
        <div class="row" id="id_news">
          <div class="col-md-12 col-lg-12 col-xs-12 col-sm-12">
            <h5 class="text-center text-white">
              Contact Us
              <br />
              <span class="text-center text-grey text-h6"
                >Lorem ipsum dolor sit amet, consectetur adipiscing
                elit.</span
              >
            </h5>
          </div>
        </div>
        <div class="row flex q-pb-md">
          <div class="col-sm-6 col-xs-12 q-gutter-lg q-px-md q-pb-none q-ma-none">
            <q-input bg-color="white" outlined label="Nome *"/>
            <q-input bg-color="white" outlined label="Email *"/>
            <q-input bg-color="white" outlined label="Contato *"/>
          </div>
          <div
            class="col-sm-6 col-xs-12 q-gutter-lg q-px-md q-pb-none q-ma-none">
            <q-input
              class=""
              type="textarea"
              bg-color="white"
              outlined
              label="Mensagem *">
            </q-input>
          </div>
        </div>
        <div class="row flex flex-center text-center q-pb-xl q-mt-md">
          <div class="col-sm-12">
            <q-btn
              size="xl"
              :icon="mdiSend"
              :style="'background:' + theme_color + '; color: white'"
              label="Enviar mensagem"/>
          </div>
        </div>
      </div>
    </div>
    
    <q-toolbar
      class="flex flex-center text-white"
      style="background-color: #1c1b21"
      :style="'border-top: 2px solid ' + theme_color">
      <div class="q-pa-sm q-gutter-sm">
        <q-btn
          round
          type="a"
          href="https://twitter.com/"
          :style="'background:' + theme_color + '; color: white !important;'"
          :icon="mdiTwitter"/>
        <q-btn
          round
          type="a"
          href="https://facebook.com/solriaerp"
          :style="'background:' + theme_color + '; color: white !important;'"
          :icon="mdiFacebook"/>
        <q-btn
          round
          type="a"
          href="https://www.instagram.com/"
          :style="'background:' + theme_color + '; color: white !important;'"
          :icon="mdiInstagram"/>
        <q-btn
          round
          type="a"
          href="https://www.youtube.com/"
          :style="'background:' + theme_color + '; color: white !important;'"
          :icon="mdiYoutube"/>
        <q-btn
          round
          type="a"
          href="https://github.com/"
          :style="'background:' + theme_color + '; color: white !important;'"
          :icon="mdiGithub"/>
        <q-btn
          round
          type="a"
          href="mailto:suporte@solria.pt"
          :style="'background:' + theme_color + '; color: white !important;'"
          :icon="mdiEmail"/>
      </div>
    </q-toolbar>

  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { config } from 'boot/config.js'
import { mdiBallot, mdiViewComfy, mdiVuejs, mdiSend, mdiTwitter, mdiFacebook, mdiInstagram, mdiYoutube, mdiGithub, mdiEmail } from '@quasar/extras/mdi-v5'

export default defineComponent({
  setup () {
    const mainSlide = ref(1)

    return {
      mdiBallot,
      mdiViewComfy,
      mdiVuejs,
      mdiSend,
      mdiTwitter,
      mdiFacebook,
      mdiInstagram,
      mdiYoutube,
      mdiGithub,
      mdiEmail,
      theme_color: config.theme_color,
      bg_color: config.bg_color,
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
