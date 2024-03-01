<template>
  <!-- Sección de Detalles del Cómic -->
  <section class="comic-details">
    <p v-if="loading" class="comic-details__loading">Cargando...</p>
    <div v-else class="comic-details__content">
      <figure class="comic-details__figure">
        <img :src="comicImg" alt="Comic Image" class="comic-details__image">
        <figcaption class="comic-details__figcaption">
          <!-- Mostrar título, descripción, precio, valoraciones, y valoración media del cómic -->
          <p class="comic-details__info-title">{{ comicTitle }}</p>
          <p class="comic-details__info-item"><strong>Descripción:</strong> {{ comicDescription }}</p>
          <p class="comic-details__info-item"><strong>Precio:</strong> {{ comicPrice }} €</p>
          <p v-if="totalRatings > 0" class="comic-details__info-item"><strong>Valoraciones totales:</strong> {{ totalRatings }}</p>
          <p v-if="averageRating > 0" class="comic-details__info-item"><strong>Valoración media:</strong> {{ averageRating }}</p>
          <p v-else class="comic-details__info-item">No hay valoraciones para este cómic</p>
        </figcaption>
      </figure>
    </div>

    <!-- Sección de Comentarios -->
    <div class="comic-details__comments">
      <h2 class="comic-details__comments-title">Reviews</h2>
      <!-- Lista de comentarios -->
      <ul class="comic-details__comments-list">
        <!-- Mostrar cada comentario y el nombre del usuario (si está disponible) -->
        <li v-for="comment in comments" :key="comment.id" :class="{ 'comic-details__comment-right': isUserComment(comment.user_id) }">
          <p>{{ comment.comment }}</p>
          <p v-if="comment.user" class="comic-details__comment-user">Usuario: {{ comment.user.name }}</p>
        </li>
      </ul>
      <!-- Formulario para agregar un nuevo comentario -->
      <form @submit.prevent="addComment" class="comic-details__comment-form">
        <div class="comic-details__comment-input-container">
          <input v-model="newComment" type="text" placeholder="Escribe tu comentario" class="comic-details__comment-input">
          <button type="submit" class="comic-details__comment-button">➕</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { UserContext } from "../store/UserContext";

export default {
  data() {
    return {
      comicId: '',
      comicTitle: '',
      comicDescription: '',
      comicPrice: 0,
      comicImg: '',
      loading: true,
      totalRatings: 0,
      averageRating: 0,
      comments: [],
      newComment: ''
    };
  },

  mounted() {
    // Obtener el ID del cómic de los parámetros de la ruta
    const comicId = this.$route.params.id;
    this.fetchComicDetails(comicId); // Obtener detalles del cómic
    this.fetchComicComments(comicId); // Obtener comentarios del cómic
  },

  methods: {
    fetchComicDetails(comicId) {
      // Obtener detalles del cómic desde la API
      fetch(`http://localhost/api/v1/comics/${comicId}`)
        .then(response => response.json())
        .then(data => {
          const comic = data.comic;
          // Actualizar datos del cómic
          this.comicId = comic.id;
          this.comicTitle = comic.title;
          this.comicDescription = comic.description;
          this.comicPrice = comic.price;
          this.comicImg = comic.image_url;
          this.loading = false;
          // Obtener y calcular las valoraciones del cómic
          this.fetchComicRatings(comicId);
        })
        .catch(error => {
          console.error('Error fetching comic details:', error);
          this.loading = false;
        });
    },

    fetchComicRatings(comicId) {
      // Obtener las valoraciones del cómic desde la API
      fetch(`http://localhost/api/v1/ratings`)
        .then(response => response.json())
        .then(data => {
          if (data.ratings && Array.isArray(data.ratings)) {
            // Filtrar las valoraciones por el ID del cómic
            const comicRatings = data.ratings.filter(rating => rating.comic_id === parseInt(this.comicId));
            if (comicRatings.length > 0) {
              // Calcular el total y la media de las valoraciones
              const total = comicRatings.reduce((acc, cur) => acc + cur.rating, 0);
              this.totalRatings = total;
              this.averageRating = total / comicRatings.length;
            } else {
              console.log(`No hay valoraciones para el cómic ${this.comicId}`);
            }
          } else {
            console.error('Ratings data is not in the expected format:', data);
            throw new Error('Ratings data is not in the expected format');
          }
        })
        .catch(error => {
          console.error('Error fetching comic ratings:', error);
        });
    },

    fetchComicComments(comicId) {
      // Obtener los comentarios del cómic desde la API
      fetch(`http://localhost/api/v1/comics/${comicId}/comments`)
        .then(response => response.json())
        .then(data => {
          this.comments = data.comments;
        })
        .catch(error => {
          console.error('Error fetching comic comments:', error);
        });
    },

    addComment() {
      // Agregar un nuevo comentario al cómic
      const comicId = this.comicId;
      const formData = {
        comment: this.newComment,
        comic_id: comicId,
        user_id: UserContext().userData.id,
        user_name: UserContext().userData.name
      };

      fetch('http://localhost/api/v1/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${UserContext().userData.token}`
        },
        body: JSON.stringify(formData),
      })
      .then(response => response.json())
      .then(data => {
        this.comments.push(data.comment);
        this.newComment = '';
      })
      .catch(error => {
        console.error('Error adding comment:', error);
      });
    },

    isUserComment(userId) {
      // Verificar si el comentario pertenece al usuario actual
      return userId === UserContext().userData.id;
    }
  }
};
</script>


<style scoped>
.comic-details {
  margin: 0 auto;
  max-width: 1200px;
  padding: 20px;
}

.comic-details__figure {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
}

.comic-details__image {
  width: 100%;
  max-width: 300px;
  height: auto;
  margin-bottom: 20px;
}

.comic-details__figcaption {
  flex: 1;
  margin-left: 1rem;
}

.comic-details__info-item {
  margin: 0;
}

.comic-details__info-title {
  font-family: 'Bangers', sans-serif;
  font-size: 2rem;
  text-align: center;
}

.comic-details__comments {
  margin-top: 2rem;
}

.comic-details__comments-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
}

.comic-details__comments-list {
  list-style-type: none;
  padding: 0;
}

.comic-details__comment-right {
  text-align: right;
}

.comic-details__comment-user {
  font-style: italic;
}

.comic-details__comment-input-container {
  width: 100%;
  margin-bottom: 1rem;
  position: relative;
}

.comic-details__comment-input {
  width: calc(100% - 40px); /* El 100% del contenedor menos el ancho del botón */
  height: 30px;
  padding-right: 40px; /* Espacio para el botón */
  border-radius: 20px;
}

.comic-details__comment-button {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: #858585;
  color: rgb(255, 255, 255);
  border: none;
  padding: 0.5rem;
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.comic-details__comment-button:hover {
  background-color: #b8b8b8;
}

@media (max-width: 768px) {
  .comic-details__figure {
    flex-direction: column;
    align-items: center;
  }

  .comic-details__image {
    max-width: 100%;
  }
}
</style>
