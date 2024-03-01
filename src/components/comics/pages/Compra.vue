<template>
  <section class="form-container">
    <h1 class="form-container__title">Purchase</h1>
    <form @submit.prevent="submitForm" class="form">
      <fieldset class="form__fieldset">
        <legend class="form__legend">Comic Details</legend>
        <label for="comic-nombre" class="form__label">Comic Name:</label>
        <input type="text" id="comic-nombre" name="comic-nombre" v-model="formData.comicNombre" readonly class="form__input">
        <label for="comic-cantidad" class="form__label">Quantity:</label>
        <input type="number" id="comic-cantidad" name="comic-cantidad" v-model="formData.comicCantidad" @input="updatePrecioTotal" min="1" class="form__input">
        
        <!-- Precio Total (calculado) -->
        <label for="comic-precio-total" class="form__label">Total Price:</label>
        <input type="text" id="comic-precio-total" name="comic-precio-total" v-model="formData.comicPrecioTotal" readonly class="form__input">
      </fieldset>

      <!-- Detalles de Envío -->
      <fieldset class="form__fieldset">
        <legend class="form__legend">Shipping Details</legend>
        <!-- Dirección de Envío -->
        <label for="direccion" class="form__label">Shipping Address:</label>
        <input type="text" id="direccion" name="direccion" v-model="formData.direccion" required class="form__input">
      </fieldset>

      <!-- Detalles Bancarios -->
      <fieldset class="form__fieldset">
        <legend class="form__legend">Banking Details</legend>
        <label for="titular" class="form__label">Account Holder:</label>
        <input type="text" id="titular" name="titular" v-model="formData.titular" required class="form__input">
        <label for="numero" class="form__label">Account Number:</label>
        <input type="text" id="numero" name="numero" v-model="formData.bank_account_number" required @input="validateForm" class="form__input">
        <p v-if="!isFormValid && formData.bank_account_number.length > 0" class="form__error">The account number must be between 10 and 16 characters.</p>
        <label for="banco" class="form__label">Bank:</label>
        <input type="text" id="banco" name="banco" v-model="formData.banco" required class="form__input">
      </fieldset>

      <button type="submit" :disabled="!isFormValid" class="form__button">Place Order</button>
    </form>
    <p v-if="error" class="form__error">{{ error }}</p>
    <p v-if="successMessage" class="form__success">{{ successMessage }}</p>
  </section>
</template>

<script>
import { useComicStore } from '../helpers/ComprarComic';
import { UserContext } from "../store/UserContext";

