const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;
const main = document.querySelector("main");
const trainerList = document.createElement("ul")
main.append(trainerList)

fetch(TRAINERS_URL)
  .then(response => {
    return response.json()
  })
  .then(data => {
    return renderTrainers(data)
  });

function renderTrainers(data) {
    data.forEach((trainer) => {
        const li = document.createElement('li')
        li.innerHTML =`
            <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
            <button data-trainer-id="${trainer.id}">Add Pokemon</button>
            <ul>               
            </ul>
            </div>
        `
        trainerList.append(li)
    }) 
}
    //   <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
    // <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
   // <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
    ///<li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
 //   <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
 