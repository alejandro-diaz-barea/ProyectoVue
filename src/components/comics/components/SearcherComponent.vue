<template>
  <form @submit.prevent="search" class="search-form">
    <div class="search">
      <input type="text" v-model="searchQuery" placeholder="Search" class="search__input">
      <button type="submit" class="search__button">
        <img src="../../../assets/lupaLogo.png" alt="Search">
      </button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: ''
    };
  },
  methods: {
    search() {
      this.$emit('search', this.searchQuery);
    }
  }
};
</script>


  
  <style scoped>
  .search-form {
    display: flex;
    align-items: center;
  }
  
  .search {
    position: relative;
    display: flex;
  }
  
  .search__input {
    padding: 8px 30px 8px 10px;
    border: 1px solid #ccc;
    border-radius: 40px;
    width: 250px;
  }
  
  .search__button {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    padding: 6px 12px;
    border: none;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    background-color: transparent; /* Hace que el fondo del botón se vea transparente */
    width: 20%;
  }
  
  img {
    height: 100%;
    width: auto;
  }
  </style>
      