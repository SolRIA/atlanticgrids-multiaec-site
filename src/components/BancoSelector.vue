<template>
  <q-select
    v-model="bank"
    :options="bancos"
    label="Banco"
    outlined
    dense
    option-value="id"
    option-label="nome"
    emit-value
    map-options
    :clearable="clearable"
  >
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section avatar>
          <img :src="logobanco(scope.opt.logo)" width="40" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ scope.opt.nome }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { apiPublicUrl } from 'boot/api'

export default defineComponent({
  name: 'BancoSelector',
  props: {
    bancos: {
      type: Array,
      required: true
    },
    banco: {
      required: true
    },
    clearable: {
      type: Boolean,
      required: false
    }
  },
  emits: ['banco_updated'],
  setup(props, { emit }) {
    const logobanco = (logo) => {
      return apiPublicUrl(logo)
    }
    const bank = ref(
      props.banco !== null && props.banco.id !== undefined
        ? props.banco.id
        : props.banco
    )

    watch(bank, (current, old) => {
      if (current !== old) emit('banco_updated', current)
    })
    watch(
      () => props.banco,
      (_current, _old) => {
        if (props.banco !== undefined) {
          if (
            props.banco !== null &&
            props.banco.id != undefined &&
            bank.value !== props.banco.id
          )
            bank.value = props.banco.id
          else bank.value = props.banco
        }
      }
    )
    return {
      bank,
      logobanco
    }
  }
})
</script>
