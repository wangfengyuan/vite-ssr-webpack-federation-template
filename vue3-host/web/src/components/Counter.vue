<script setup lang="ts">
  const props = defineProps<{
    initial: number
  }>()
  
  const { count, inc, dec } = useCounter(props.initial)
  const router = useRouter()
  const myInc = () => {
    inc()
    router.push({ path: 'privileges', hash: '#003' })
  };
</script>

<template>
  <div>
    {{ count }}
    <button class="inc" @click="myInc()">
      +
    </button>
    <button class="dec" @click="dec()">
      -
    </button>
  </div>
</template>
  