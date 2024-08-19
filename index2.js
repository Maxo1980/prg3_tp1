const {
  getAllProductos,
  getLimitedProductos,
  addProducto,
  getProductById,
  deleteProduct,
} = require("./api");

const ejecutar = async () => {
  console.log("Obtener todos los productos");
  const todosLosProductos = await getAllProductos();
  console.log(todosLosProductos);

  console.log("Obtener 5 productos limitados");
  const productosLimitados = await getLimitedProductos(5);
  console.log(productosLimitados);

  console.log("Agregar nuevo producto...");
  const nuevoProducto = {
    titulo: "Nuevo producto",
    pricio: 99.99,
    descripcion: "El nuevo producto",
    imagen: "https://imagen_ejemploUner",
    categoria: "Electrónica",
  };
  const productoAgregado = await addProducto(nuevoProducto);
  console.log(productoAgregado);

  console.log(" Producto con id");
  const productoPorId = await getProductById(1);
  console.log(productoPorId);

  console.log("Elimino producto con id");
  await deleteProduct(1);
};

ejecutar();
