<template>
    <section class="error-page">
        <h1 class="error-page__title">404</h1>
        <h3 class="error-page__subtitle">¡Oops! Universo equivocado</h3>
        <img src="../../../assets/msMinuts.png" alt="Error 404" class="error-page__image">
    </section>
</template>

<script>

</script>

<style scoped>
.error-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.error-page__title {
    font-size: 9.375rem;
    height: 9.8125rem;
}

.error-page__subtitle {
    font-size: 3.125rem;
    margin-top: 1.8125rem;

}

.error-page__image {
    width: 25.5625rem;
    max-width: 300px;
}
</style>
