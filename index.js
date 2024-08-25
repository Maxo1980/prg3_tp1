const urlApi = "https://thronesapi.com/api/v2/Characters";

const fs = require('fs').promises;



//1) Realizar una función que permita recuperar la información del personaje “Ned Stark”


async function obtenerNedStark(nedStarkId){

    try {
        const response = await fetch(`${urlApi}/${nedStarkId}`);

        if (!response.ok){
            throw new Error('Ups, error! ' + response.status);
        }
        const datosNedStark = await response.json();
        
        console.log("Información de Ned Stark: ", datosNedStark); 

    }catch(error){
        console.log('Ups, error! ', error);
        return null;
    } 
}


//2) Realizar una función que permita recuperar todos los personajes disponibles


async function todosLosPersonajes(){

    try {
        const response = await fetch(urlApi);

        if (!response.ok){ 
            throw new Error('Ups, error! ' + response.status);
        }

        const datosPersonajes = await response.json();
        return datosPersonajes;

    } catch(error){
        console.log('Ups, error! ', error);
        return null;
    }
}    
        

//3) Persistir el resultado de la segunda consulta localmente en un archivo JSON


async function guardarPersonajes(){

    const personajes = await todosLosPersonajes();
    await fs.writeFile("personajes.json", JSON.stringify(personajes, null, 2));
    console.log("Yay, guardado! ");
}


//4) Leer el archivo local de personajes
//a. Mostrar por consola los personajes de la familia Stark. Es decir: “family” = “HouseStark”


 async function obtenerFamiliaStark(){

    const datos = await fs.readFile('personajes.json', 'utf-8');

    const personajes = JSON.parse(datos);
    const familiaStark = personajes.filter((personaje) => personaje.family === "House Stark");

    console.log("Personajes House Stark: ", familiaStark);  
 } 

//b. Agregar un nuevo personaje y sobrescribir el archivo original


async function nuevoPersonaje(){

    const nuevoPersonaje= {

        "id": 53,
        "firstName": "Juan",
        "lastName": "Perez",
        "fullName": "Juan Perez",
        "title": "Juancito",
        "family": "Perez",
        "image": "jp.jpg",
        "imageUrl": "https://juancito/jp.jpg"
      }

    const datos = await fs.readFile("personajes.json", "utf-8");

    let personajes = JSON.parse(datos);
    personajes.push(nuevoPersonaje);
    await fs.writeFile("personajes.json", JSON.stringify(personajes, null, 2));

    console.log("Nuevo personaje agregado! ");
}


//c) Eliminar los personajes cuyo ID sean mayores a 25 y sobrescribir el archivo original


async function borrarPersonajeMayor25(){

    const datos = await fs.readFile("personajes.json", "utf8");

    let personajes = JSON.parse(datos);
    personajes = personajes.filter((personaje) => personaje.id <= 25);
    await fs.writeFile("personajes.json", JSON.stringify(personajes, null, 2));

    console.log("Elimina los personajes cuyo ID sean mayores a 25");
  }
  


 (async () => {

    await obtenerNedStark(6);
    await guardarPersonajes();
    await obtenerFamiliaStark();
    await nuevoPersonaje();
    await borrarPersonajeMayor25();
    
  })();
