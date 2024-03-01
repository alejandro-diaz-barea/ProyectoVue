<template>
  <figure class="card">
    <img :src="card.image_url" class="card__img" @click="gotoDetails(card)" />
    <h2 class="card__title">{{ card.title }}</h2>
    <p class="card__price">{{ card.price }} €</p>
    <div v-if="!isInCart" class="card__rating">
      <span v-for="n in 5" :key="n" class="star" @click="rate(card, n)" :class="{ 'filled': n <= card.rating }">&#9733;</span>
    </div>
    <div class="card__cart-container">
      <select class="card__cart-container__select" v-model="selectedQuantity" @change="updateQuantity">
        <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
      </select>
      <button v-if="!isInCart" @click="addToCart(card)" class="card__cart-button">
        <img src="../../../assets/carro-de-la-compra.png" class="cart-icon" alt="Agregar al Carrito" />
      </button>
      <button v-if="isInCart" @click="removeFromCart(card)" class="card__remove-button">
        X
      </button>
    </div>
    <button v-if="isInCart" @click="buyComic(card)" class="card__buy-button">
      PURCHASE
    </button>
  </figure>
</template>

<script>
import { UserContext } from '../store/UserContext';

export default {
  props: {
    card: {
      type: Object,
      required: true
    },
    isInCart: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedQuantity: this.card.quantity 
    };
  },

  methods: {
    gotoDetails(card) {
      this.$router.push({ name: 'details-comics', params: { id: card.id } });
    },
    rate(card, rating) {
      this.$emit('rate', card, rating);
    },
    addToCart(card) {
    
        this.$emit('addToCart', card, this.selectedQuantity);

      }
    ,
    updateQuantity() {
      // Método para emitir el evento con la nueva cantidad seleccionada
      this.$emit('updateQuantity', this.selectedQuantity);
    },
    removeFromCart(card) {
      // Implementa la lógica para eliminar el cómic del carrito
      console.log('Remove from cart:', card);
      // Emitir evento para notificar que se desea eliminar el cómic
      this.$emit('removeFromCart', card);
    },
    buyComic(card) {
      // Método para comprar el cómic
      console.log('buyComic:', card);
      // Llamar al evento para comprar el cómic
      this.$emit('buyComic', card);
    }
  },
  mounted() {
    if (!this.isInCart) {
      // Si no está en el carrito, establece la cantidad por defecto en 1
      this.selectedQuantity = 1;
    }
  }
};
</script>

<style scoped>
.card {
  width: calc(20% - 20px); /* Hace que haya 5 cards por fila */
  margin: 10px;
  border: 1px solid #000000;
  border-radius: 1rem;
  box-sizing: border-box;
  transition: transform 0.3s ease;
  overflow: hidden;
  margin-bottom: 50px;

  /* Nuevas propiedades para ajustar la altura */
  display: flex;
  flex-direction: column;
}

.card__title {
  height: 80px;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}

.card__price {
  margin: 0;
  padding: 0;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card__cart-container {
  display: flex;
  align-items: center;
  margin-top: 1rem;
  justify-content: center;
}

.card__cart-button {
  background-color:transparent;
  color: transparent;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  width: 60px;

  height: auto;
}


.card__buy-button{
  background-color: #000000;
    font-size: 1.2rem;
    border-radius: 3.125rem;
    color: white;
    border: none;
    cursor: pointer;
    margin-top: 1rem;
    height: 2rem;
    width: 8rem;
    font-family: 'Bangers', sans-serif;
    margin-bottom: 20px;  
    margin: auto;
}

.card__remove-button{
  border-radius: 200px;
  background-color:red;
  font-size:25px;
  color: white;
  border: none;
  cursor: pointer;
  margin: 0 5px;
  height: 30px;
  width: 30px;
}

.card__cart-button img {
  width: 30px;
  height: auto;
  margin-left: 10px;
}

.card__img {
  width: 100%;
  height: 60%;
  object-fit: cover;
}
.card__img:hover {
  cursor: pointer;
}

.card__cart-container__select {
  width: 60px;
  height: 30px;
  border-radius: 10px;
  border: none;
  background-color: #cacaca;
}
.card__cart-container__select:hover {
  width: 60px;
  height: 30px;
  border-radius: 10px;
  cursor: pointer;
}


.star {
  font-size: 1.5rem;
  cursor: pointer;
}

.star.filled {
  color: rgb(173, 173, 0);
}

@media screen and (max-width: 1000px) {
  .card {
    width: calc(33% - 20px);
  }
}

@media screen and (max-width: 800px) {
  .card {
    width: calc(50% - 20px);
  }
}

@media screen and (max-width: 600px) {
  .card {
    width: calc(100% - 20px);
  }
}
</style>
