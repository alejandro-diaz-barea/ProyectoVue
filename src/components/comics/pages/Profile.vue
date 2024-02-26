<template>
    <div>
      <h1>Perfil</h1>
      <h1>Username: {{ user.name }}</h1>
      <h1>Email: {{ user.email }}</h1>
      <h1>User ID: {{ user.id }}</h1>
      <h1>User ID: {{ user.token }}</h1>
      <button @click="logOut" class="buttons__logout">LOGOUT</button>
    </div>
  </template>
  
  <script>
  import { UserContext } from "../store/UserContext";
  
  export default {
    computed: {
      user() {
        return UserContext().userData;
      },
    },
    methods: {
      logOut() {
        UserContext().logOut();
        this.$router.push('/');
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  