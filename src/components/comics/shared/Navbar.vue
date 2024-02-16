<template>
  <header class="header">
    <router-link to="/" class="header__logo-link">
      <img src="../../../assets/logoVue.png" alt="Logo de Vue.js" class="header__logo">
    </router-link>
    <nav class="header__nav">
      <ul class="nav__list">
        <li class="nav__item">
          <router-link to="/comics" class="nav__link">COMICS</router-link>
        </li>
        <li class="nav__item">
          <router-link to="/ofertas" class="nav__link">OFERTAS</router-link>
        </li>
        <li class="nav__item">
          <router-link to="/contact" class="nav__link">CONTACT</router-link>
        </li>
      </ul>
    </nav>
    <nav class="header__buttons" >
      <!-- Icono de Dark Mode -->
      <a class="buttons_DarkMode">
        <img class="ImagenDarkMode" src="../../../assets/modo-de-sueno.png" alt="darkmode">
      </a>
      <button v-if="!user" @click="goToLoginPage" class="buttons__login">LOGIN</button>
      <button v-if="!user" @click="goToSignUpPage" class="buttons__signup">SIGN UP</button>
      <button v-else @click="logOut" class="buttons__logout">LOGOUT</button>
    </nav>

    <!-- Icono de hamburguesa para mostrar el menú desplegable -->
    <nav class="hamburger-icon" @click="toggleMenu">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </nav>
    <!-- Menú desplegable -->
    <nav v-show="showMenu" class="mobile-menu">
      <button @click="toggleMenu" class="exit-button">X</button>
      <router-link to="/comics" class="nav__link" @click="toggleMenu">COMICS</router-link>
      <router-link to="/ofertas" class="nav__link" @click="toggleMenu">OFERTAS</router-link>
      <router-link to="/contact" class="nav__link" @click="toggleMenu">CONTACT</router-link>
      <button @click="goToLoginPage" class="buttons__login" v-if="!user">LOGIN</button>
      <button @click="goToSignUpPage" class="buttons__signup" v-if="!user">SIGN UP</button>
      <button @click="logOut" class="buttons__logout" v-else>LOGOUT</button>
      <!-- Icono de Dark Mode -->
      <a class="buttons_DarkMode">
        <img class="ImagenDarkMode" src="../../../assets/modo-de-sueno.png" alt="darkmode">
      </a>
    </nav>
  </header>
</template>

<script>
import { UserContext } from "../store/UserContext";

export default {
  data() {
    return {
      showMenu: false // Variable para controlar la visibilidad del menú desplegable
    };
  },
  computed: {
    user() {
      return UserContext().user; 
    }
  },
  methods: {
    goToLoginPage() {
      this.$router.push('/login');
      // Cerrar el menú
      this.showMenu = false;
    },
    goToSignUpPage() {
      this.$router.push('/signUp');
      // Cerrar el menú
      this.showMenu = false;
    },
    toggleMenu() {
      // Alternar la visibilidad del menú desplegable
      this.showMenu = !this.showMenu;
    },
    logOut() {
      UserContext().logOut(); // Llamar a la acción logOut para cerrar sesión
    }
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
  color: #000000;
}

.header__logo-link {
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

.buttons__login,
.buttons__signup {
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

.buttons__login:hover,
.buttons__signup:hover {
  background-color: #333333;
}

.buttons_DarkMode {
  margin-right: 1.25rem;
  width: 1.8rem;
  height: 1.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ImagenDarkMode {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
}

/* Icono de hamburguesa para mostrar el menú desplegable */
.hamburger-icon {
  cursor: pointer;
}

.hamburger-icon .line {
  width: 25px;
  height: 3px;
  background-color: #000;
  margin: 5px;
  margin-right: 0;
}

/* Estilos para el botón de salida (X) */
.exit-button {
  background-color: transparent;
  border: none;
  color: #ffffff;
  cursor: pointer;
  font-size: 1.5rem; /* Hacerlo un poco más grande */
  position: absolute;
  top: 0.5rem; /* Posicionar arriba */
  right: 0.5rem; /* Posicionar a la derecha */
}

.exit-button:hover {
  text-decoration: underline; /* Subrayar el texto al pasar el mouse */
}

/* Estilos para el menú desplegable */
.mobile-menu .nav__link, .mobile-menu button {
  display: block;
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  text-decoration: none;
  color: #ffffff;
}

/* Estilos para el menú desplegable */
.mobile-menu {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
}


/* Icono de hamburguesa para mostrar el menú desplegable */
.hamburger-icon {
  cursor: pointer;
  display: none;
}

.hamburger-icon .line {
  width: 25px;
  height: 3px;
  background-color: #000;
  margin: 5px;
}





/* Media query para 950px */
@media screen and (max-width: 950px) {
  .header {

    padding-top: 0.60rem;
    padding-bottom: 0.60rem;
    padding-left: 1rem;
    padding-right: 1rem;
    height: 10vh;
  }
  
  .header__nav {
    margin-left: 0rem;
  }
  

  .nav__item {
    margin-left: 0.5rem;
  }
  
  .nav__link {
    font-size: 1rem;
    margin-left: 0.5rem;
  }
  
  .header__buttons {
    margin-right: 0.8rem;
  }
  
  .buttons__login,
  .buttons__signup {
    font-size: 1rem;
    border-radius: 0.625rem;
    margin-left: 0.8rem;
    height: 1.5rem;
    width: 6rem;
  }
  .buttons_DarkMode {
    margin-right: 0.8rem;
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .ImagenDarkMode {
    max-width: 70%;
    max-height: 70%;
    width: auto;
    height: auto;
  }
  
}

/* Media query para 700px */
@media screen and (max-width: 700px) {
  .header {

    padding-top: 0.50rem;
    padding-bottom: 0.50rem;
    padding-left: 1rem;
    padding-right: 1rem;
    height: 10vh;
  }
  
  .header__nav {
    margin-left: 0rem;
  }
  

  .nav__item {
    margin-left: 0.2rem;
  }
  
  .nav__link {
    font-size: 1rem;
    margin-left: 0.5rem;
  }
  
  .header__buttons {
    margin-right: 0.2rem;
  }
  
  .buttons__login,
  .buttons__signup {
    font-size: 1rem;
    border-radius: 0.625rem;
    margin-left: 0.5rem;
    height: 1.5rem;
    width: 4rem;
  }
  .buttons_DarkMode {
    margin-right: 0.5rem;
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .ImagenDarkMode {
    max-width: 70%;
    max-height: 70%;
    width: auto;
    height: auto;
  }
  
}

/* Media query para 550 */
@media screen and (max-width: 550px) {
  .header__nav,
  .header__buttons {
    display: none;
  }

  .mobile-menu {
    width: 100%; 
    height: 100%; 
    background-color: #000000da;
    padding: 1rem;
    box-sizing: border-box;
    z-index: 999; 
    display: flex;
  }
  .mobile-menu .nav__link {
    color: white;

  }

  .hamburger-icon{
    display:block;
    margin-left: auto;
    margin-right: 1.25rem;
  }

  .ImagenDarkMode{
    height: auto;
    width: 100%;
    background-color: white;
  }

  .buttons_DarkMode{
    margin-right: 0;
  }

  .header .header_buttons .buttons_login {
    background-color: #CACACA;
    color: black;
  }
} 
</style>