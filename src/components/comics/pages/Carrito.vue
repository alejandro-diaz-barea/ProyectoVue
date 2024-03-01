<template>
  <section class="shopping-cart">
    <h1 class="shopping-cart__title">Shopping Cart</h1>
    <article class="shopping-cart__comics-list">
      <CardComponent
        v-for="comic in comics"
        :key="comic.id"
        :card="comic"
        :isInCart="true"
        @removeFromCart="removeFromCart"
        @updateQuantity="updateQuantity"
        @buyComic="buyComic(comic)"
      />
    </article>
  </section>
</template>

<script>
import { useComicStore } from '../helpers/ComprarComic';
import { UserContext } from "../store/UserContext";
import CardComponent from '../components/CardComponent.vue';

export default {
  components: { CardComponent },

  data() {
    return {
      comics: []
    };
  },

  async created() {
    try {
      let carritoId = UserContext().userData.carrito_id;

      if (!carritoId) {
        console.error('No se encontró carritoId en el UserContext');
        return;
      }

      const url = `http://localhost/api/v1/carritos/${carritoId}/comics`;
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${UserContext().userData.token}`
        }
      });

      if (!response.ok) {
        throw new Error('Hubo un problema al obtener los cómics del carrito.');
      }

      const data = await response.json();
      
      this.comics = data.comics.map(comic => ({
        ...comic,
        quantity: comic.pivot.cantidad,
        completed: comic.pivot.completed
      }));
      console.log(data);

    } catch (error) {
      console.error('Error al obtener los cómics del carrito:', error.message);
    }
  },

  methods: {
    async removeFromCart(card) {
      try {
        const carritoId = UserContext().userData.carrito_id;
        const comicId = card.id;

        const url = `http://localhost/api/v1/carritos/${carritoId}/comics/${comicId}`;
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${UserContext().userData.token}`
          }
        });

        if (!response.ok) {
          throw new Error('Hubo un problema al eliminar el cómic del carrito.');
        }

        this.comics = this.comics.filter(comic => comic.id !== comicId);
        console.log('Cómic eliminado del carrito exitosamente');

      } catch (error) {
        console.error('Error al eliminar el cómic del carrito:', error.message);
      }
    },

    updateQuantity(selectedQuantity) {
      // Método para actualizar la cantidad en el carrito
      console.log('Nueva cantidad seleccionada:', selectedQuantity);
    },

    buyComic(comic) {
      console.log(comic)
      useComicStore().setSelectedComic(comic); // Guardar el cómic seleccionado en la tienda
      this.$router.push("/perfil/carrito/compra");
    }
  }
};
</script>


<style scoped>
.shopping-cart {
  text-align: center;
  padding: 20px;
}

.shopping-cart__title {
  font-size: 2rem;
  margin-bottom: 20px;
}

.shopping-cart__comics-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  max-width: 1200px;
}

</style>
