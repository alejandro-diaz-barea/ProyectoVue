<template>
    <header class="header">
        <router-link to="/" class="header__logo-link">
            <img src="../../../assets/logoVue.png" alt="Logo de Vue.js" class="header__logo">
          </router-link>
        <nav class="header__nav">
          <ul class="nav__list">
            <li class="nav__item">
              <router-link  to="/comics" class="nav__link">COMICS</router-link>
            </li>
            <li class="nav__item">
              <router-link  to="/ofertas" class="nav__link">OFERTAS</router-link>
            </li>
            <li class="nav__item">
              <router-link to="/contact" class="nav__link">CONTACT</router-link>
            </li>
          </ul>
        </nav>
        <nav class="header__buttons">
          <a class="buttons_DarkMode"><img class="ImagenDarkMode" src="../../../assets/modo-de-sueno.png" alt="darkmode"></a>
          <button @click="goToLoginPage" class="buttons__login">LOGIN</button>
          <button @click="goToSignUpPage" class="buttons__signup">SIGN UP</button>
        </nav>
      </header>
</template>

<script>
  export default {
    methods: {
      goToLoginPage() {
        // Navegar hacia login
        this.$router.push('/login')
      },
      goToSignUpPage() {
        // Navegar hacia sign up
        this.$router.push('/signUp')
      },
    }
  }
</script>

<style scoped>

.header {
    background-color: #CACACA;
    color: #000000;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    padding-left: 2.1875rem;
    padding-right: 2.1875rem;
    display: flex;
    align-items: center;
    font-family: 'Bangers', sans-serif; 
    height: 11.328vh ;
}

.header__nav {
    margin-left: 1.25rem;
}

.nav__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
}

.nav__item {
    margin-left: 1.25rem;
}

.nav__link {
    font-size: 1.25rem;
    margin-left: 1.25rem;
    text-decoration: none;
    color:#000000;
}

.header__logo-link{
    height: 100%;
}
.header__logo {
    display: inline-block;
    max-height: 100%;
    width: auto;
}

.header__buttons {
    margin-left: auto;
    margin-right: 1.25rem;
    display: flex;
}

.buttons__login,.buttons__signup {
    background-color: #000000;
    color: #ffffff;
    font-family: 'Bangers', sans-serif; 
    font-size: 1.25rem;
    border-radius: 0.625rem;
    border: none;
    cursor: pointer;
    margin-left: 1.25rem;
    height: 1.9375rem;
    width: 8rem;
}

.buttons__login:hover,.buttons__signup:hover {
    background-color: #333333;
}

.buttons_DarkMode{
    margin-right: 1.25rem;
    width: 1.9375rem;
    height: 1.9375rem;
}

.ImagenDarkMode{
    width: 100%;
    height: auto;
}


</style>
