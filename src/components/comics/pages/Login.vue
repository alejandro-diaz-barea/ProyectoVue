<template>
    <section class="login-container">
      <article class="login-form">
        <h1 class="login_title">Login</h1>
        <input type="email" class="campo-input campo-email" placeholder="Email" v-model.trim="email" @blur="validarEmail">
        <p v-if="!emailValido" class="mensaje-error">Por favor ingrese un correo electrónico válido.</p>
        <input type="password" class="campo-input campo-password" placeholder="Password" v-model="password" @blur="validarPassword">
        <p v-if="!passwordValido" class="mensaje-error">Por favor ingrese una contraseña.</p>
        <button class="boton-login" @click="enviarFormulario">LOGIN</button>
        <p>Don't have an account yet? <router-link to="/signUp">Sign up</router-link></p>
      </article>
      <div class="login-image">
        <img src="../../../assets/fotoLogin.jpg" class="foto-login">
      </div>
    </section>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: "",
        emailValido: true,
        password: "",
        passwordValido: true,
        enviadoConExito: false,
      }
    },
    methods: {
      enviarFormulario() {
        if (this.emailValido && this.passwordValido) {
          console.log('enviando...')
          // Envío exitoso después de 2 segundos
          setTimeout(() => {
            this.enviadoConExito = true;
            this.$router.push('/');
            this.resetearFormulario();
          }, 1000)
        }
      },
      validarEmail() {
        this.emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
      },
      validarPassword() {
        this.passwordValido = this.password.trim() !== '';
      },
      resetearFormulario() {
        this.email = '';
        this.emailValido = true;
        this.password = '';
        this.passwordValido = true;
        this.enviadoConExito = false;
      }
    }
  }
  </script>
  
  
  

<style scoped>
.login-container {
    display: flex;
    min-height: 80vh;
    height: 80vh;
}

.login-form {
    width: 50%;
    padding: 2rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.login-image {
    width: 50%;
    height: 100%;
    padding: 0%;
    margin: 0;
}

.logo-vue {
    height: 6rem;
    margin-top: 0;
    margin: 0;
}
.login_title{
    font-size: 3.5rem;
    font-family: 'Bangers', sans-serif;
    margin: 0;
}

.foto-login {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.campo-input{
    margin-top: 2rem;
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
    margin-top: 1rem;
    height: 10%;
    width: 30%;
    font-family: 'Bangers', sans-serif;
    margin-bottom: 20px;
}

.boton-login:hover {
    background-color: #333333;
}

.login-container .header {
    display: none;
}
</style>
