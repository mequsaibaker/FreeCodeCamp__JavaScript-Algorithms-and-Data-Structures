const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokeName = document.getElementById("pokemon-name");
const pokeId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const pokeImg = document.getElementById("poke-img");

const colours = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

const displayStats = (stats) => {
  Object.keys(stats).forEach((key) => {
    document.getElementById(stats[key].stat.name).textContent =
      stats[key].base_stat;
  });
};

const displayInfo = (id, name, weightV, heightV) => {
  pokeId.textContent = "#" + id;
  pokeName.textContent = name.toUpperCase();
  weight.textContent = "Weight: " + weightV;
  height.textContent = "Height: " + heightV;
};

const displayImg = (sprites, name) => {
  pokeImg.innerHTML = `<img id="sprite" src="${sprites.front_default}" alt="${name}" />`;
};

const displayTypes = (typesV) => {
  types.innerHTML = "";
  Object.keys(typesV).forEach((key) => {
    types.innerHTML += `<span class="type-tag" style="background-color:${
      colours[typesV[key].type.name]
    };">${typesV[key].type.name.toUpperCase()}</span>`;
  });
};

const updateUI = (pokeData) => {
  const { stats, id, name, weight, height, sprites, types } = pokeData;
  console.log(pokeData);
  console.log(pokeData.stats);
  displayStats(stats);
  displayInfo(id, name, weight, height);
  displayImg(sprites, name);
  displayTypes(types);
};

const getPokemonData = async (searchTerm) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
    const data = await res.json();
    updateUI(data);
  } catch (err) {
    alert("Pokémon not found");
  }
};

searchBtn.addEventListener("click", () => {
  if (searchInput.value) {
    const pokeData = getPokemonData(searchInput.value.toLowerCase());
  }
});

// console.log(getPokemonData("88"));
