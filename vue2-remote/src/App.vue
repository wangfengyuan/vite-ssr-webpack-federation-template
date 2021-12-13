<template lang="">
  <div>
    <NavHeader/>
    内容区
    <Footer/>
  </div>
</template>
<script>
import NavHeader from "./components/NavHeader.vue";
import Footer from "./components/Footer.vue";
export default {
  name: 'App',
  components: {
    NavHeader,
    Footer,
  }
}
</script>
<style lang="">
  
</style>