const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;
const main = document.querySelector("main");

fetch(TRAINERS_URL)
  .then(response => {
    return response.json()
  })
  .then(data => {
    return renderTrainers(data)
  });

function renderTrainers(data) {
    data.forEach((trainer) => {
        const trainerLi = document.createElement('li')
        trainerLi.innerHTML =`
            <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
            <button data-trainer-id="${trainer.id}">Add Pokemon</button>
            <ul>               
            </ul>
            </div>
        `
        const pokemonUl = trainerLi.querySelector("ul")
        trainer.pokemons.forEach(pokemon => {
          const pokemonLi = document.createElement("li")
          pokemonLi.innerHTML = `
            ${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
          `
          pokemonUl.append(pokemonLi)
        })
        main.append(trainerLi)
    }) 
}
 