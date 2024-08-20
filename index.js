const urlApi = "https://thronesapi.com/api/v2/Characters";
const fs = require('fs');

//1. Realizar una función que permita recuperar la información del personaje “Ned Stark”

async function getNedStark(id) {
    try{
        const response = await fetch(`${urlApi}/${id}`);
        if (!response.ok){
            throw new Error('Error' + response.status);
        }
        const datos = await response.json();
        console.log(datos); 
    }catch(error){
        console.log('error', error);
    }
    
}

//2. Realizar una función que permita recuperar todos los personajes disponibles.
async function allCharacter() {
    try {
        const response = await fetch (urlApi)
        if (!response.ok){ 
            throw new Error('Error ' + response.status);
        }
        const datos = await response.json();
        // console.log(datos);
        
//3. Persistir el resultado de la segunda consulta localmente en un archivo JSON.
       fs.writeFile('./Characters.json', JSON.stringify(datos, null, 2), (err) => {
        if (err) {
            console.error('NO SE PUDO ESCRIBIR EL ARCHIVO!!! =(', err);
        } else {
            console.log('ARCHIVO Characters.json CREADO CON EXITO!! =)');
        }
    });

    }catch(error){
        console.log('error ', error);
    }   
}

//4. Leer el archivo local de personajes
    //a) Mostrar por consola los personajes de la familia Stark. Es decir: “family” = “HouseStark”.
function houseStark(){
    fs.readFile('./Characters.json', 'utf-8', (err, data) =>{
        if (err) {
            console.error('No se pudo leer el archivo', err);
            return;
    }
        try{
            const characters = JSON.parse(data);
            const starkCharacters = characters.filter(character => character.family === 'House Stark');
            console.log(starkCharacters);


        }catch(parseError) {
            console.error('Error al parsear el JSON', parseError)}
    });
}

//b) Agregar un nuevo personaje y sobrescribir el archivo original.
function agregarPersonaje(){
   try{
    const datos = fs.readFileSync('./Characters.json', 'utf-8');
    const personajes = JSON.parse(datos);

    const personajeNuevo = {
        "id": 53,
        "firstName": "Roberto",
        "lastName": "Gomez Bolaños",
        "fullName": "Roberto Gomez Bolaños",
        "title": "Chavo del 8",
        "family": "Chespirito",
        "image": "chavo.jpg",
        "imageUrl": "http://elchavo/images/chavo.jpg"
    }
          
        personajes.push(personajeNuevo);
        console.log(personajes);
       
        
    
    
    }catch(error){
    

        console.error('Error al agregar el personaje:', error);
    }
    
}





getNedStark(6);
allCharacter();
houseStark();
agregarPersonaje()
