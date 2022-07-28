<template>
  <q-page padding>
    <q-card class="card-title">
      <q-card-section>
        <h3>
          <q-avatar rounded>
            <q-img :src="logobanco('imagens/bancos/eib.png')" />
          </q-avatar>
          {{ $t('html.bank.bei') }} ({{ $t('html.bank.beiInitials') }})
        </h3>
      </q-card-section>
      <SimpleSeparator />
    </q-card>

    <q-card class="q-mt-md">
      <q-card-section>
        <p>
          {{ $t('html.bankBei.p1') }}
        </p>
        <p>
          {{ $t('html.bankBei.p2') }}
        </p>
        <p>
          {{ $t('html.bankBei.p3') }}
        </p>
        <ul>
          <li>
            {{ $t('html.bankBei.p4') }}
          </li>
          <li>
            {{ $t('html.bankBei.p5') }}
          </li>
          <li>
            {{ $t('html.bankBei.p6') }}
          </li>
        </ul>
        <p>
          {{ $t('html.bankBei.p7') }}
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
