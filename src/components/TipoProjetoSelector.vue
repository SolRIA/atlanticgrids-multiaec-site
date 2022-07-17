<template>
  <q-select
    v-model="projectType"
    :options="tipos"
    label="Tipos de projetos"
    option-label="nome"
    option-value="id"
    multiple
    emit-value
    map-options
    outlined
    :clearable="clearable"
    :dense="dense"
  >
    <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
      <q-item
        v-bind="itemProps"
        :disable="opt.pai_id === 0"
        v-bind:class="opt.pai_id === 0 ? 'header-filter-type' : ''"
      >
        <q-item-section>
          <q-item-label>{{ opt.nome }}</q-item-label>
        </q-item-section>
        <q-item-section side v-if="opt.pai_id > 0">
          <q-checkbox
            :model-value="selected"
            @update:model-value="toggleOption(opt)"
          />
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'TipoProjectoSelector',
  props: {
    tipos: {
      type: Array,
      required: true
    },
    tipo: {
      required: true
    },
    clearable: {
      type: Boolean,
      required: false
    },
    dense: {
      type: Boolean,
      required: false
    }
  },
  emits: ['tipo_projeto_updated'],
  setup(props, { emit }) {
    const projectType = ref(Object.freeze(props.tipo))

    watch(projectType, (current, _o) => {
      emit('tipo_projeto_updated', current)
    })
    watch(
      () => props.tipo,
      (current, _o) => {
        console.log('tipo:', current)
        projectType.value = current
      }
    )
    return {
      projectType
    }
  }
})
</script>

<style scoped>
.header-filter-type {
  font-size: 18px;
  color: black;
  opacity: 1 !important;
}
</style>
