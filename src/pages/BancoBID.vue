<template>
  <q-page padding>
    <q-card class="card-title">
      <q-card-section>
        <h3>
          <q-avatar rounded>
            <q-img :src="logobanco('imagens/bancos/iadb.png')" />
          </q-avatar>
          {{ $t('html.bank.bid') }} ({{ $t('html.bank.bidInitials') }})
        </h3>
      </q-card-section>
      <SimpleSeparator />
    </q-card>

    <q-card class="q-mt-md">
      <q-card-section>
        <p>
          {{ $t('html.bankBid.p1') }}
        </p>
        <p>
          {{ $t('html.bankBid.p2') }}
        </p>
        <p>
          {{ $t('html.bankBid.p3') }}
        </p>
        <p>{{ $t('html.bankBid.p4') }}</p>
        <ol>
          <li>{{ $t('html.bankBid.obj1') }}</li>
          <li>{{ $t('html.bankBid.obj2') }}</li>
          <li>{{ $t('html.bankBid.obj3') }}</li>
        </ol>
        <p>{{ $t('html.bankBid.p5') }}</p>
        <p>{{ $t('html.bankBid.p6') }}</p>
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
