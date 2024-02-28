<template>
  <div>
    <h1>Detalles del Cómic {{ comicTitle }}</h1>
    <p v-if="loading">Cargando...</p>
    <div v-else>
      <img :src="comicImg" alt="Comic Image">
      <p>Titulo: {{ comicTitle }}</p>
      <p>Descripción: {{ comicDescription }}</p>
      <p>Precio: {{ comicPrice }} €</p>
      <p v-if="totalRatings > 0">Valoraciones totales: {{ totalRatings }}</p>
      <p v-if="averageRating > 0">Valoración media: {{ averageRating }}</p>
      <p v-else>No hay valoraciones para este cómic</p>

      <!-- Sección de Comentarios -->
      <div>
        <h2>Comentarios</h2>
        <ul>
          <li v-for="comment in comments" :key="comment.id" :class="{ 'comment-right': isUserComment(comment.user_id) }">
            <p>{{ comment.comment }}</p>
            <p v-if="comment.user">Usuario: {{ comment.user.name }}</p>
          </li>
        </ul>
        <form @submit.prevent="addComment">
          <textarea v-model="newComment" placeholder="Escribe tu comentario"></textarea>
          <button type="submit">Agregar Comentario</button>
        </form>
      </div>
    </div>
  </div>
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
img {
  width: 25%;
  height: auto;
}

div {
  margin-left: 4rem;
  margin-right: 4rem;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 1rem;
}

.comment-right {
  text-align: right;
}

textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 1rem;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
