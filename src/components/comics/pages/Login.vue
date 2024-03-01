<template>
    <section class="login-container">
      <article class="login-form">
        <h1 class="login_title">Login</h1>
        <input type="email" class="campo-input campo-email" placeholder="Email" v-model.trim="email" @blur="validarEmail">
        <p v-if="!emailValido" class="mensaje-error">Por favor ingrese un correo electrónico válido.</p>
        <input type="password" class="campo-input campo-password" placeholder="Password" v-model="password" @blur="validarPassword">
        <p v-if="!passwordValido" class="mensaje-error">Por favor ingrese una contraseña.</p>
        <button class="boton-login" @click="enviarFormulario">LOGIN</button>
        <p class="mensaje-error" v-if="error">Usuario o contraseña incorrectos</p>
        <p class="dontAcount">Don't have an account yet? <router-link to="/signUp">Sign up</router-link></p>
      </article>
      <div class="login-image">
        <img src="../../../assets/fotoLogin.jpg" class="foto-login">
      </div>
    </section>
  </template>
  
  <script>
  import { UserContext } from "../store/UserContext";
  import { getOrCreateCart } from "../helpers/cartService";

  
  export default {
    data() {
      return {
        email: "",
        emailValido: true,
        password: "",
        passwordValido: true,
        error: false,
      };
    },
    methods: {
      async enviarFormulario() {
        this.validarEmail();
        this.validarPassword();
  
        if (this.emailValido && this.passwordValido) {
          try {
            const formData = {
              email: this.email,
              password: this.password,
            };
  
            const response = await fetch('http://localhost/api/v1/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
  
            if (!response.ok) {
              throw new Error('Hubo un problema al iniciar sesión.');
            }
  
            const data = await response.json();
            if (data && data.error) {
                throw new Error(data.error);
            }


            // Pasar el contexto del usuario al login
            UserContext().logIn({
                id: data.user_id,
                name: data.name,
                email: this.email,
                token: data.access_token
            });
            
            getOrCreateCart()
            this.$router.push('/');
            this.resetearFormulario();
          } catch (error) {
            console.error('Error al iniciar sesión:', error.message);
            this.error = true; // Mostrar mensaje de error
          }
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
        this.error = false; // Reiniciar mensaje de error
      },
    },
  };
  </script>
  
  

<style scoped>
.login-container {
    display: flex;
    min-height: 74.5vh;
    height: 74.5vh;
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
    height: 2rem;
    width: 8rem;
    font-family: 'Bangers', sans-serif;
    margin-bottom: 20px;
}

.boton-login:hover {
    background-color: #333333;
}

.login-container .header {
    display: none;
}

.mensaje-error{
    color: red;
    margin-bottom: 0;

}


/* Media query para 1200 */
@media screen and (max-width: 1200px) {

    .campo-input{
        width: 300px;
    }
   
  } 

  /* Media query para 700 */
@media screen and (max-width: 700px) {
    .login-container {
        justify-content: center;
    }
    .login-image{
        display: none;
    }

    .dontAcount{
        width: 300px;
        text-align: center;

    }


   
  } 

</style>
