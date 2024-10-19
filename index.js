const ALL_API = "https://ihatov08.github.io/kimetsu_api/api/all.json";
      HASHIRA_API = "https://ihatov08.github.io/kimetsu_api/api/hashira.json";
      ONI_API = "https://ihatov08.github.io/kimetsu_api/api/oni.json";
      KISATSUTAI_API = "https://ihatov08.github.io/kimetsu_api/api/kisatsutai.json";
const $INPUTS = document.querySelectorAll("input[name=characters]");
const $UL_ALL = document.getElementById("all");
const $UL_HASHIRA = document.getElementById("hashira");
const $UL_ONI = document.getElementById("oni");
const $UL_KISATSUTAI = document.getElementById("kisatsutai");
const $P = document.getElementById("loading");
const $LI_HASHIRA = document.createElement("li");
const $LI_ONI = document.createElement("li");
const $LI_KISATSUTAI = document.createElement("li");
const $DIV_CHARACTERS_CONTAINER = document.getElementById("character-container");

let $DIV_IMG, $DIV_CHARACTERS_COLUMN;

const loading = () => {
  return new Promise((resolve) => {
    console.log('Loading');
    setTimeout(() => {
      resolve();
    }, 0)
  })
}

const fetchCharacters = async (api) => {
  const res = await fetch(api);
  const characters = await res.json();
  return characters;
}


const createElements = async (characters) => {
  const groups = Object.groupBy(characters, ({category}) => category);
  const categories = Object.keys(groups);
  categories.forEach(category => {
    $DIV_CHARACTERS_COLUMN = document.createElement("div");
    const $H2 = document.createElement("h2");
    $DIV_IMG = document.createElement("div");
    $DIV_CHARACTERS_COLUMN.appendChild($H2);
    $DIV_CHARACTERS_COLUMN.appendChild($DIV_IMG);
    $DIV_CHARACTERS_COLUMN.className = "character-column";
    $H2.innerText = category;
    $DIV_CHARACTERS_CONTAINER.appendChild($DIV_CHARACTERS_COLUMN);
    characters.forEach(character => {
      const $IMG = document.createElement("img");
      $IMG.style.width = "100%";
      $IMG.style.height = "auto";
      $IMG.src = "https://ihatov08.github.io" + character.image;
      if (category == character.category) $DIV_IMG.appendChild($IMG);
    })
  })

  $DIV_CHARACTERS_CONTAINER.style.display = 'flex';
  $DIV_CHARACTERS_CONTAINER.style.justifyContent = 'space-between';
  $DIV_CHARACTERS_CONTAINER.style.alignItems = 'flex-start';
  $DIV_CHARACTERS_COLUMN.appendChild($DIV_CATEGORY);
  $DIV_CATEGORY.appendChild($IMG);
}


const putCharacters = async () => {
  await loading();
  let characters = await fetchCharacters(ALL_API);
  await createElements(characters);
}

putCharacters();

// loading();
// fetchCharacters(ALL_API);

// const removePreviousLis =  () => {
//   const $prevLis = document.querySelectorAll(".character");
//   $prevLis.forEach($prevLi => {
//     $UL_ALL.removeChild($prevLi);
//   })
// }

// $INPUTS.forEach($input => {
//   $input.addEventListener("click", () => {
//     if (!$input.checked) return;
//     removePreviousLis();
//   })
// });

// window.addEventListener("load", { handleEvent: fecthApi(ALL_API) });
// window.addEventListener("load", () => {
//   console.log("load: リソースファイルを全て読み込みました。");
//   loading();
//   fetchCharacters(HASHIRA_API);
// });