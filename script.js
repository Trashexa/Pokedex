const poke_contenedor = document.getElementById('poke-contenedor');
const pokemon_contador = 150;
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
}

const tipos_principales = Object.keys(colors);

const fetchPokemons = async ()=>{
	for(let i = 1; i <= pokemon_contador; i++){
		await getPokemon(i);
	}
}

const getPokemon = async (id) =>{
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const data = await res.json();
	createPokemonCard(data);
}

const createPokemonCard = (pokemon) =>{
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');

	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const id = pokemon.id.toString().padStart(3,'0');

	const poke_types = pokemon.types.map(type => type.type.name);
	const type = tipos_principales.find(type => poke_types.indexOf(type) > -1);
	const color = colors[type];

	pokemonEl.style.backgroundColor = color;
	const pokemonInnerHTML = `
	 <div class="img-contenedor">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"" alt="${name}">
    </div>
    <div class="info">
        <span class="numero">#${id}</span>
        <h3 class="nombre">${name}</h3>
        <small class="tipo">Tipo: <span>${type}</span> </small>
    </div>
    `;

    pokemonEl.innerHTML = pokemonInnerHTML;

    poke_contenedor.appendChild(pokemonEl);
}

fetchPokemons();