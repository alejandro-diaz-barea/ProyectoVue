<template>
    <section class="error-page">
        <div class="error-page__content">
            <h1 class="error-page__title">404</h1>
            <h3 class="error-page__subtitle">¡Oops! Universo equivocado</h3>
            <img src="../../../assets/msMinuts.png" alt="Error 404" class="error-page__image">
        </div>
    </section>
</template>

<script>

</script>

<style scoped>
.error-page {
    display: flex;
    align-items: center;
    justify-content: center; 
    height: 69vh;
    font-family: 'Roboto', sans-serif;
}

.error-page__content {
    text-align: center; 
    overflow: auto; 
}

.error-page__title {
    font-size: 5rem;
    margin: 0; 
    line-height: 1; /* Ajuste del line-height */
}

.error-page__subtitle {
    font-size: 2rem;
    margin: 0.5rem 0; 
}

.error-page__image {
    width: 15rem;
    max-width: 300px;
}
</style>
