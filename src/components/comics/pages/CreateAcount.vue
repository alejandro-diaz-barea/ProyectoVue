<template>
    <section>
        <input type="text" placeholder="Username">
        <input type="email" class="campo-input campo-email" placeholder="Email" v-model="email">
        <p v-if="!emailValido" class="mensaje-error">Por favor ingrese un email válido.</p>
        <input type="password" placeholder="Password">
        
        <button class="boton-enviar" @click="enviarFormulario">Login</button>

    </section>
</template>

<script>
    export default{
    data(){
        return{
            email:"",
            emailValido:true,
            enviadoConExito: false,
        }
    
       
    },
    methods: {
        enviarFormulario() {
            this.validarEmail();
            if (this.emailValido) {
                console.log('Formulario válido, enviando...')
                //envio exitoso despues de 2 segundos
                setTimeout(() => {
                    this.enviadoConExito = true
                    this.resetearFormulario()
                }, 2000)
            }
        },
        validarEmail() {
            this.emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)
        },
        resetearFormulario() {
            this.email = ''
            this.emailValido = true
            this.enviadoConExito = false
        }
    }
}
</script>