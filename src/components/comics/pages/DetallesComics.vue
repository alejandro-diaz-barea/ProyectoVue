<template>
    <h1>Detalles del Cómic {{ comicId }}</h1>
    <p v-if="loading">Cargando...</p>
  <div v-else>
      <img :src="comicImg" alt="Comic Image">
      <p>Titulo: {{ comicTitle }}</p>
      <p>Descripción: {{ comicDescription }}</p>
      <p>Precio: {{ comicPrice }} €</p>
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
      loading: true
    };
  },
  mounted() {
    const comicId = this.$route.params.id;
    console.log('Comic ID:', comicId); 
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
      })
      .catch(error => {
        console.error('Error fetching comic details:', error);
        this.loading = false; 
      });
  }
};
</script>

<style scoped>
img{
  width: 25%;
  height: auto;
}

div{
  margin-left: 4rem;
  margin-right: 4rem;
}
</style>
