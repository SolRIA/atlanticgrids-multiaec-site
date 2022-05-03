<template>
  <q-btn-toggle
    v-model="a"
    no-caps
    rounded
    clearable
    toggle-color="grey-8"
    :options="accoes"
  >
    <template v-slot:one>
      <div class="row items-center">
        <div class="col-12 text-center">Com interesse</div>
        <div style="height: 4px" class="col-12 bg-accent"></div>
      </div>
    </template>
    <template v-slot:two>
      <div class="row items-center">
        <div class="col-12 text-center">Sem interesse</div>
        <div style="height: 4px" class="col-12 bg-primary"></div>
      </div>
    </template>
    <template v-slot:three>
      <div class="row items-center">
        <div class="col-12 text-center">Precisa apoio</div>
        <div style="height: 4px" class="col-12 bg-warning"></div>
      </div>
    </template>
    <template v-slot:four>
      <div class="row items-center">
        <div class="col-12 text-center">Não respondeu</div>
        <div style="height: 4px" class="col-12 bg-blue-grey-2"></div>
      </div>
    </template>
    <template v-slot:five>
      <div class="row items-center">
        <div class="col-12 text-center">Abriu link</div>
        <div style="height: 4px" class="col-12 bg-info"></div>
      </div>
    </template>
  </q-btn-toggle>
</template>

<script>
import { defineComponent, ref, watch, onMounted } from 'vue'
import { accoes } from 'src/models/accoes-projetos'
export default defineComponent({
  name: 'AccoesAll',
  props: {
    accao: { type: Number, required: true }
  },
  emits: ['altera_accao'],
  setup(props, { emit }) {
    const a = ref(0)

    onMounted(() => {
      a.value = props.accao
    })

    watch(a, (current, _old) => {
      emit('altera_accao', current)
    })

    return {
      a,
      accoes
    }
  }
})
</script>
