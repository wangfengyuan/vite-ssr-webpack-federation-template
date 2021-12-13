<template lang="">
  <div>
    <button type="button" @click="decrease">-1</button>
    count is: {{ counter }}
    <button type="button" @click="increase">+1</button>
  </div>
</template>
<script lang='ts'>
import { useCounter } from '~/composables';
export default defineComponent({
  name: 'Counter',
  setup() {
    return { 
      ...toRefs(useCounter()),
    }
  }
})
</script>
<style lang="">
  
</style>