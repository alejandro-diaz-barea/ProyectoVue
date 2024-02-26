<template>
  <section class="signup-container">
    <div class="signup-image">
      <img src="../../../assets/fotoLogin.jpg" class="foto-login">
    </div>
    <article class="signup-form">
      <h1 class="signup_title">SIGN UP</h1>
      <input type="text" class="campo-input campo-username" placeholder="Username" v-model="name" @blur="validarNombre">
      <p v-if="!nombreValido" class="mensaje-error">El nombre debe tener al menos 5 caracteres.</p>
      <input type="email" class="campo-input campo-email" placeholder="Email" v-model="email" @blur="validarEmail">
      <p v-if="!emailValido" class="mensaje-error">Por favor ingrese un correo electrónico válido.</p>
      <input type="password" class="campo-input campo-password" placeholder="Password" v-model="password" @blur="validarContrasenas">
      <p v-if="!contrasenaLarga" class="mensaje-error">La contraseña debe tener al menos 8 caracteres.</p>
      <input type="password" class="campo-input campo-repeat-password" placeholder="Repeat Password" v-model="repeatPassword" @blur="validarContrasenas">
      <p v-if="!contrasenasIguales" class="mensaje-error">Las contraseñas no coinciden.</p>
      <button class="boton-login" @click="enviarFormulario" :disabled="submitDisabled">SIGN UP</button>
      <p class="p">If you already have an account, <router-link to="/login">Log in </router-link></p>
      <p v-if="registroExitoso" class="mensaje-exito">Registro exitoso. Redirigiendo...</p>
      <p v-if="errorMessage" class="mensaje-error">{{ errorMessage }}</p>
    </article>
  </section>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      nombreValido: true,
      email: "",
      emailValido: true,
      password: "",
      repeatPassword: "",
      contrasenasIguales: true,
      contrasenaLarga: true,
      registroExitoso: false,
      errorMessage: '',
      submitDisabled: false,
    }
  },
  methods: {
    enviarFormulario() {
      this.validarNombre();
      this.validarEmail();
      this.validarContrasenas();
      if (this.nombreValido && this.emailValido && this.contrasenasIguales && this.contrasenaLarga) {
        this.registrarUsuario();
      }
    },
    validarNombre() {
      this.nombreValido = this.name.length >= 5;
    },
    validarEmail() {
      this.emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
    },
    validarContrasenas() {
      this.contrasenasIguales = this.password === this.repeatPassword;
      this.contrasenaLarga = this.password.length > 7;
    },
    async registrarUsuario() {
      try {
        const formData = {
          name: this.name,
          email: this.email,
          password: this.password,
        };

        const response = await fetch('http://localhost/api/v1/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Hubo un problema al registrar el usuario.');
        }

        const data = await response.json();
        if (data && data.error) {
          throw new Error(data.error);
        }

        this.registroExitoso = true;
        this.resetearFormulario();
        setTimeout(() => {
          this.$router.push('/login');
        }, 2000);
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
    resetearFormulario() {
      this.name = '';
      this.nombreValido = true;
      this.email = '';
      this.emailValido = true;
      this.password = '';
      this.repeatPassword = '';
      this.contrasenasIguales = true;
      this.contrasenaLarga = true;
      this.registroExitoso = false;
      this.errorMessage = '';
    }
  }
}
</script>

  <style scoped>
  .signup-container {
    display: flex;
    min-height: 74vh;
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
    margin-top: 1rem;
    height: 2rem;
    width: 8rem;
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
    width: 400px;
    text-align: center;


  }


  
/* Media query para 1200 */
@media screen and (max-width: 1200px) {

  .campo-input{
      width: 300px;
  }
 
} 

/* Media query para 700 */
@media screen and (max-width: 700px) {
  .signup-container {
      justify-content: center;
  }
  .signup-image{
      display: none;
  }

  .p{
      width: 300px;
      text-align: center;

  }
}

/* Media query para 450 */
@media screen and (max-width: 450px) {
  .signup_title{
    font-size: 2rem;

  }
}
  </style>
  