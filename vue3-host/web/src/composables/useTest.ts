export function useTest() {
  const counter = ref(0);
  return {
    counter,
    increase: () => counter.value++,
    decrease: () => counter.value--,
  }
}