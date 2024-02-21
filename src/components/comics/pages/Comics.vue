<template>
  <section class="content-wrapper">
    <article class="header">
      <header class="header__content">
        <SearcherComponent></SearcherComponent>
        <DropdownComponent></DropdownComponent>
        <img class="header_content_carrito" src="../../../assets/carrito-de-compras.png" alt="Carrito de compras">
      </header>
    </article>
    <article class="cards-container">
      <figure v-for="card in cards" :key="card.id" class="card">
        <img :src="card.imageUrl" class="img">
        <h2 class="card__title">{{ card.title }}</h2>
        <p class="card__price">{{ card.price }} €</p>
        <div class="rating">
          <span v-for="n in 5" :key="n" class="star" @click="rate(card, n)" :class="{ 'filled': n <= card.rating }">&#9733;</span>
        </div>
        <div class="cart-container">
          <select class="cart-container__select" v-model="card.quantity">
            <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
          </select>
          <img src="../../../assets/carro-de-la-compra.png" class="cart-icon" alt="Carrito de compras">
        </div>
      </figure>
    </article>
    <footer class="pagination"><PaginationComponent></PaginationComponent></footer>
  </section>
</template>

<script>
import SearcherComponent from '../components/SearcherComponent.vue';
import DropdownComponent from '../components/DropdownComponent.vue';
import PaginationComponent from '../components/PaginationComponent.vue';

export default {
  components: { SearcherComponent, DropdownComponent, PaginationComponent },
  data() {
    return {
      cards: []
    };
  },
  methods: {
    rate(card, rating) {
      card.rating = rating; // Actualiza la valoracion del comic
    },
    fetchComics() {
      const comicsUrl = 'http://localhost/api/v1/comics';

      fetch(comicsUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
          this.cards = data.comics.map(comic => ({
            id: comic.id,
            title: comic.title,
            price: comic.price,
            rating: 0,
            quantity: 1,
            imageUrl: comic.image_url
          }));
        })
        .catch(error => {
          console.error('Error fetching comics:', error);
        });
    }
  },
  created() {
    this.fetchComics();
  }
};
</script>
  
  <style scoped>
  .content-wrapper{
    font-family: 'Roboto', sans-serif;
  }
  .header{
    margin-top: 50px ;
    display: flex;
    justify-content: center;
    height: 40px;
  }
  .header__content {
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .header_content_carrito {
    height: 100%; 
    width: auto;
  }
  
  .cards-container {
    margin-left: 80px;
    margin-right: 80px;
    text-align: center;
    min-height: 100vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 50px; 
    margin-bottom: 20px;
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
  
  .pagination{
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
    padding: 0;
  }
  
  .rating {
    margin-top: 1rem;
  }
  
  .star {
    font-size: 1.5rem;
    cursor: pointer;
  }
  
  .filled {
    color: orange;
  }
  
  .cart-container {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    justify-content: center;
    margin-bottom: 4rem;
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
  @media screen and (max-width: 1000px) {
    .card {
      width: calc(50% - 20px);
    }
  }
  </style>
  