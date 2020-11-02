const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;
const main = document.querySelector("main");

//************* initialize *************
fetch(TRAINERS_URL)
  .then(response => {
    return response.json()
  })
  .then(data => {
    return renderTrainers(data)
  });


//************* functions *************
function renderTrainers(data) {
    data.forEach((trainer) => {
        const trainerLi = document.createElement('li')
        trainerLi.innerHTML =`
            <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
            <button class="add" data-trainer-id="${trainer.id}">Add Pokemon</button>
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
        trainerLi.dataset.pokemonCount = pokemonUl.children.length
        main.append(trainerLi)
    }) 
}

//************* event listeners *************
main.addEventListener('click', function(e) {
  if (e.target.matches("button.add")) {
    const configObj = {
      method: "POST",
      headers: {
      'Content-Type': 'application/json'
    },
      body: JSON.stringify({trainer_id: e.target.dataset.trainerId})
    }
    fetch(POKEMONS_URL, configObj)
    .then(response => response.json())
    .then(pokemon => {
      if (pokemon.trainer_id) {
        const trainerCard = document.querySelector(`[data-id="${pokemon.trainer_id}"]`)
        const pokemonUl = trainerCard.querySelector("ul")
        appendPokemonLi(trainerCard,pokemon)
      }
    })
  }
})

function appendPokemonLi(trainerLi, pokemon) {
  const pokemonUl = trainerLi.querySelector('ul')
  const pokemonLi = document.createElement("li")
  pokemonLi.innerHTML = `
    ${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
    `
  pokemonUl.append(pokemonLi)
}