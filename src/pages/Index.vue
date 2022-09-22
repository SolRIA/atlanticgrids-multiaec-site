<template>
  <q-page>
    <q-carousel animated v-model="mainSlide" arrows swipeable navigation infinite autoplay control-color="white" transition-prev="slide-right" transition-next="slide-left" style="height: 70vh">
      <q-carousel-slide class="q-pa-none" :name="1" img-src="/images/mainslide6_compressed.jpg">
        <div class="full-height full-width flex flex-center" style="background-color: rgba(0, 0, 0, 0.6) !important">
          <div class="custom-caption">
            <h2 class="text-white animation_2">
              {{ $t('html.index.project') }}
              <span class="text-secondary">MULTI AEC</span>
            </h2>
            <h4 class="animation_1 text-white">
              {{ $t('html.index.multiaec') }}
            </h4>
          </div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide class="q-pa-none" :name="2" img-src="/images/mainslide6_compressed.jpg">
        <div class="full-height full-width flex flex-center" style="background-color: rgba(0, 0, 0, 0.68) !important">
          <div class="custom-caption">
            <h2 class="animation_2 text-white">
              {{ $t('html.bank.bm') }}
              <span class="text-secondary">({{ $t('html.bank.bmInitials') }})</span>
            </h2>

            <div class="animation_2">
              <q-btn rounded class="text-white action-btn" color="primary" :label="$t('html.index.presentation')" to="/banco-bm" />
            </div>
          </div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide class="q-pa-none" :name="3" img-src="/images/mainslide2_compressed.jpg">
        <div class="full-height full-width flex flex-center" style="background-color: rgba(0, 0, 0, 0.68) !important">
          <div class="custom-caption">
            <h2 class="animation_2 text-white">
              {{ $t('html.bank.bid') }}
              <span class="text-secondary">({{ $t('html.bank.bidInitials') }})</span>
            </h2>
            <div class="animation_2">
              <q-btn rounded class="text-white action-btn" color="primary" :label="$t('html.index.presentation')" to="/banco-bid" />
            </div>
          </div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide class="q-pa-none" :name="4" img-src="/images/mainslide2_compressed.jpg">
        <div class="full-height full-width flex flex-center" style="background-color: rgba(0, 0, 0, 0.68) !important">
          <div class="custom-caption">
            <h2 class="animation_2 text-white">
              {{ $t('html.bank.berd') }}
              <span class="text-secondary">({{ $t('html.bank.berdInitials') }})</span>
            </h2>
            <div class="animation_2">
              <q-btn rounded class="text-white action-btn" color="primary" :label="$t('html.index.presentation')" to="/banco-berd" />
            </div>
          </div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide class="q-pa-none" :name="5" img-src="/images/mainslide2_compressed.jpg">
        <div class="full-height full-width flex flex-center" style="background-color: rgba(0, 0, 0, 0.68) !important">
          <div class="custom-caption">
            <h2 class="animation_2 text-white">
              {{ $t('html.bank.bei') }}
              <span class="text-secondary">({{ $t('html.bank.beiInitials') }})</span>
            </h2>
            <div class="animation_2">
              <q-btn rounded class="text-white action-btn" color="primary" :label="$t('html.index.presentation')" to="/banco-bei" />
            </div>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>

    <SimpleSeparator />

    <div class="q-ma-lg" style="margin-top: 80px">
      <div class="row items-stretch justify-center q-col-gutter-lg">
        <div>
          <Section :icon="mdiInformationOutline" link="/projeto" :title="$t('html.index.projectLc')" :btnText="$t('html.index.more')" :description="$t('html.index.multiaecDesc')" />
        </div>
      </div>
    </div>

    <div class="q-ma-lg" style="margin-top: 80px">
      <div class="row items-stretch justify-center q-col-gutter-lg">
        <div>
          <Section :icon="mdiAlphaMCircleOutline" link="/mercado" :title="$t('html.index.multiaecMarket')" :btnText="$t('html.index.more')" :description="$t('html.index.multiaecMarketDesc')" />
        </div>

        <div>
          <Section :icon="mdiNewspaperVariantOutline" link="/noticias" :title="$t('html.index.news')" :btnText="$t('html.index.more')" :description="$t('html.index.newsDesc')" />
        </div>

        <div>
          <Section :icon="mdiAccountSchoolOutline" link="/tutoriais" :title="$t('html.index.tutoriais')" :btnText="$t('html.index.more')" :description="$t('html.index.tutoriaisDesc')" />
        </div>
      </div>
    </div>

    <div id="register" class="q-pa-lg">
      <h4 class="text-center">{{ $t('html.index.associate.name') }}</h4>
      <div class="row q-col-gutter-lg q-ma-md">
        <div class="col-xs-12 col-md-6">
          <q-img src="/images/associates.jpg" fit="scale-down" />
        </div>

        <div class="col-xs-12 col-md-6 self-center">
          <p class="text-body1">
            {{ $t('html.index.associate.description') }}
          </p>

          <div class="row justify-center">
            <q-btn rounded href="/login/registo" class="text-white action-btn" color="primary" :label="$t('html.index.partner.register')" />
          </div>
        </div>
      </div>

      <h4 class="text-center">{{ $t('html.index.partner.name') }}</h4>
      <div class="row q-col-gutter-lg q-ma-md">
        <div class="col-xs-12 col-md-6 self-center">
          <p class="text-body1">
            {{ $t('html.index.partner.description') }}
          </p>

          <div class="row justify-center">
            <q-btn rounded href="/login/registo-parceiro" class="text-white action-btn" color="primary" :label="$t('html.index.partner.register')" />
          </div>
        </div>

        <div class="col-xs-12 col-md-6">
          <q-img src="/images/partners.jpg" fit="scale-down" />
        </div>
      </div>
    </div>

    <div class="contact_us" id="id_contact_us">
      <div style="background-color: #a6b3bf !important">
        <div class="row flex flex-center text-center q-pb-xl q-mt-xl">
          <div class="q-pt-xl">
            <q-img src="/images/logo-ptpc.png" style="width: 160px" />
            <q-img src="/images/logo-aec.png" style="width: 160px" />
            <q-img src="/images/pt2020.svg" style="width: 180px" class="q-mx-md" />
          </div>
        </div>
      </div>
    </div>

    <q-toolbar class="flex flex-center text-white" style="background-color: #a6b3bf">
      <div class="q-pa-sm q-gutter-sm">
        <q-btn round type="a" href="https://twitter.com/" class="text-white" color="secondary" :icon="mdiTwitter" />
        <q-btn round type="a" href="https://facebook.com/solriaerp" class="text-white" color="secondary" :icon="mdiFacebook" />
        <q-btn round type="a" href="https://www.instagram.com/" class="text-white" color="secondary" :icon="mdiInstagram" />
        <q-btn round type="a" href="https://www.youtube.com/" class="text-white" color="secondary" :icon="mdiYoutube" />
        <q-btn round type="a" href="https://github.com/" class="text-white" color="secondary" :icon="mdiGithub" />
        <q-btn round type="a" href="mailto:suporte@solria.pt" class="text-white" color="secondary" :icon="mdiEmail" />
      </div>
    </q-toolbar>
  </q-page>
</template>

<script>
import { mdiSend, mdiTwitter, mdiFacebook, mdiInstagram, mdiYoutube, mdiGithub, mdiEmail, mdiInformationOutline, mdiNewspaperVariantOutline, mdiAccountSchoolOutline, mdiAlphaMCircleOutline } from '@quasar/extras/mdi-v6'
import { defineComponent, ref } from 'vue'
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
