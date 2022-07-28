<template>
  <q-page padding>
    <q-card class="card-title">
      <q-card-section>
        <h3>
          <q-avatar rounded>
            <q-img :src="logobanco('imagens/bancos/wb.png')" />
          </q-avatar>
          {{ $t('html.bank.bm') }} ({{ $t('html.bank.bmInitials') }})
        </h3>
      </q-card-section>
      <SimpleSeparator />
    </q-card>

    <q-card class="q-mt-md">
      <q-card-section>
        <p>{{ $t('html.bankBm.p1') }}</p>
        <p>{{ $t('html.bankBm.p2') }}</p>
        <ol>
          <li>
            {{ $t('html.bankBm.p3') }}
            <ul>
              <li>{{ $t('html.bankBm.obj1') }}</li>
            </ul>
          </li>

          <li>
            {{ $t('html.bankBm.p4') }}
            <ul>
              <li>{{ $t('html.bankBm.obj2') }}</li>
            </ul>
          </li>

          <li>
            {{ $t('html.bankBm.p5') }}
            <ul>
              <li>{{ $t('html.bankBm.obj3') }}</li>
            </ul>
          </li>

          <li>
            {{ $t('html.bankBm.p6') }}
            <ul>
              <li>{{ $t('html.bankBm.obj4') }}</li>
            </ul>
          </li>

          <li>
            {{ $t('html.bankBm.p7') }}
            <ul>
              <li>{{ $t('html.bankBm.obj5') }}</li>
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
