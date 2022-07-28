<template>
  <q-page padding>
    <q-card class="card-title">
      <q-card-section>
        <h3>
          <q-avatar rounded>
            <q-img :src="logobanco('imagens/bancos/ebrd.png')" />
          </q-avatar>
          {{ $t('html.bank.berd') }} ({{ $t('html.bank.berdInitials') }})
        </h3>
      </q-card-section>
      <SimpleSeparator />
    </q-card>

    <q-card class="q-mt-md">
      <q-card-section>
        <p>
          {{ $t('html.bankBerd.p1') }}
        </p>
        <p>
          {{ $t('html.bankBerd.p2') }}
        </p>
        <p>
          {{ $t('html.bankBerd.p3') }}
        </p>
        <p>
          {{ $t('html.bankBerd.p4') }}
        </p>
        <p>{{ $t('html.bankBerd.p5') }}</p>
        <ul>
          <li>{{ $t('html.bankBerd.obj1') }}</li>
          <li>{{ $t('html.bankBerd.obj2') }}</li>
          <li>{{ $t('html.bankBerd.obj3') }}</li>
          <li>{{ $t('html.bankBerd.obj4') }}</li>
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
