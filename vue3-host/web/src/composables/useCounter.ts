export function useCounter() {
  const counter = ref(0);
  return {
    counter,
    increase: () => counter.value++,
    decrease: () => counter.value--,
  }
}