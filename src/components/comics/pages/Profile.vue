<template>
  <div>
    <h1>Perfil</h1>
    <h1>Username: {{ user.name }}</h1>
    <h1>Email: {{ user.email }}</h1>

    <button @click="logOut" class="buttons__logout">LOGOUT</button>

    <!-- Historial de Compras -->
    <div>
      <h2>Historial de Compras</h2>
      <ul v-if="purchases.length > 0">
        <li v-for="purchase in purchases" :key="purchase.id">
          {{ purchase.comic_name }}
        </li>
      </ul>
      <p v-else>No hay historial de compras.</p>
    </div>
    <div v-if="loading">Cargando historial de compras...</div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import { UserContext } from "../store/UserContext";

export default {

  data() {
    return {
      purchases: [],
      loading: false,
      error: null
    };
  },

  computed: {
    user() {
      return UserContext().userData;
    }
  },

  async created() {
    this.loading = true;
    try {
      const url = `http://localhost/api/v1/purchase-histories`;
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${UserContext().userData.token}`
        }
      });

      if (!response.ok) {
        throw new Error('Hubo un problema al obtener el historial de compras.');
      }

      const data = await response.json();

      // Almacenar los resultados en la variable de datos
      this.purchases = data.purchaseHistories;
      this.loading = false;

      console.log('Historial de compras:', this.purchases);

    } catch (error) {
      console.error('Error al obtener el historial de compras:', error.message);
      this.error = 'Error al obtener el historial de compras.';
      this.loading = false;
    }
  },

  methods: {
    logOut() {
      UserContext().logOut();
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
</style>
