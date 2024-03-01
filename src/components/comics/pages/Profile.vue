<template>
  <section class="profile">
    <!-- Datos del Usuario -->
    <article class="profile__user">
      <img src="../../../assets/profile-user.png" class="profile__user__image" alt="Profile Image">
      <div class="profile__user__details">
        <h2 class="profile__user__name">{{ user.name }}</h2>
        <p class="profile__user__email">{{ user.email }}</p>
        <p class="profile__user__password">**************</p>
        <button @click="logOut" class="profile__user__logout">Logout</button>
      </div>
    </article>

    <!-- Historial de Compras -->
    <aside class="profile__history">
      <h2 class="profile__history__title">Purchase History</h2>
      <ul v-if="purchases.length > 0" class="profile__history__list">
        <li v-for="purchase in purchases" :key="purchase.id" class="profile__history__item">
          {{ purchase.comic_name }}
        </li>
      </ul>
      <p v-else class="profile__history__empty">No hay historial de compras.</p>
    </aside>

    <!-- Mensajes de Carga y Error -->
    <div v-if="loading" class="profile__loading">Cargando historial de compras...</div>
    <div v-if="error" class="profile__error">{{ error }}</div>
  </section>
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
.profile {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 70vh;

}

.profile__user {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.profile__user__image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.profile__user__details {
  text-align: left;
  margin-top: 20px;
}

.profile__user__name {
  font-size: 1.5rem;
  margin-bottom: 5px;
  margin-top: 20px;
}

.profile__user__email,
.profile__user__password {
  font-size: 1rem;
  margin-bottom: 5px;
  margin-top: 20px;
  text-align: center;
}

.profile__user__logout {
  background-color: #cacaca;
  color: #000000;
  border: none;
  padding: 10px 20px;
  font-size: 20px;
  border-radius: 15px;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
}

.profile__history {
  width: 50%;
}

.profile__history__title {
  font-size: 1.5rem;
  margin-bottom: 10px;
  text-align: center;
}

.profile__history__list {
  padding: 0;
  margin: 0;
  width: 300px;
  margin: 0 auto;
  margin-top: 80px;

}

.profile__history__item {
  font-size: 1rem;
  margin-bottom: 10px;

}

.profile__history__empty {
  font-size: 1rem;
  font-style: 'Roboto';
  color: #888;
}

.profile__loading,
.profile__error {
  font-size: 1rem;
  margin-top: 20px;
  color: red;
}

@media screen and (max-width: 768px) {
  .profile {
    flex-direction: column;
    align-items: center;
  }

  .profile__user,
  .profile__history {
    width: 100%;
    margin-bottom: 20px;
  }

  .profile__user__logout {
    margin-top: 20px;
  }

  .profile__history__box {
    height: auto;
  }
}
</style>
