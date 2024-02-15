<template>
    <section class="news_container">
      <h1>News</h1>
      <div class="news_items">
        <div class="news_item">
            <img class="news_item_photo"  src="../../../assets/defaultPhoto.png">
          <p>Contenido de la Noticia 1</p>
        </div>
        <div class="news_item">
            <img class="news_item_photo"  src="../../../assets/defaultPhoto.png">
            <p>Contenido de la Noticia 2</p>
        </div>
        <div class="news_item">
            <img class="news_item_photo"  src="../../../assets/defaultPhoto.png">
            <p>Contenido de la Noticia 3</p>
        </div>
      </div>
    </section>
  </template>
  
  <script>

  </script>
  
  <style scoped>
  .news_container {
    text-align: center;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .news_items {
    display: flex;
    justify-content: space-around;
    margin-top: 20px; 
    margin-bottom: 20px;
    height: 80%;
  }
  
  .news_item {
    width: 300px;
    height: 100%; 
    border: 1px solid #000000;
    border-radius: 1rem;
    box-sizing: border-box;
    transition: transform 0.3s ease; 
    overflow: hidden;

  }
  
  .news_item:hover {
    transform: scaleX(1.1);     
  }

  .news_item_photo{
    width: 100%;
    height: 40%;
    object-fit: cover;
  }
  
  </style>
  