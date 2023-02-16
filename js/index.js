const refresh = document.getElementById("refresh");

refresh.addEventListener("click", () => {
  location.reload();
});

document.addEventListener("DOMContentLoaded", () => {
  const random = aleatorio(1, 151);
  fetchPokemon(random);
});

const aleatorio = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const fetchPokemon = async (id) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    console.log(data);

    const pokemon = {
      img: data.sprites.other.dream_world.front_default,
      name: data.name,
      id: data.id,
      experience: data.base_experience,
      attack: data.stats[1].base_stat,
      special: data.stats[2].base_stat,
      defense: data.stats[3].base_stat,
    };

    pintarCard(pokemon);
  } catch (error) {
    console.log(error);
  }
};

const pintarCard = (pokemon) => {
  const $main = document.getElementById("main");
  const $template = document.getElementById("template-card").content;
  const $clone = $template.cloneNode(true);
  const $fragment = document.createDocumentFragment();

  $clone.querySelector(".card-body-img").setAttribute("src", pokemon.img);
  $clone.querySelector(".card-body-img").setAttribute("title", pokemon.name);
  $clone.querySelector(".card-body-title").innerHTML = `${pokemon.name} <span id="span">#${pokemon.id}</span> `;
  $clone.querySelector(".card-body-text").textContent =
    pokemon.experience + " Exp";
  $clone.querySelectorAll(".card-footer-social h3")[0].textContent =
    pokemon.attack;
  $clone.querySelectorAll(".card-footer-social h3")[1].textContent =
    pokemon.special;
  $clone.querySelectorAll(".card-footer-social h3")[2].textContent =
    pokemon.defense;

  $fragment.appendChild($clone);
  $main.appendChild($fragment);
};
