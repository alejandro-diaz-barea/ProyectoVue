<template>
    <figure class="card">
      <img :src="card.image_url" class="img" @click="gotoDetails(card)" />
      <h2 class="card__title">{{ card.title }}</h2>
      <p class="card__price">{{ card.price }} €</p>
      <div v-if="!isInCart" class="rating">
        <span v-for="n in 5" :key="n" class="star" @click="rate(card, n)" :class="{ 'filled': n <= card.rating }">&#9733;</span>
      </div>
      <div class="cart-container">
        <select class="cart-container__select" v-model="selectedQuantity" @change="updateQuantity">
          <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
        </select>
        <button v-if="!isInCart" @click="addToCart(card)">
          <img src="../../../assets/carro-de-la-compra.png" class="cart-icon" alt="Agregar al Carrito" />
        </button>
        <button v-if="isInCart" @click="removeFromCart(card)">
          X
        </button>
      </div>
      <button v-if="isInCart" @click="buyComic(card)">
        Comprar
      </button>
    </figure>
  </template>
  
  <script>
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
        selectedQuantity: this.card.quantity // Inicializando la cantidad seleccionada con la cantidad del cómic
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
      },
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
  .rating {
    margin-top: 1rem;
  }
  
  .star {
    font-size: 1.5rem;
    cursor: pointer;
  }
  .card {
    width: calc(20% - 20px); /* Hace que haya 5 cards por fila */
    margin: 10px;
    border: 1px solid #000000;
    border-radius: 1rem;
    box-sizing: border-box;
    transition: transform 0.3s ease; 
    overflow: hidden;
    margin-bottom: 50px;
    
  }
  
  .card__title{
    height: 80px;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center; 
    justify-content: center;
    font-size: 1rem;
  }
  
  .card__price{
    margin: 0;
    padding: 0;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .cart-container {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    justify-content: center;
  }
  
  .cart-icon {
    width: 30px;
    height: auto;
    margin-left: 10px;
  }
  .img{
    width: 100%;
    height: 60%;
    object-fit: cover;
  }
  
  .cart-container__select{
    width: 60px; 
    height: 30px;
  }


  .buy-button {
    background-color: green;
    color: white;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 4px;
  }
  @media screen and (max-width: 1000px) {
    .card {
      width: calc(50% - 20px);
    }
  }
  </style>
  