<template lang="">
  <div>
    vue2+webpack header组件 {{name}}
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    }
  }
}
</script>