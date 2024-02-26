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
    </div>
  </div>
</template>

<script>
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
      averageRating: 0  
    };
  },
  mounted() {
    const comicId = this.$route.params.id;
    console.log('Comic ID:', comicId);
    this.fetchComicDetails(comicId);
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
</style>
