<template>
  <q-page padding>
    <q-card class="card-title">
      <q-card-section>
        <h3>{{ $t('html.project.title') }}</h3>
      </q-card-section>
      <SimpleSeparator />
    </q-card>

    <q-card class="q-mt-md">
      <q-card-section>
        <p>
          {{ $t('html.project.p1') }}
        </p>
        <ul>
          <li>{{ $t('html.bank.bm') }} ({{ $t('html.bank.bmInitials') }});</li>
          <li>
            {{ $t('html.bank.bid') }} ({{ $t('html.bank.bidInitials') }});
          </li>
          <li>
            {{ $t('html.bank.berd') }} ({{ $t('html.bank.berdInitials') }});
          </li>
          <li>
            {{ $t('html.bank.bei') }} ({{ $t('html.bank.beiInitials') }});
          </li>
        </ul>
        <p>
          {{ $t('html.project.p2') }}
        </p>
        <p>
          {{ $t('html.project.p3') }}
        </p>

        <ul>
          <li>
            {{ $t('html.project.obj1') }}
          </li>
          <li>
            {{ $t('html.project.obj2') }}
          </li>
          <li>{{ $t('html.project.obj3') }}</li>
          <li>
            {{ $t('html.project.obj4') }}
          </li>
          <li>{{ $t('html.project.obj5') }}</li>
        </ul>
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
