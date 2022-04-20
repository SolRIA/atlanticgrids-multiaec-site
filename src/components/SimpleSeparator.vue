<template>
  <div style="height: 5px">
    <div class="row">
      <div style="height: 5px" class="col-4 bg-primary"></div>
      <div style="height: 5px" class="col-4 bg-secondary"></div>
      <div style="height: 5px" class="col-4 bg-accent"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SimpleSeparator'
})
</script>
