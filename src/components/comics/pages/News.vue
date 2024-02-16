<template>
  <section class="news-container">
    <h1 class="news-container__title">News</h1>
    <div class="news-items">
      <div v-for="(news, index) in newsList.news.slice(0, 3)" :key="index" class="news-item">
        <img class="news-item__photo" :src="news.image" alt="News Photo">
        <h2 class="news-item__title">{{ news.title }}</h2>
        <p class="news-item__description">{{ news.description }}</p>
      </div>
    </div>
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
        console.log(data)
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    }
  }
};
</script>

<style scoped>
.news-container {
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
  width: calc(33.33% - 20px); 
  margin: 10px;
  border: 1px solid #000000;
  border-radius: 1rem;
  box-sizing: border-box;
  transition: transform 0.3s ease; 
  overflow: hidden;
}

@media (max-width: 768px) {
  .news-item {
    width: calc(50% - 20px); 
  }
}

@media (max-width: 480px) {
  .news-item {
    width: calc(100% - 20px); 
  }
}

.news-item:hover {
  transform: scaleX(1.1);     
}

.news-item__photo {
  width: 100%;
  height: 40%;
  object-fit: cover;
}

.news-item__title,
.news-item__description {
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}
</style>