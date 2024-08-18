// 1- 1. Realizar una función que permita recuperar la información del personaje “Ned Stark”

const fs = require("fs").promises;

async function getNedStark() {
  const fetch = (await import("node-fetch")).default;
  const response = await fetch("https://thronesapi.com/api/v2/Characters/2");
  const nedStark = await response.json();
  console.log("Recuperar informacion de  Ned Stark:", nedStark);
  return nedStark;
}

// 1-  2. Realizar una función que permita recuperar todos los personajes disponibles

async function getAllCharacters() {
  const fetch = (await import("node-fetch")).default;
  const response = await fetch("https://thronesapi.com/api/v2/Characters");
  const characters = await response.json();
  console.log("Recuperar todos los personajes disponibles:", characters);
  return characters;
}

// 1 3. Persistir el resultado de la segunda consulta localmente en un archivo JSON.

async function saveCharactersToFile() {
  const characters = await getAllCharacters();
  await fs.writeFile("characters.json", JSON.stringify(characters, null, 2));
  console.log("Resultados de consulta json");
}

// 1 - 4. Leer el archivo local de personajes a) Mostrar por consola los personajes de la familia Stark. Es decir: “family” = “House Stark”.

async function showStarkCharacters() {
  const data = await fs.readFile("characters.json", "utf8");
  const characters = JSON.parse(data);
  const starkFamily = characters.filter(
    (character) => character.family === "House Stark"
  );
  console.log("Familia Stark:", starkFamily);
}

// 1 - b) Agregar un nuevo personaje y sobrescribir el archivo original.

async function addNewCharacter(newCharacter) {
  const data = await fs.readFile("characters.json", "utf8");
  const characters = JSON.parse(data);
  characters.push(newCharacter);
  await fs.writeFile("characters.json", JSON.stringify(characters, null, 2));
  console.log("Agregar un nuevo personaje y sobreescribirlo.");
}

// 1 - c) Eliminar los personajes cuyo ID sean mayores a 25 y sobrescribir el archivo original.

async function deleteCharactersWithIdGreaterThan25() {
  const data = await fs.readFile("characters.json", "utf8");
  let characters = JSON.parse(data);
  characters = characters.filter((character) => character.id <= 25);
  await fs.writeFile("characters.json", JSON.stringify(characters, null, 2));
  console.log("Eliminar personajes con ID mayor a 25 y sobreescribir.");
}

// prueba para ver si funca

(async () => {
  await getNedStark();
  await saveCharactersToFile();
  await showStarkCharacters();

  const newCharacter = {
    id: 26,
    firstName: "Nuevo",
    lastName: "Personaje",
    fullName: "Nuevo Personaje",
    title: "Nuevo Título",
    family: "Nueva Familia",
    imageUrl: "",
  };
  await addNewCharacter(newCharacter);
  await deleteCharactersWithIdGreaterThan25();
})();
