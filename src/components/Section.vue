<template>
  <q-card
    class="bg-grey-1 col-xs-12 col-sm-6 col-md-4 col-lg-2 q-pb-lg"
    style="width: 350px"
  >
    <q-card-section>
      <!-- <div class="flex flex-center text-center"> -->
      <!-- <q-icon :name="icon" size="5rem" color="primary" /> -->
      <q-avatar
        color="primary"
        text-color="white"
        :icon="icon"
        size="6rem"
        font-size="4rem"
        class="absolute-center shadow-10"
        style="margin-top: -140px"
      />
      <div class="flex flex-center text-center" style="height: 235px">
        <h5>{{ title }}</h5>
        <p>{{ description }}</p>
      </div>
    </q-card-section>

    <q-card-actions align="center">
      <q-btn
        rounded
        outline
        class="action-btn btn-white"
        :label="btnText"
        :to="link"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Section',
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    btnText: { type: String, required: true },
    link: { type: String, required: true }
  },
  setup() {
    return {}
  }
})
</script>
