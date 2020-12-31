const poke_container = document.getElementById('poke_container');
const pokemons_number = 150;
const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};

const main_types = Object.keys(colors);

const fetchPokemons = async () => {
    for(let i =1; i<=pokemons_number; i++){
        await getPokemons(i);
    }
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon  = await res.json();
    console.log(pokemon);
    createPokemonCard(pokemon);
}

const getPokemons = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon  = await res.json();
    console.log(pokemon);
    createPokemonCard(pokemon);
}
    
fetchPokemons();

function createPokemonCard(pokemon) {
    const pokemonEL = document.createElement('div');
    pokemonEL.classList.add('pokemon');

    const poke_types = pokemon.types.map(el => el.type.name);
    
    const type = main_types.find(type => poke_types.indexOf(type) > -1);
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const color = colors[type];

    pokemonEL.style.backgroundColor = color;

    const pokeInnerHTML = `
    <div onClick="selectPokemon(${pokemon.id})">
        <div class="img-container">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png">
        </div>
        <div class="info">
            <span class="number">${pokemon.id.toString().padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
        </div>
    </div>
    `;

    pokemonEL.innerHTML = pokeInnerHTML;

    poke_container.appendChild(pokemonEL);
};

const selectPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    displayPopup(pokemon);
}

const displayPopup = (pokemon) => {
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const poke_types = pokemon.types.map(el => el.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);

    const htmlString = `
    <div class="popup" id="popup">
        <button id="closeBtn" onClick="closePopup()">Close</button>
        <div class="img-container">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png">
        </div>
        <div class="info">
            <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <p><small>Height: </small>${pokemon.height} &ensp;
            <small> Weight: </small>${pokemon.weight} &ensp;
            <small>Type: </small>${type}
        </div>
    </div>
    `;
    poke_container.innerHTML = htmlString 
      + poke_container.innerHTML;
    console.log(htmlString);
};
  
const closePopup = () => {
    const popup = document.querySelector('.popup'); 
    popup.parentElement.removeChild(popup);
}
  

