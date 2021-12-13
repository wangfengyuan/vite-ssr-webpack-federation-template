<template>
  <div>
    <div>about page</div>
    <input type="text" v-model="name">
    <button @click="changeUserName">submit name</button>
  </div>
</template>
<script lang="ts" setup>
import useUserStore from '~/stores/user';
const userStore = useUserStore();
const name = ref('');
const changeUserName = () => userStore.updateName(name.value);
</script>
<route lang="yaml">
meta:
  layout: default
  wrapClass: about
</route>
