<template>
  <div>
    <h1>Carrito de Compras</h1>
    <div class="comics-list">
      <CardComponent
        v-for="comic in comics"
        :key="comic.id"
        :card="comic"
        :isInCart="true"
        @removeFromCart="removeFromCart"
        @updateQuantity="updateQuantity"
        @buyComic="buyComic"
      />
    </div>
  </div>
</template>

<script>
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

    async buyComic(card) {
      try {
        const carritoId = UserContext().userData.carrito_id;
        const comicId = card.id;

        // Formatear la fecha correctamente
        const formattedDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

        const url = `http://localhost/api/v1/purchase-histories`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${UserContext().userData.token}`
          },
          body: JSON.stringify({
            fecha: formattedDate,
            precio: card.price,
            cantidad: card.quantity,
            comic_name: card.title,
            carrito_id: carritoId
          })
        });

        if (!response.ok) {
          throw new Error('Hubo un problema al agregar al historial de compras.');
        }

        const responseData = await response.json();
        console.log('Historial de compra creado exitosamente:', responseData);

        // Eliminar el cómic del carrito después de comprar
        await this.removeFromCart(card);

        console.log('Cómic agregado al historial de compras exitosamente');

      } catch (error) {
        console.error('Error al agregar al historial de compras:', error.message);
      }
    }
  }
};
</script>


<style scoped>
.comics-list {
  margin-left: 80px;
  margin-right: 80px;
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  margin-top: 50px; 
  margin-bottom: 20px;
}
</style>
