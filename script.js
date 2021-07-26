const button = document.getElementById('catch');
const content = document.querySelector('.content');

const pokeTypes = {
  normal: 'normal',
  fighting: 'fighting',
  flying: 'flying',
  poison: 'poison',
  ground: 'ground',
  rock: 'rock',
  bug: 'bug',
  ghost: 'ghost',
  steel: 'steel',
  fire: 'fire',
  water: 'water',
  grass: 'grass',
  eletric: 'electric',
  psychic: 'psychic',
  ice: 'ice',
  dragon: 'dragon',
  dark: 'dark',
  fairy: 'fairy',
  unknown: 'unknown',
  shadow: 'shadow'
}

let pokemons = [];

async function fetchPokemonData(pokemon){
    let url = pokemon.url;

      fetch(url)
      .then(response => response.json())
      .then(async function(pokeData){
        await renderPokemon(pokeData);
      })
};

async function fetchPokemons() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151').then(response => response.json())
    .then(async function(allpokemon){
    allpokemon.results.map(async function(pokemon){
      await fetchPokemonData(pokemon); 
      return;
    });
});
}

async function renderPokemon(pokeData) {
    button.remove();
    let card = document.createElement('div');
    card.classList.add('card');

    let name = document.createElement('p');
    name.innerText = pokeData.name;

    let types = document.createElement('span');
    let oneType = pokeData.types.map(type => type.type.name)
    oneType.forEach(element => {
      let type = document.createElement('span');
      type.classList.add(element);
      type.innerText = element;
      types.append(type);
    });

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

