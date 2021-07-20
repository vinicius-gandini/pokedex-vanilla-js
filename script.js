const button = document.getElementById('catch');
const content = document.querySelector('.content');

let pokemons = [];

function fetchPokemonData(pokemon){
    let url = pokemon.url;

      fetch(url)
      .then(response => response.json())
      .then(function(pokeData){
        renderPokemon(pokeData);
      })
};

async function fetchPokemons() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151').then(response => response.json())
    .then(function(allpokemon){
    allpokemon.results.forEach(function(pokemon){
      fetchPokemonData(pokemon); 
    });
});
}

function renderPokemon(pokeData) {
    console.log(pokeData);
    button.remove();
    let card = document.createElement('div');
    card.classList.add('card');

    let name = document.createElement('p');
    name.innerText = pokeData.name;

    let types = document.createElement('span');
    types.innerText = pokeData.types.map(type => ' ' + type.type.name);

    let frontImage = document.createElement('img');
    frontImage.classList.add('front');
    frontImage.src = pokeData.sprites.front_default;

    let shinyImage = document.createElement('img');
    shinyImage.classList.add('remove', 'shiny');
    shinyImage.src = pokeData.sprites.front_shiny;


    card.append(frontImage, shinyImage, name, types);
    content.appendChild(card);
}

button.addEventListener('click',fetchPokemons);

