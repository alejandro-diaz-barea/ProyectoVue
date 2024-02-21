<template>
  <nav aria-label="Pagination" style="height: 100%;">
    <ul class="pagination">
      <li class="page-item">
        <button @click="previousPage" class="page-link">←</button>
      </li>
      <li class="page-item">
        <span class="page-link">{{ currentPage }} de {{ totalPages }}</span>
      </li>
      <li class="page-item">
        <button @click="nextPage" class="page-link">→</button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  methods: {
    nextPage() {
      this.$emit('next-page');
    },
    previousPage() {
      this.$emit('previous-page');
    }
  }
};
</script>

  
  <style scoped>
  .pagination {
    display: flex;
    list-style: none;
    padding: 0;
  }
  
  .page-item {
    margin-right: 5px;
  }
  
  .page-link {
    display: block;
    padding: 12px 20px; 
    font-size: 1.5rem; 
    border: 1px solid #dee2e6;
    border-radius: 0.7rem;
    cursor: pointer;
    background-color: #cacaca;
    
  }
  
  .page-link:hover {
    background-color: #e9ecef;
  }
  
  .page-link:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
  
  .page-link.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
  </style>
  