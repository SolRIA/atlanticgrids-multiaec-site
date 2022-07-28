<template>
  <q-page padding>
    <q-card class="card-title">
      <q-card-section>
        <h3>{{ $t('html.multiaec.title') }}</h3>
      </q-card-section>
      <SimpleSeparator />
    </q-card>

    <q-card class="q-mt-lg">
      <q-card-section>
        <p>{{ $t('html.multiaec.p1') }}</p>

        <ul>
          <li>{{ $t('html.multiaec.obj1') }}</li>
          <li>{{ $t('html.multiaec.obj2') }}</li>
          <li>{{ $t('html.multiaec.obj3') }}</li>
          <li>{{ $t('html.multiaec.obj4') }}</li>
          <li>{{ $t('html.multiaec.obj5') }}</li>
          <li>{{ $t('html.multiaec.obj6') }}</li>
          <li>{{ $t('html.multiaec.obj7') }}</li>
          <li>{{ $t('html.multiaec.obj8') }}</li>
          <li>{{ $t('html.multiaec.obj9') }}</li>
        </ul>

        <p>{{ $t('html.multiaec.p2') }}</p>
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
export default {
  components: { SimpleSeparator },
  setup() {
    return {
      mdiHome
    }
  }
}
</script>
