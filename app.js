const apiUrl = "https://fakestoreapi.com/products";

// 1. Recuperar la información de todos los productos (products)

async function getAllProducts() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error, ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.log("No se pudo recuperar los productos", error);
  }
}

// 2. Recuperar la información de un número limitado de productos (products)

async function getLimitProducts(limit) {
  try {
    const response = await fetch(`${apiUrl}?limit=${limit}`);
    if (!response.ok) {
      throw new Error(`Error, ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.log("Error al recuperar cantidad limitada de productos", error);
  }
}
// 3. Agregar un nuevo producto (product)

async function newProduct() {
  const product = {
    title: "test product",
    price: 13.5,
    description: "lorem ipsum set",
    image: "https://i.pravatar.cc",
    category: "electronic",
  };
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error(`Error, ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.log("Error, no se pudo cargar el producto!", error);
  }

  // 4. Retornar un producto (product) según un “id” como parámetro.
  async function getProductById(id) {
    try {
      const response = await fetch(`${apiUrl}/${id}`);
      if (!response.ok) {
        throw new Error(`Error, ${response.status}`);
      }
      return response.json;
    } catch (error) {
      console.log("Error al retornar el id del producto", error);
    }
  }
  // 5. Eliminar un producto (product).
  async function deleteProduct(id) {
    try {
      const response = await fetch(`${apiUrl}/${id}`);
    } catch (error) {
      console.log("No se puedo eliminar el id", error);
    }
  }
}

getAllProducts();
getLimitProducts(7);
newProduct();
getProductById(2);
deleteProduct(1);
