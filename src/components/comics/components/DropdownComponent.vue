<template>
    <section class="order-selector">
      <select id="orderBy" class="order-selector__select">
        <option value="">ORDER BY</option> <!-- Opción por defecto -->
        <option value="priceDesc">Precio</option>
        <option value="nameDesc">Nombre</option>
      </select>
    </section>
  </template>
  
  <script>

  </script>
  
  <style scoped>
  .order-selector {
    height: 100%;
  }
  
  .order-selector__select {
    height: 100%;
    padding: 8px; 
    font-size: 16px; 
    width: 130px;
  }
  </style>
  