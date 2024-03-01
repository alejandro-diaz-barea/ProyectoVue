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
        
        <label for="comic-precio-total" class="form__label">Total Price:</label>
        <input type="text" id="comic-precio-total" name="comic-precio-total" v-model="formData.comicPrecioTotal" readonly class="form__input">
      </fieldset>

      <fieldset class="form__fieldset">
        <legend class="form__legend">Shipping Details</legend>
        <label for="direccion" class="form__label">Shipping Address:</label>
        <input type="text" id="direccion" name="direccion" v-model="formData.direccion" required class="form__input">
      </fieldset>

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
      const userID = UserContext().userData.id;
      const token = UserContext().userData.token;

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
          throw new Error('There was a problem fetching user data.');
        }
      })
      .then(data => {
        console.log('User Data:', data);
        this.formData.direccion = data.user.address || '';
        this.formData.titular = data.user.bank_holder || '';
        this.formData.bank_account_number = data.user.bank_account_number || '';
        this.formData.banco = data.user.bank_name || '';
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        alert('There was an error fetching user data');
      });
    },

    fillComicData() {
      const comic = useComicStore().selectedComic;
      if (comic) {
        this.formData.comicNombre = comic.title || 'Comic Name';
        this.formData.comicDetalles = comic.details || 'Comic Details';
        this.formData.titular = comic.bank_holder || '';
        this.formData.bank_account_number = comic.bank_account_number || '';
        this.formData.banco = comic.bank_name || '';
        this.updatePrecioTotal();
      }
    },

    updatePrecioTotal() {
      const comic = useComicStore().selectedComic;
      if (comic) {
        const price = parseFloat(comic.price) || 0;
        const quantity = parseInt(this.formData.comicCantidad) || 1;
        this.formData.comicPrecioTotal = (price * quantity).toFixed(2);
        this.validateForm();
      }
    },

    submitForm() {
      const formData = {
        address: this.formData.direccion,
        bank_holder: this.formData.titular,
        bank_account_number: this.formData.bank_account_number,
        bank_name: this.formData.banco
      };
      const formattedDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
      this.formDataHistory = {
        fecha: formattedDate,
        precio: this.formData.comicPrecioTotal,
        cantidad: this.formData.comicCantidad,
        comic_name: this.formData.comicNombre,
        carrito_id: UserContext().userData.carrito_id
      };

      if (this.isFormValid) {
        this.buyComic(formData);
      }
    },

    validateForm() {
      const numeroValue = this.formData.bank_account_number.trim();
      this.error = '';
      this.isFormValid = !!this.formData.direccion && !!this.formData.titular && !!this.formData.banco;
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
</style>
