<template>
  <section class="comic-details">
    <p v-if="loading" class="comic-details__loading">Cargando...</p>
    <div v-else class="comic-details__content">
      <figure class="comic-details__figure">
        <img :src="comicImg" alt="Comic Image" class="comic-details__image">
        <figcaption class="comic-details__figcaption">
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
      <ul class="comic-details__comments-list">
        <li v-for="comment in comments" :key="comment.id" :class="{ 'comic-details__comment-right': isUserComment(comment.user_id) }">
          <p>{{ comment.comment }}</p>
          <p v-if="comment.user" class="comic-details__comment-user">Usuario: {{ comment.user.name }}</p>
        </li>
      </ul>
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
    const comicId = this.$route.params.id;
    console.log('Comic ID:', comicId);
    this.fetchComicDetails(comicId);
    this.fetchComicComments(comicId);
  },
  methods: {
    fetchComicDetails(comicId) {
      fetch(`http://localhost/api/v1/comics/${comicId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          const comic = data.comic;
          this.comicId = comic.id;
          this.comicTitle = comic.title;
          this.comicDescription = comic.description;
          this.comicPrice = comic.price;
          this.comicImg = comic.image_url;
          this.loading = false;
          this.fetchComicRatings(comicId);
        })
        .catch(error => {
          console.error('Error fetching comic details:', error);
          this.loading = false;
        });
    },
    fetchComicRatings(comicId) {
      fetch(`http://localhost/api/v1/ratings`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (data.ratings && Array.isArray(data.ratings)) {
            const comicRatings = data.ratings.filter(rating => rating.comic_id === parseInt(this.comicId));
            if (comicRatings.length > 0) {
              const total = comicRatings.reduce((acc, cur) => acc + cur.rating, 0);
              this.totalRatings = total;
              
              // Calcular la media
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
      fetch(`http://localhost/api/v1/comics/${comicId}/comments`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Hubo un problema al obtener los comentarios del cómic');
          }
          return response.json();
        })
        .then(data => {
          this.comments = data.comments;
        })
        .catch(error => {
          console.error('Error fetching comic comments:', error);
        });
    },
    addComment() {
      const comicId = this.comicId;
      const formData = {
        comment: this.newComment,
        comic_id: comicId,
        user_id: UserContext().userData.id, // Agregar el user_id del contexto del usuario
        user_name: UserContext().userData.name // Agregar el nombre del contexto del usuario
      };

      fetch('http://localhost/api/v1/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${UserContext().userData.token}`
        },
        body: JSON.stringify(formData),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Hubo un problema al agregar el comentario');
        }
        return response.json();
      })
      .then(data => {
        console.log('Comentario creado exitosamente:', data.comment);
        this.comments.push(data.comment);
        this.newComment = '';
      })
      .catch(error => {
        console.error('Error adding comment:', error);
      });
    },
    formatDate(dateString) {
      // Función para formatear la fecha...
    },
    isUserComment(userId) {
      return userId === UserContext().userData.id;
    }
  }
};
</script>

<style scoped>
.comic-details {
  margin-left: 4rem;
  margin-right: 4rem;
}

.comic-details__figure {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.comic-details__image {
  width: 25%;
  height: auto;
}

.comic-details__figcaption {
  flex: 1;
  margin-left: 1rem;
}

.comic-details__info-item {
  margin: 0;
}
.comic-details__info-title{
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
  margin-left: 7rem;
  margin-right: 7rem;
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
  width: 100%; /* El 100% del contenedor */
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
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem;
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.comic-details__comment-button:hover {
  background-color: #0056b3;
}
</style>