export default {
  data() {
    return {
      formData: {
        comicNombre: '',
        comicDetalles: '',
        comicCantidad: 1,
        comicPrecioTotal: 0,
        direccion: '',
        titular: '',
        bank_account_number: '',
        banco: ''
      },
      error: '',
      successMessage: '',
      isFormValid: false,
      formDataHistory: {
        precio: 0,
        comic_name: '',
        cantidad: 0,
        fecha: ''
      }
    };
  },

  mounted() {
    this.getUserData();
    this.fillComicData();
  },

  methods: {
    getUserData() {
      // Obtener datos del usuario desde el contexto
      const userID = UserContext().userData.id;
      const token = UserContext().userData.token;

      // Petición para obtener datos del usuario
      fetch(`http://localhost/api/v1/users/${userID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Hubo un problema al obtener los datos del usuario.');
        }
      })
      .then(data => {
        // Actualizar datos del formulario con los datos del usuario
        this.formData.direccion = data.user.address || '';
        this.formData.titular = data.user.bank_holder || '';
        this.formData.bank_account_number = data.user.bank_account_number || '';
        this.formData.banco = data.user.bank_name || '';
        // Actualizar la validación del formulario al obtener los datos
        this.validateForm();
      })
      .catch(error => {
        console.error('Error al obtener los datos del usuario:', error);
        alert('Hubo un error al obtener los datos del usuario');
      });
    },

    fillComicData() {
      // Obtener datos del cómic seleccionado desde el store
      const comic = useComicStore().selectedComic;
      if (comic) {
        // Llenar el formulario con los datos del cómic
        this.formData.comicNombre = comic.title || 'Nombre del Cómic';
        this.formData.comicDetalles = comic.details || 'Detalles del Cómic';
        this.formData.titular = comic.bank_holder || '';
        this.formData.bank_account_number = comic.bank_account_number || '';
        this.formData.banco = comic.bank_name || '';

        // Establecer la cantidad por defecto
        this.formData.comicCantidad = comic.quantity || 1;

        this.updatePrecioTotal();
      }
    },

    updatePrecioTotal() {
      // Calcular y actualizar el precio total basado en la cantidad
      const comic = useComicStore().selectedComic;
      if (comic) {
        const price = parseFloat(comic.price) || 0;
        const quantity = parseInt(this.formData.comicCantidad) || 1;
        this.formData.comicPrecioTotal = (price * quantity).toFixed(2);
        this.validateForm();
      }
    },

    submitForm() {
      // Preparar datos para enviar la orden de compra
      const formData = {
        address: this.formData.direccion,
        bank_holder: this.formData.titular,
        bank_account_number: this.formData.bank_account_number,
        bank_name: this.formData.banco
      };
      // Obtener la fecha actual para el historial de compra
      const formattedDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
      this.formDataHistory = {
        fecha: formattedDate,
        precio: this.formData.comicPrecioTotal,
        cantidad: this.formData.comicCantidad,
        comic_name: this.formData.comicNombre,
        carrito_id: UserContext().userData.carrito_id
      };

      // Verificar si el formulario es válido y enviar la compra
      if (this.isFormValid) {
        this.buyComic(formData);
      }
    },

    validateForm() {
      // Validar los campos del formulario
      const numeroValue = this.formData.bank_account_number.trim();
      const numeroLength = numeroValue.length;

      if (numeroLength === 0) {
        this.error = 'El número de cuenta es requerido.';
      } else if (numeroLength < 10 || numeroLength > 16) {
        this.error = 'El número de cuenta debe tener entre 10 y 16 caracteres.';
      } else {
        this.error = '';
      }

      this.isFormValid = !!this.formData.direccion && !!this.formData.titular && !!this.formData.banco && !this.error;
    },

    buyComic(formData) {
      // Enviar la orden de compra
      const userID = UserContext().userData.id;
      const token = UserContext().userData.token;

      fetch(`http://localhost/api/v1/users/${userID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Hubo un problema al actualizar los datos del usuario.');
        }
        return response.json();
      })
      .then(data => {
        // Completar la compra y mostrar mensaje de éxito
        this.completeComicPurchase(this.formDataHistory);
      })
      .catch(error => {
        console.error('Error al actualizar los datos del usuario:', error);
      });
    },

    completeComicPurchase(formDataHistory) {
      // Enviar datos de compra al servidor y redireccionar al carrito
      const userID = UserContext().userData.id;
      const token = UserContext().userData.token;

      fetch(`http://localhost/api/v1/purchase-histories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formDataHistory)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Hubo un problema al realizar la compra.');
        }
        return response.json();
      })
      .then(data => {
        this.successMessage = 'Comic comprado con éxito!';
        this.resetForm();
        // Redireccionar al carrito después de un tiempo
        setTimeout(() => {
          this.successMessage = '';
          this.$router.push("/perfil/carrito");
        }, 3000);
      })
      .catch(error => {
        console.error('Error al realizar la compra:', error);
        alert('Hubo un error al realizar la compra');
      });
    },

    resetForm() {
      // Reiniciar el formulario después de la compra
      this.formData.direccion = '';
      this.formData.titular = '';
      this.formData.bank_account_number = '';
      this.formData.banco = '';
      this.error = '';
      this.isFormValid = false;
      this.formDataHistory = {
        precio: 0,
        comic_name: '',
        cantidad: 0,
        fecha: ''
      };
    }
  }
};
</script>


<style scoped>
.form-container {
  margin: 0 auto;
  max-width: 600px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-container__title {
  font-size: 24px;
  margin-bottom: 20px;
}

.form {
  display: grid;
  gap: 10px;
}

.form__fieldset {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
}

.form__legend {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.form__label {
  display: block;
  font-weight: bold;
}

.form__input,
.form__textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.form__input[type="number"] {
  width: calc(100% - 20px);
}

.form__button {
  background-color: #000000;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 3px;
  cursor: pointer;
  font-family: 'Bangers', sans-serif;
}

.form__button:hover {
  background-color: #000000ab;
}

.form__error {
  color: red;
  margin-top: 5px;
}

.form__success {
  color: green;
  margin-top: 5px;
}
</style>
