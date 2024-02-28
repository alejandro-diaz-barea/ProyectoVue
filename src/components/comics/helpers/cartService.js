import { UserContext } from "../store/UserContext";

async function getOrCreateCart() {
  try {
    let cartId;

    // Verificar si UserContext está definido y tiene userData
    if (UserContext() && UserContext().userData) {
      cartId = UserContext().userData.carrito_id;
    }

    if (!cartId) {
      // Si no hay un carrito_id en el UserContext, obtenerlo o crearlo
      cartId = await createCart();
    }

    return cartId;

  } catch (error) {
    console.error('Error al obtener o crear el carrito:', error.message);
    throw error;
  }
}

async function createCart() {
  try {
    const formData = {
      user_id: UserContext().userData.id,
      comics: [],
      completed: false
    };

    const response = await fetch('http://localhost/api/v1/carritos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${UserContext().userData.token}`
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Hubo un problema al crear el carrito.');
    }

    const data = await response.json();
    console.log('Carrito creado exitosamente:', data);

    // Crear una promesa que resuelva cuando se actualice el contexto del usuario
    const updateUserContext = new Promise((resolve) => {
      UserContext().logIn({
        ...UserContext().userData,
        carrito_id: data.id
      });
      resolve();
    });

    // Esperar a que se resuelva la actualización del contexto del usuario
    await updateUserContext;

    return data.id;

  } catch (error) {
    console.error('Error al crear el carrito:', error.message);
    throw error;
  }
}

export { getOrCreateCart, createCart };
