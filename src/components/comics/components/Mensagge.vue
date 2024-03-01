<template>
    <div>
      <!-- El Modal -->
      <div class="modal" v-if="showModal">
        <div class="modal-content">
          <p>{{ message }}</p>
          <button class="close" @click="closeModal">&times;</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showModal: false,
        message: ""
      };
    },  
    methods: {
      openModal(message) {
        this.message = message;
        this.showModal = true;
      },
      closeModal() {
        this.showModal = false;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilo para el modal */
  .modal {
    position: fixed;
    z-index: 9999;
    left: 20px;
    top: 20px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
  }
  
  /* Estilo para el contenido del modal */
  .modal-content {
    margin: 0;
  }
  
  /* Estilo para el botón de cerrar (×) */
  .close {
    color: #aaa;
    font-size: 20px;
    cursor: pointer;
  }
  
  .close:hover,
  .close:focus {
    color: white;
  }
  </style>
  