
<template>
    <footer class="footer">
        <a href="#" class="footerFacebook"><img src="../../../assets/facebook.png" alt="Logo de facebook" class="FacebookLogo"></a>
        <a href="#" class="footerInstagram"><img src="../../../assets/instagram.png" alt="Logo de instagram" class="InstagramLogo"></a>
        <a href="#" class="footerX"><img src="../../../assets/gorjeo.png" alt="Logo de x" class="XLogo"></a>
        <a href="#" class="footerYoutube"><img src="../../../assets/youtube.png" alt="Logo de youtube" class="YoutubeLogo"></a>
        <div class="footer__copyright">
          <p>© 2024 Adiabar. Todos los derechos reservados.</p>
        </div>
    </footer>
</template>


<script>

</script>

<style scoped>

.footer{
    background-color: #CACACA;
    color: #000000;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    padding-left: 2.1875rem;
    padding-right: 2.1875rem;
    height: 11.328vh;
    display: flex;
    align-items: center;
    font-family: 'Roboto', sans-serif;
    bottom: 0;

  }
  
  
  .footerFacebook{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 5.9375rem;
    padding-left: 7.5rem;
  
  }
  
  .FacebookLogo{
    height: 1.875rem;
    width: 1.875em;
  
  }
  
  
  .footerInstagram, .footerX, .footerYoutube{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 5.9375rem;
    padding-left: 1.25rem;
  
  }
  
  .InstagramLogo,  .YoutubeLogo {
    height: 1.875rem;
    width: 1.875rem;
  }
  
  .XLogo{
    width: 1.875rem;
    height: 1.625rem;
  }
  
  .footer__copyright{
      margin-left: 9.375rem;
      display: flex;
  
  }
  p {
    text-align: center;  
    font-size: 1.25rem;
  }
</style>
