const urlApi= "https://fakestoreapi.com/products";

//1. Recuperar la información de todos los productos (products).

async function informacionProductos(){
    try{
        const resp= await fetch(urlApi);

        if (!resp.ok){
            throw new Error(`Error de respuesta, ${resp.status}`);
        }

        const datos= await resp.json();
        console.log("Información de todos los productos: ",datos);

    }catch(error){
        console.log("Ups, error al recuperar la información de los productos! ", error);
    }
}


//2. Recuperar la información de un número limitado de productos (products).

async function infoProductoLimitado(limite){
    try{
        const resp= await fetch(`${urlApi}?limit=${limite}`);

        if (!resp.ok){
            throw new Error(`Error de respuesta, ${resp.status}`);
        }

        const datos= await resp.json();
        console.log("Información de un número limitado de productos: ", datos);
        
    }catch(error){
        console.log("Ups, error al recuperar la información de un número limitado de productos! ", error);
    }
}


//3. Agregar un nuevo producto (product).

async function nuevoProducto(){

    const producto= {
        title: 'test product',
        price: 13.5,
        description: 'lorem ipsum set',
        image: 'https://i.pravatar.cc',
        category: 'electronic'
    }

    try{
        const resp= await fetch (urlApi,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(producto),
        });

        if (!resp.ok){
            throw new Error(`Error de respuesta, ${resp.status}`);
        }
        console.log("Nuevo producto agregado con éxito!")
        return await resp.json();

    }catch(error){
        console.log("Ups, error al agregar un nuevo producto! ", error);
    }
}


//4. Retornar un producto (product) según un “id” como parámetro.

async function idProducto(id){
    try{
        const resp= await fetch(`${urlApi}/${id}`);

        if(!resp.ok){
            throw new Error(`Error de respuesta, ${resp.status}`);
        }

        const datos= await resp.json();
        console.log("Información del producto: ", datos);

    }catch(error){
        console.log("Ups, error al retornar un producto según un 'id'! ", error);
    }
}


//5. Eliminar un producto (product).

async function eliminaProducto(id){
    try{
        const resp= await fetch(`${urlApi}/${id}`,{
            method: "DELETE",
        });

        if (!resp.ok){
            throw new Error(`Error de respuesta, ${resp.status}`);
        }

        console.log("Producto eliminado con éxito! ", )

    }catch(error){
        console.log("Ups, error al eliminar el producto! ", error);
    }
}






(async () => {

    await informacionProductos();
    await infoProductoLimitado(6);
    await nuevoProducto();
    await idProducto(3);
    await eliminaProducto(2);

  })();