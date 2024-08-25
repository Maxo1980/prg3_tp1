const baseUrl = "https://fakestoreapi.com/products";

// 1. Recuperar la información de todos los productos (products).
const getAllProductos = async () => {
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error para recuperar los productos", error);
  }
};

// 2. Recuperar la información de un número limitado de productos (products).
const getLimitedProductos = async (limit) => {
  try {
    const response = await fetch(`${baseUrl}?limit=${limit}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error de numero limitado de producto:", error);
  }
};

// 3. Agregar un nuevo producto (product).
const addProducto = async (product) => {
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error para agregar producto:", error);
  }
};

// 4. Retornar un producto (product) según un “id” como parámetro.
const getProductById = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/${id}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error de retorno por id del producto:", error);
  }
};

// 5. Eliminar un producto (product).
const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    console.log(`Producto id ${id} eliminado`);
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
  }
};

module.exports = {
  getAllProductos,
  getLimitedProductos,
  addProducto,
  getProductById,
  deleteProduct,
};
