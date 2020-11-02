const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;
const main = document.querySelector("main");

//************* initialize *************
fetch(TRAINERS_URL)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    return renderTrainers(data);
  });

//************* functions *************
function renderTrainers(data) {
  data.forEach((trainer) => {
    const trainerLi = document.createElement("li");
    trainerLi.innerHTML = `
            <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
            <button class="add" data-trainer-id="${trainer.id}">Add Pokemon</button>
            <ul>               
            </ul>
            </div>
        `;
    trainer.pokemons.forEach((pokemon) => {
      appendPokemonLi(trainerLi, pokemon);
    });
    main.append(trainerLi);
  });
}

function appendPokemonLi(trainerLi, pokemon) {
  const pokemonUl = trainerLi.querySelector("ul");
  const pokemonLi = document.createElement("li");
  pokemonLi.innerHTML = `
    ${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
    `;
  pokemonUl.append(pokemonLi);
}

//************* event listeners *************
main.addEventListener("click", function (e) {
  if (e.target.matches("button.add")) {
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ trainer_id: e.target.dataset.trainerId }),
    };
    fetch(POKEMONS_URL, configObj)
      .then((response) => response.json())
      .then((pokemon) => {
        (pokemon.trainer_id) ?
          appendPokemonLi(e.target.parentNode.querySelector("ul"), pokemon) : console.log('Could not POST')
      });
  }
});

main.addEventListener("click", function (e) {
  if (e.target.matches("button.release")) {
    fetch(POKEMONS_URL + `/${e.target.dataset.pokemonId}`, {
      method: "DELETE",
    }).then((response) => {
      e.target.parentNode.remove();
      console.log("Removed", response);
    });
  }
});
