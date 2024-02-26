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
          <button><img src="../../../assets/carro-de-la-compra.png" @click="addToCart(card)" class="cart-icon" alt="Carrito de compras" /></button>
        </div>
      </figure>
    </article>
    <footer class="pagination">
      <PaginationComponent :currentPage="currentPage" :totalPages="totalPages" @next-page="nextPage" @previous-page="previousPage" />
    </footer>
  </section>
</template>

<script>
import { UserContext } from "../store/UserContext";
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
    userData() {
      return UserContext().userData;
    },
    displayedCards() {
      const cardsToDisplay = this.searchResults.length > 0 ? this.searchResults : this.cards;
      const sortedCards = this.selectedOrder
        ? cardsToDisplay.slice().sort((a, b) => (this.selectedOrder === 'price') ? a.price - b.price : a.title.localeCompare(b.title))
        : cardsToDisplay;
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return sortedCards.slice(startIndex, startIndex + this.itemsPerPage); 
    },

    totalPages() {
      return Math.ceil((this.searchResults.length > 0 ? this.searchResults : this.cards).length / this.itemsPerPage);
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
      if (typeof card === 'object' && card !== null) {
        this.updateRatingLocally(card, rating);
        this.sendRatingToBackend(card.id, rating);
      } else {
        console.error('Error: card no es un objeto válido');
      }
    },

    updateRatingLocally(card, rating) {
      card.rating = rating;
    },

    sendRatingToBackend(comicId, rating) {
      const url = `http://localhost/api/v1/ratings`;
      const body = { rating, comic_id: comicId };

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      .then(response => {
        if (response.ok) {
          console.log('Calificación enviada exitosamente');
        } else {
          console.error('Error al enviar la calificación al backend');
        }
      })
      .catch(error => console.error('Error en la solicitud:', error));
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

    addToCart(card) {
      this.addComicToCart(card.id, card.quantity);
    },

    async addComicToCart(comicId, quantity) {
      try {
        const carritoId = await this.getOrCreateCart();

        const formData = {
          cantidad: quantity,
        };

        const url = `http://localhost/api/v1/carritos/${carritoId}/comics/${comicId}`;

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${UserContext().userData.token}`
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Hubo un problema al agregar el cómic al carrito.');
        }

        console.log('Cómic agregado al carrito exitosamente');

      } catch (error) {
        console.error('Error al agregar el cómic al carrito:', error.message);
      }
    },

    async getOrCreateCart() {
      try {
        const carritosUrl = `http://localhost/api/v1/carritos?user_id=${UserContext().userData.id}&completed=false`;
        const response = await fetch(carritosUrl, {
          headers: {
            'Authorization': `Bearer ${UserContext().userData.token}`
          }
        });

        if (!response.ok) {
          throw new Error('Hubo un problema al obtener los carritos del usuario.');
        }

        const data = await response.json();

        if (data.length > 0) {
          return data[0].id;
        } else {
          return await this.createCart();
        }

      } catch (error) {
        console.error('Error al obtener o crear el carrito:', error.message);
        throw error;
      }
    },

    async createCart() {
    
        const formData = {
          user_id: UserContext().userData.id,
          comics: [],
          completed: false
        };

        const response = await fetch('http://localhost/api/v1/carritos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${UserContext().userData.token}`
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Hubo un problema al crear el carrito.');
        }

        const data = await response.json();
        console.log('Carrito creado exitosamente:', data);

        return data.id;

     
    },

    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },

    previousPage() {
      if (this.currentPage > 1) this.currentPage--;
    },

    performSearch(query) {
      this.searchQuery = query;
      this.searchResults = (this.searchQuery === '') ? [] : this.cards.filter(card => card.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
      this.currentPage = 1;
    },

    applyFilter(order) {
      this.selectedOrder = order;
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
  