const APIs = [
  {
    category: "all", url:  "https://ihatov08.github.io/kimetsu_api/api/all.json"
  },
  {
    category: "hashira", url: "https://ihatov08.github.io/kimetsu_api/api/hashira.json"
  },
  {
    category: "oni", url: "https://ihatov08.github.io/kimetsu_api/api/oni.json"
  },
  {
    category: "kisatsutai", url: "https://ihatov08.github.io/kimetsu_api/api/kisatsutai.json"
  }
]

const $P = document.getElementById("loading");
const $DIV_CHARACTERS_CONTAINER = document.getElementById("character-container");
const $INPUTS = document.getElementsByName("character");

let $DIV_IMG, $DIV_CHARACTERS_COLUMN, $H2, $IMG, $SPAN;

const loading = () => {
  return new Promise((resolve) => {
    $P.innerText = "Loading...";
    setTimeout(() => {
      resolve();
    }, 100)
  })
}

const fetchCharacters = async (api) => {
  const res = await fetch(api);
  const characters = await res.json();
  return characters;
}

const removeCurrentElements = async () => {
  while( $DIV_CHARACTERS_CONTAINER.firstChild ){
    $DIV_CHARACTERS_CONTAINER.removeChild( $DIV_CHARACTERS_CONTAINER.firstChild );
  }
}

const createElements = async (characters) => {
  $P.innerText = "";
  const groups = Object.groupBy(characters, ({category}) => category);
  const categories = Object.keys(groups);
  categories.forEach(category => {
    $DIV_CHARACTERS_COLUMN = document.createElement("div");
    $H2 = document.createElement("h2");
    $DIV_IMG = document.createElement("div");
    $DIV_CHARACTERS_COLUMN.appendChild($H2);
    $DIV_CHARACTERS_COLUMN.appendChild($DIV_IMG);
    $DIV_IMG.id = "character-img";
    $DIV_CHARACTERS_COLUMN.className = "character-column";
    $H2.innerText = category;
    $DIV_CHARACTERS_CONTAINER.appendChild($DIV_CHARACTERS_COLUMN);
    characters.forEach(character => {
      $SPAN = document.createElement("span");
      $IMG = document.createElement("img");
      $SPAN.innerText = character.name;
      $IMG.style.width = "100%";
      $IMG.style.height = "auto";
      $IMG.src = "https://ihatov08.github.io" + character.image;
      if (category == character.category) {
        $DIV_IMG.appendChild($SPAN);
        $DIV_IMG.appendChild($IMG)
      };
    })
  })

  $DIV_CHARACTERS_CONTAINER.style.display = 'flex';
  $DIV_CHARACTERS_CONTAINER.style.justifyContent = 'space-between';
  $DIV_CHARACTERS_CONTAINER.style.alignItems = 'flex-start';
}

const putCharacters = async (api) => {
  await removeCurrentElements();
  await loading();
  const targetAPI = APIs.find((API) => API.category == api)
  const characters = await fetchCharacters(targetAPI.url);
  await createElements(characters);
}

const putCharacterList = () => {
  $INPUTS.forEach($input => {
    $input.addEventListener("click", () => {
      if ($P.innerText == "Loading...") return;
      $input.checked = true;
      putCharacters($input.id);
    })
  })
}

putCharacters("all");
putCharacterList();