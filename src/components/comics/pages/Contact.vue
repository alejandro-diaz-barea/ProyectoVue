<template>
    <section>
        <h1 class="titulo">Contact  us</h1>
        <input type="email" class="campo-input campo-email" placeholder="Email" v-model="email">
        <p v-if="!emailValido" class="mensaje-error">Por favor ingrese un email válido.</p>
        <textarea class="campo-input campo-texto" placeholder="Texto" v-model="texto"></textarea>
        <p v-if="!textoValido" class="mensaje-error">Por favor ingrese al menos 10 caracteres.</p>
        <button class="boton-enviar" @click="enviarFormulario">Enviar</button>
        <p v-if="enviadoConExito" class="mensaje-exito">Entregado con éxito!</p>
    </section>
</template>

<script>
export default{
    data(){
        return{
            email:"",
            texto:"",
            emailValido:true,
            textoValido:true,
            enviadoConExito: false,
        }
    },
    methods: {
        enviarFormulario() {
            this.validarEmail();
            this.validarTexto();
            if (this.emailValido && this.textoValido) {
                console.log('Formulario válido, enviando...')
                this.enviadoConExito = true
                //resetear formulario despues de 2 segundos
                setTimeout(() => {
                    this.resetearFormulario()
                }, 2000)

            }
        },
        validarEmail() {
            this.emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)
        },
        validarTexto() {
            // no contar como caracteres los espacios en blanco
            const textoSinEspacios = this.texto.replace(/\s/g, '')
            this.textoValido = textoSinEspacios.length >= 10
        },
        resetearFormulario() {
            this.email = ''
            this.texto = ''
            this.emailValido = true
            this.textoValido = true
            this.enviadoConExito= false
        }
    }
}
</script>

<style scoped>

section {
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    min-height: 100vh;
    height: 80vh;
    background-image: url("../../../assets/imageComic.webp");
}

section::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: inherit; /* Heredamos la imagen de fondo del nav */
    filter: contrast(50%) brightness(100%); /* Aplicamos el filtro solo a la capa pseudo-elemento */
}

.titulo,
.campo-input,
.boton-enviar {
    color: rgb(255, 255, 255);
    z-index: 1; /* Aseguramos que estén por encima del pseudo-elemento */
}


.titulo {
    font-size: 3.125rem;
    -webkit-text-stroke-width: 0.1rem ;
    -webkit-text-stroke-color: black;
    margin-bottom: 1rem;
    font-family: 'Bangers', sans-serif;

}

.campo-input {
    width: 46.8%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    font-size: 1.25rem;
    border-radius: 1.25rem;
    border: 0.1rem solid #000000;
    color: black;
}

.mensaje-error{
    z-index: 1;
    color: red;

}

.campo-email{
    height: 5%;
}
.campo-texto {
    height: 10rem; 
    padding: 0.5rem;
    margin-bottom: 1rem;
    font-size: 1.25rem;
    border: 0.1rem solid #000000;
}

.boton-enviar {
    background-color: #000000;
    font-size: 1.876rem;
    border-radius: 3.125rem;
    border: none;
    cursor: pointer;
    margin-top: 1rem;
    height: 7.03125%;
    width: 15%;
    font-family: 'Bangers', sans-serif;

}

.boton-enviar:hover {
    background-color: #333333;
}

.mensaje-exito{
    z-index: 1;
    color: green;
}
</style>
