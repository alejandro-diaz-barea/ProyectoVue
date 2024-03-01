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
      <CardComponent
        v-for="card in displayedCards"
        :key="card.id"
        :card="card"
        @rate="rate"
        @addToCart="addToCart"
        @updateQuantity="updateQuantity"
      />
      <!-- Componente del mensaje en el modal -->
      <MessageVue ref="messageModal" />
    </article>
    <footer class="pagination">
      <PaginationComponent :currentPage="currentPage" :totalPages="totalPages" @next-page="nextPage" @previous-page="previousPage" />
    </footer>
  </section>
</template>

<script>
import { getOrCreateCart } from "../helpers/cartService";
import { UserContext } from "../store/UserContext";
import SearcherComponent from '../components/SearcherComponent.vue'; 
import DropdownComponent from '../components/DropdownComponent.vue';
import PaginationComponent from '../components/PaginationComponent.vue';
import CardComponent from '../components/CardComponent.vue'; 
import MessageVue from '../components/Mensagge.vue'

export default {
  components: { SearcherComponent, DropdownComponent, PaginationComponent, CardComponent, MessageVue }, 

  data() {
    return {
      cards: [], 
      currentPage: 1, 
      itemsPerPage: 10, 
      selectedOrder: '', 
      searchQuery: '', 
      searchResults: [],
      modalMessage: ""
    };
  },

  computed: {
    userData() {
      return UserContext().userData;
    },
    
  displayedCards() {
    // Determinar qué conjunto de tarjetas se mostrará: resultados de búsqueda o todas las tarjetas
    const cardsToDisplay = this.searchResults.length > 0 ? this.searchResults : this.cards;

    // Ordenar las tarjetas según el criterio seleccionado ('price' para precio, o el título de lo contrario)
    const sortedCards = this.selectedOrder
      ? cardsToDisplay.slice().sort((a, b) => (this.selectedOrder === 'price') ? a.price - b.price : a.title.localeCompare(b.title))
      : cardsToDisplay;

    // Calcular el índice de inicio de la página actual
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;

    // Devolver las tarjetas de la página actual, según el índice de inicio y el número de tarjetas por página
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
          this.cards = data.comics.map(comic => ({ id: comic.id, title: comic.title, price: comic.price, rating: 0, quantity: 1, image_url: comic.image_url }));
        })
        .catch(error => console.error('Error fetching comics:', error));
    },

    async addToCart(card, selectedQuantity) {
      try {
        const userContext = UserContext();
        if (!userContext || !userContext.userData) {
          this.$router.push("/login");
          return;
        }   

        // Obtener o crear el carrito y actualizar el carrito_id en el UserContext
        const carritoId = await getOrCreateCart();

        const formData = {
        cantidad: selectedQuantity,
        };

        const url = `http://localhost/api/v1/carritos/${carritoId}/comics/${card.id}`;

        const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userContext.userData.token}`
        },
        body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Hubo un problema al agregar el cómic al carrito.');
        }   

        // Mostrar el mensaje en el modal
         this.modalMessage = `¡"${card.title}" ha sido agregado al carrito!`;
        this.$refs.messageModal.openModal(this.modalMessage);

        // Ocultar el modal después de 3 segundos
        setTimeout(() => {
          this.$refs.messageModal.closeModal();
        }, 3000);

  } catch (error) {
    console.error('Error al agregar el cómic al carrito:', error.message);
     // Mostrar el mensaje en el modal
     this.modalMessage = `¡"${card.title}" lo tienes en el carrito!`;
    this.$refs.messageModal.openModal(this.modalMessage);

    // Ocultar el modal después de 3 segundos
    setTimeout(() => {
      this.$refs.messageModal.closeModal();
    }, 3000);
  }
},



    updateQuantity(selectedQuantity) {
      // Método para emitir el evento con la nueva cantidad seleccionada
      this.$emit('updateQuantity', selectedQuantity);
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
  width: 75%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header_content_carrito {
  height: 100%; 
    width: 50px;
    background-color: transparent;
    color: transparent;
    border: none;
    cursor: pointer;
  
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

.pagination{
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  padding: 0;
}


.filled {
  color: orange;
}
@media screen and (max-width: 1000px) {

  .header__content {
  width: 85%;

}

} 


@media screen and (max-width: 550px) {

  .header__content {
  width: 70%;

}
} 


@media screen and (max-width: 400px) {

.header__content {
width:90%;

}
} 

</style>