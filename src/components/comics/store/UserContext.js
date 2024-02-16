import { defineStore } from 'pinia';

export const UserContext = defineStore('userState', {
  state: () => ({
    user: false,
  }),
  actions: {
    logIn() {
      this.user = true;
    },
    logOut() {
      this.user = false;
    },
  },
});
