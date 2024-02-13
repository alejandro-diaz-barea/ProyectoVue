<script >
import { defineAsyncComponent } from 'vue'

export default{
    components: {
      Navbar: defineAsyncComponent(() => import('./components/comics/shared/Navbar.vue')),
      Footer: defineAsyncComponent(() => import('./components/comics/shared/Footer.vue'))

    }
}
</script>

<template>
  <Navbar/>
  <main>
    <RouterView/>
  </main>
  <Footer/>
  

</template>

<style >
html,body {
  margin: 0;
}

</style>
