import { defineStore } from 'pinia';

const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
  }),
  actions: {
    updateName(username: string) {
      this.username = username;
    },
  },
});
export default useUserStore;
