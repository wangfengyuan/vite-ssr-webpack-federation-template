<template>
  <div>
    home page
    <br/>
    <p @click="goAbout">go about page</p>
    <Counter />
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
const goAbout = () => router.push('./about')
</script>
<route lang="yaml">
meta:
  layout: default
  wrapClass: home
</route>
