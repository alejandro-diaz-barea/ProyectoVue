<template>
  <section class="news-container">
    <h1 class="news-container__title">News</h1>
    <article class="news-items">
      <figure v-for="(news, index) in newsList.news.slice(0, 3)" :key="index" class="news-item">
        <img class="news-item__photo" :src="news.image" alt="News Photo">
        <h2 class="news-item__title">{{ news.title }}</h2>
        <p class="news-item__description">{{ news.description }}</p>
      </figure>
    </article>
  </section>
</template>

<script>
export default {
  data() {
    return {
      newsList: {
        news: []
      }
    };
  },
  mounted() {
    this.fetchNews();
  },
  methods: {
    async fetchNews() {
      try {
        const response = await fetch('http://localhost/api/v1/news');
        const data = await response.json();
        this.newsList = data;
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    }
  }
};
</script>

<style scoped>
.news-container {
  margin-left: 7rem;
  margin-right: 7rem;
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Roboto';
}

.news-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 20px; 
  margin-bottom: 20px;
}

.news-item {
  width: calc(27% - 20px); 
  margin: 10px;
  border: 1px solid #000000;
  border-radius: 1rem;
  box-sizing: border-box;
  transition: transform 0.3s ease; 
  overflow: hidden;
  height: 500px;
}

@media (max-width: 900px) {
  .news-item {
    width: calc(50% - 20px); 
  }
  .news-container {
  margin-left: 4rem;
  margin-right: 4rem;
}
}

@media (max-width: 550px) {
  .news-item {
    width: calc(100% - 20px); 
  }
}

.news-item__photo {
  width: 100%;
  height: 40%;
  object-fit: cover;
}

.news-item__title{
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}
.news-item__description {
  height: 30%;
  margin: 0;
  margin-left: 1rem;
  margin-right: 1rem;
}
</style>