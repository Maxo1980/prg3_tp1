const urlApi = "https://thronesapi.com/api/v2/Characters";
const fs = require('fs');

//1) Realizar una función que permita recuperar la información del personaje “Ned Stark”

async function obtenerNedStark(id) {

    try{
        const response = await fetch(`${urlApi}/${id}`);
        if (!response.ok){
            throw new Error('Error! ' + response.status);
        }
        const datos = await response.json();
        console.log(datos); 
    }catch(error){
        console.log('Error! ', error);
    }
    
}


//2) Realizar una función que permita recuperar todos los personajes disponibles

async function allCharacters() {

    try {
        const response = await fetch (urlApi)
        if (!response.ok){ 
            throw new Error('Error! ' + response.status);
        }
        const datos = await response.json();
        
        
//3) Persistir el resultado de la segunda consulta localmente en un archivo JSON

       fs.writeFile('./Characters.json', JSON.stringify(datos, null, 2), (er) => {
        if (er) {
            console.error('No se ha escrito el archivo...', er);
        } else {
            console.log('El archivo ha sido creado con éxito...');
        }
    });

    }catch(error){
        console.log('Error! ', error);
    }   
}


//4) Leer el archivo local de personajes
//a. Mostrar por consola los personajes de la familia Stark. Es decir: “family” = “HouseStark”

function houseStark(){

    fs.readFile('./Characters.json', 'utf-8', (er, data) =>{
        if (er) {
            console.error('No se pudo leer el archivo...', er);
            return;
    }
        try{
            const personajes = JSON.parse(data);
            const starkCharacters = personajes.filter(character => character.family === 'House Stark');
            console.log(starkCharacters);


        }catch(parseError) {
            console.error('Error de parseo...', parseError)}
    });
}


//b. Agregar un nuevo personaje y sobrescribir el archivo original

function addCharacter(){

   try{
    const datos = fs.readFileSync('./Characters.json', 'utf-8');
    const characters = JSON.parse(datos);

    const newCharacter = {
        "id": 53,
        "firstName": "Daryl",
        "lastName": "Dixon",
        "fullName": "Daryl",
        "title": "Dix",
        "family": "Dixon",
        "image": "dd.jpg",
        "imageUrl": "http://dixon/images/dd.jpg"
    }
          
        characters.push(newCharacter);
        console.log(characters);
       
    }catch(error){
        console.error('Error al agregar el personaje:', error);
    }
}





obtenerNedStark(6);
allCharacters();
houseStark();
addCharacter()