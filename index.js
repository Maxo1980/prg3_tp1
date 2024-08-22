const urlApi = "https://thronesapi.com/api/v2/Characters";
const fs = require('fs').promises;

//1. Realizar una función que permita recuperar la información del personaje “Ned Stark”

async function getNedStark(id) {
    try{
        const response = await fetch(`${urlApi}/${id}`);
        if (!response.ok){
            throw new Error('Error' + response.status);
        }
        const datos = await response.json();
        console.log("--- DATOS DE NED STARK ---")
        console.log(datos); 
    }catch(error){
        console.log('error', error);
    }
    
}

//2. Realizar una función que permita recuperar todos los personajes disponibles.
async function getAllCharacters() {
    try {
        const response = await fetch (urlApi);
        if (!response.ok){ 
            throw new Error('Error ' + response.status);
        }
        const datos = await response.json();
        return datos;

    }catch(error){
        console.log('error', error);
    }
}    
        
//3. Persistir el resultado de la segunda consulta localmente en un archivo JSON.
async function saveCharacters() {
    const characters = await getAllCharacters();
    await fs.writeFile("characters.json", JSON.stringify(characters, null, 2));
    console.log("Archivo guardado con exito! =)");
}

//4. Leer el archivo local de personajes
//a) Mostrar por consola los personajes de la familia Stark. Es decir: “family” = “HouseStark”.
 async function getAllStark(){
    const data = await fs.readFile('characters.json', 'utf-8');
    const characters = JSON.parse(data);
    const starks = characters.filter((character) => character.family === "House Stark");
    console.log("--- HOUSE OF STARK ---", starks);  

 } 

//b) Agregar un nuevo personaje y sobrescribir el archivo original

async function newCharacter() {
    const newCharacter = {
        "id": 53,
        "firstName": "Alberto",
        "lastName": "Fernandez",
        "fullName": "Alberto Fernandez",
        "title": "Lord Gatuno",
        "family": "Los k",
        "image": "betofernanz.jpg",
        "imageUrl": "https://larosada/xxx.jpg"
      };

    data = await fs.readFile("characters.json", "utf-8");
    let characters = JSON.parse(data);
    characters.push(newCharacter);
    await fs.writeFile("characters.json", JSON.stringify(characters, null, 2));
    console.log("Nuevo personaje agregado!");
}

//c) Eliminar los personajes cuyo ID sean mayores a 25 y sobrescribir el archivo original.
async function deleteCharacter25() {
    const data = await fs.readFile("characters.json", "utf8");
    let characters = JSON.parse(data);
    characters = characters.filter((character) => character.id <= 25);
    await fs.writeFile("characters.json", JSON.stringify(characters, null, 2));
    console.log("Eliminar personajes con ID mayor a 25");
  }
  

 (async () => {
    await getNedStark(6);
    await saveCharacters();
    await getAllStark();
    await newCharacter();
    await deleteCharacter25();
    
  })();