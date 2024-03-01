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
    width: 450px;
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
    background-color: transparent; 
    width: 20%;
  }
  
  img {
    height: 100%;
    width: auto;
  }


  @media screen and (max-width: 1000px) {

    .search__input {
    width: 350px;
  }
} 


@media screen and (max-width: 800px) {

.search__input {
width: 220px;
}
} 



@media screen and (max-width: 550px) {

.search__input {
width: 170px;
}
} 



  </style>
      