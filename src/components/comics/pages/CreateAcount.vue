<template>
    <section class="signup-container">
      <div class="signup-image">
        <img src="../../../assets/fotoLogin.jpg" class="foto-login">
      </div>
      <article class="signup-form">
        <!-- <img src="../../../assets/logoVue.png" class="logo-vue"> -->
        <h1 class="signup_title">SIGN UP</h1>
        <input type="text" class="campo-input campo-username" placeholder="Username" v-model="email">
        <input type="email" class="campo-input campo-email" placeholder="Email" v-model="email">
        <input type="password" class="campo-input campo-password" placeholder="Password">
        <input type="password" class="campo-input campo-repeat-password" placeholder="RepeatPassword">
        <button class="boton-login" @click="enviarFormulario">LOGIN</button>
        <p>If you already have an account, <router-link to="/login">Log in </router-link></p>
      </article>
    </section>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: "",
        emailValido: true,
        enviadoConExito: false,
      }
    },
    methods: {
      enviarFormulario() {
        this.validarEmail();
        if (this.emailValido) {
          console.log('Formulario válido, enviando...')
          // Envío exitoso después de 2 segundos
          setTimeout(() => {
            this.enviadoConExito = true;
            this.resetearFormulario();
          }, 2000)
        }
      },
      validarEmail() {
        this.emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
      },
      resetearFormulario() {
        this.email = '';
        this.emailValido = true;
        this.enviadoConExito = false;
      }
    }
  }
  </script>
  
  <style scoped>
  .signup-container {
    display: flex;
    min-height: 69vh;
    height: 80vh;
  }
  
  .signup-form {
    width: 50%;
    padding: 2rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .signup-image {
    width: 50%;
    height: 100%;
    padding: 0%;
    margin: 0;
  }
  
  .signup_title {
    font-size: 3.5rem;
    font-family: 'Bangers', sans-serif;
    margin: 0;
  }
  
  .foto-login {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .campo-input {
    margin-top: 1.5rem;
    font-family: 'Roboto';
    width: 46.8%;
    padding: 0.5rem;
    font-size: 1.25rem;
    border-radius: 1.25rem;
    border: 0.1rem solid #000000;
    color: black;
  }
  
  .boton-login {
    background-color: #000000;
    color: rgb(255, 255, 255);
    font-size: 1.876rem;
    border-radius: 3.125rem;
    border: none;
    cursor: pointer;
    margin-top: 2rem;
    height: 10%;
    width: 30%;
    font-family: 'Bangers', sans-serif;
    margin-bottom: 20px;
  }
  
  .boton-login:hover {
    background-color: #333333;
  }
  
  .signup-container .header {
    display: none;
  }
  </style>
  