<script setup lang="ts">
import { useRouter } from 'vue-router';
import useUserStore from '~/stores/user';
const userStore = useUserStore();
</script>
<template>
  <div class="wrap" :class="useRouter().currentRoute.value.meta.wrapClass">
    <div id="header"></div>
    <Header :name="userStore.username" />
    <router-view />
    <div id="footer"></div>
    <Footer />
  </div>
</template>
