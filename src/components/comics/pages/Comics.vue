<template>
  <section class="content-wrapper">
    <article class="header">
      <header class="header__content">
        <SearcherComponent @search="performSearch" />
        <DropdownComponent @filter="applyFilter" />
        <button class="header_content_carrito" @click="gotoCarrito">
          <img class="header_content_carrito_imagen" src="../../../assets/carrito-de-compras.png" alt="Carrito de compras" />
        </button>
      </header>
    </article>
    <article class="cards-container">
      <figure v-for="card in displayedCards" :key="card.id" class="card" >
        <img :src="card.imageUrl" class="img" @click="gotoDetails(card)"/>
        <h2 class="card__title">{{ card.title }}</h2>
        <p class="card__price">{{ card.price }} €</p>
        <div class="rating">
          <span v-for="n in 5" :key="n" class="star" @click="rate(card, n)" :class="{ 'filled': n <= card.rating }">&#9733;</span>
        </div>
        <div class="cart-container">
          <select class="cart-container__select" v-model="card.quantity">
            <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
          </select>
          <img src="../../../assets/carro-de-la-compra.png" @click="addToCart(card)" class="cart-icon" alt="Carrito de compras" />        
        </div>
      </figure>
    </article>
    <footer class="pagination">
      <PaginationComponent :currentPage="currentPage" :totalPages="totalPages" @next-page="nextPage" @previous-page="previousPage" />
    </footer>
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
      cards: [], 
      currentPage: 1, 
      itemsPerPage: 10, 
      selectedOrder: '', 
      searchQuery: '', 
      searchResults: [] 
    };
  },

  computed: {
    displayedCards() {
      const cardsToDisplay = this.searchResults.length > 0 ? this.searchResults : this.cards; // Si hay resultados de busqueda los muestra y si no hay muestra todos (funcion que voy a cambiar)
      const sortedCards = this.selectedOrder // Si hay un orden seleccionado
        ? cardsToDisplay.slice().sort((a, b) => (this.selectedOrder === 'price') ? a.price - b.price : a.title.localeCompare(b.title)) // Ordenar por el selector
        : cardsToDisplay; // si no  hay selector muestra sin orden
      const startIndex = (this.currentPage - 1) * this.itemsPerPage; // inicio de las tarjetas en la pagina actual
      return sortedCards.slice(startIndex, startIndex + this.itemsPerPage); 
    },

    totalPages() {
      return Math.ceil((this.searchResults.length > 0 ? this.searchResults : this.cards).length / this.itemsPerPage); // Calcula el número total de páginas basado en los resultados de búsqueda o todas las tarjetas
    }
  },

  methods: {
    gotoCarrito() {
      this.$router.push('/perfil/carrito');
    },

    gotoDetails(card) {
      this.$router.push({ name: 'details-comics', params: { id: card.id } });
    },

    rate(card, rating) {
      // calificación de un cómic (cambiar por backend)
      card.rating = rating;
    },

    fetchComics() {
      const comicsUrl = 'http://localhost/api/v1/comics';
      fetch(comicsUrl)
        .then(response => response.ok ? response.json() : Promise.reject('Network response was not ok'))
        .then(data => {

          this.cards = data.comics.map(comic => ({ id: comic.id, title: comic.title, price: comic.price, rating: 0, quantity: 1, imageUrl: comic.image_url }));
        })
        .catch(error => console.error('Error fetching comics:', error));
    },

    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },

    previousPage() {
      if (this.currentPage > 1) this.currentPage--;
    },

    performSearch(query) {
      // Realiza una búsqueda de cómics basada en una consulta
      this.searchQuery = query;
      this.searchResults = (this.searchQuery === '') ? [] : this.cards.filter(card => card.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
      this.currentPage = 1; // página actual después de realizar la búsqueda
    },

    applyFilter(order) {
      // aplica el filtro de orden de las tarjetas de cómics
      this.selectedOrder = order;
    }
  },

  created() {
    // Método que se ejecuta cuando se crea el componente
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
    width: 50px;
    
  }

  .header_content_carrito_imagen {
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
  