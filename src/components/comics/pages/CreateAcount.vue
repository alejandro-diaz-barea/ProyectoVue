<template>
    <section class="signup-container">
      <div class="signup-image">
        <img src="../../../assets/fotoLogin.jpg" class="foto-login">
      </div>
      <article class="signup-form">
        <h1 class="signup_title">SIGN UP</h1>
        <input type="text" class="campo-input campo-username" placeholder="Username" v-model="username" @blur="validarUsername">
        <p v-if="!usernameValido" class="mensaje-error">El nombre de usuario debe tener al menos 5 caracteres.</p>
        <input type="email" class="campo-input campo-email" placeholder="Email" v-model="email" @blur="validarEmail">
        <p v-if="!emailValido" class="mensaje-error">Por favor ingrese un correo electrónico válido.</p>
        <input type="password" class="campo-input campo-password" placeholder="Password" v-model="password" @blur="validarContrasenas">
        <p v-if="!contrasenaLarga" class="mensaje-error">La contraseña debe tener al menos 8 caracteres.</p>
        <input type="password" class="campo-input campo-repeat-password" placeholder="Repeat Password" v-model="repeatPassword" @blur="validarContrasenas">
        <p v-if="!contrasenasIguales" class="mensaje-error">Las contraseñas no coinciden.</p>
        <button class="boton-login" @click="enviarFormulario">SIGN UP</button>
        <p>If you already have an account, <router-link to="/login">Log in </router-link></p>
      </article>
    </section>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: "",
        usernameValido: true,
        email: "",
        emailValido: true,
        password: "",
        repeatPassword: "",
        contrasenasIguales: true,
        contrasenaLarga: true,
        enviadoConExito: false,
      }
    },
    methods: {
      enviarFormulario() {
        this.validarUsername();
        this.validarEmail();
        this.validarContrasenas();
        if (this.usernameValido && this.emailValido && this.contrasenasIguales && this.contrasenaLarga) {
          console.log('enviando...')
          // Envío exitoso después de 2 segundos
          setTimeout(() => {
            this.enviadoConExito = true;
            this.resetearFormulario();
            this.$router.push('/login');
          }, 2000)
        }
      },
      validarUsername() {
        this.usernameValido = this.username.length >= 5;
      },
      validarEmail() {
        this.emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
      },
      validarContrasenas() {
        this.contrasenasIguales = this.password === this.repeatPassword;
        this.contrasenaLarga = this.password.length > 7;
      },
      resetearFormulario() {
        this.username = '';
        this.usernameValido = true;
        this.email = '';
        this.emailValido = true;
        this.password = '';
        this.repeatPassword = '';
        this.contrasenasIguales = true;
        this.contrasenaLarga = true;
        this.enviadoConExito = false;
      }
    }
  }
  </script>
  
  
  
  
  <style scoped>
  .signup-container {
    display: flex;
    min-height: 80vh;
    height: 90vh;
  }
  
  .signup-form {
    width: 50%;
    padding: 2rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .signup-image {
    width: 50%;
    min-height: 80vh;
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


  .mensaje-error{
    height: 1px;
    margin: 0.5rem;
    color: red;

  }
  </style>
  