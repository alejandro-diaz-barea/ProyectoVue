<template>
    <section class="content-wrapper">
      <article class="header">
        <header class="header__content">
          <h1 class="header__content_title">50% IN 10 PRODUCTS</h1>
          <DropdownComponent @filter="applyFilter" />
          <button class="header_content_carrito" @click="gotoCarrito">
            <img class="header_content_carrito_imagen" src="../../../assets/carrito-de-compras.png" alt="Carrito de compras" />
          </button>
        </header>
      </article>
      <article class="cards-container">
        <CardComponent
          v-for="card in dailyOffers"
          :key="card.id"
          :card="card"
          @rate="rate"
          @addToCart="addToCart"
          @updateQuantity="updateQuantity"
        />
      </article>
    </section>
  </template>
  
  <script>
  import { getOrCreateCart } from "../helpers/cartService";
  import { UserContext } from "../store/UserContext";
  import DropdownComponent from '../components/DropdownComponent.vue';
  import CardComponent from '../components/CardComponent.vue'; 
  
  export default {
    components: { DropdownComponent, CardComponent }, 
  
    data() {
      return {
        cards: [], 
        selectedOrder: '', 
        dailyOffers: [] 
      };
    },
  
    computed: {
      userData() {
        return UserContext().userData;
      },
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
            this.generateDailyOffers(); // Generar ofertas diarias después de obtener todos los cómics
          })
          .catch(error => console.error('Error fetching comics:', error));
      },
  
      generateDailyOffers() {
        // Obtener una muestra aleatoria de 10 cómics basados en el filtro seleccionado
        let filteredCards = this.cards;
  
        if (this.selectedOrder === 'price') {
          filteredCards = this.cards.sort((a, b) => a.price - b.price);
        } else if (this.selectedOrder === 'name') {
          filteredCards = this.cards.sort((a, b) => a.title.localeCompare(b.title));
        }
  
        const shuffledComics = this.shuffleArray(filteredCards);
        this.dailyOffers = shuffledComics.slice(0, 10);
      },
  
      async addToCart(card, selectedQuantity) {
        try {
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
              'Authorization': `Bearer ${UserContext().userData.token}`
            },
            body: JSON.stringify(formData),
          });
  
          if (!response.ok) {
            throw new Error('Hubo un problema al agregar el cómic al carrito.');
          }
  
          console.log('Cómic agregado al carrito exitosamente');
  
          // Actualizar la cantidad en el cómic localmente
          const updatedCard = { ...card, quantity: selectedQuantity };
          // Aquí podrías emitir un evento para actualizar la lista de cómics en caso necesario
        } catch (error) {
          console.error('Error al agregar el cómic al carrito:', error.message);
        }
      },
  
      updateQuantity(selectedQuantity) {
        // Método para emitir el evento con la nueva cantidad seleccionada
        this.$emit('updateQuantity', selectedQuantity);
      },
  
      applyFilter(order) {
        this.selectedOrder = order;
        this.generateDailyOffers();
      },
  
      shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
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

  @media screen and (max-width: 800px) {

    .header__content {
    width: 80%;
  
  }
  
  .header__content_title {
    font-size: 1rem;
  }

  .header__cart-icon {
    width: 20px;
    height: 20px;
  }
}

@media screen and (max-width: 550px) {

.header__content {
width: 60%;

}

.header__content_title {
font-size: 0.9rem;
}

.header__cart-icon {
width: 20px;
height: 20px;
}
}
  </style>
  