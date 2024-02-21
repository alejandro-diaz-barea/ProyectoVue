<template>
  <section class="order-selector">
    <select id="orderBy" v-model="selectedOrder" @change="applyFilter" class="order-selector__select">
      <option value="">ORDER BY</option>
      <option value="price">Precio</option>
      <option value="title">Nombre</option>
    </select>
  </section>
</template>

<script>
export default {
  data() {
    return {
      selectedOrder: ''
    };
  },
  methods: {
    applyFilter() {
      this.$emit('filter', this.selectedOrder);
    }
  }
};
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
  