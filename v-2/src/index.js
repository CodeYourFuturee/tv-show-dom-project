//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

window.onload = setup;
//🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉
import {
  liveSearchName,
  buttonName,
  buttonEpisode,
  h3,
  formSelect,
  reset,
} from "./render/variable.js";

import intro from "./render/select.js";
import "./assets/css/tvshow.css";
// import fetch from "./tools/request.js";
//💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫

buttonEpisode.addEventListener("click", function () {
  async function fetchEpisode() {
    let response = await fetch(`https://api.tvmaze.com/shows/82/episodes`);
    let data = await response.json();
    /** ForEch       */
    let AllEpisode = data;
    AllEpisode.forEach(item => {
      intro(item);
    });
  }
  fetchEpisode();
});

//💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫
//💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫
buttonName.addEventListener("click", function (e) {
  e.preventDefault();
  async function fetchEpisode() {
    let response = await fetch(`https://api.tvmaze.com/shows/82/episodes`);
    let data = await response.json();
    /** ForEch       */
    let AllEpisode = data;
    let search = liveSearchName.value;
    let searchResult = AllEpisode.filter(item => {
      let textName = item.name.toLowerCase();
      let textSummary = item.summary.toLowerCase();
      let allText = textName + textSummary;
      return allText.includes(search.toLowerCase());
    });

    searchResult.forEach(item => {
      h3.textContent = `Displaying ${searchResult.length}/${AllEpisode.length} episodes`;
      intro(item);
    });
  }

  fetchEpisode();
});

//💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫
//💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫

async function fetchEpisode() {
  let response = await fetch(`https://api.tvmaze.com/shows/82/episodes`);
  let data = await response.json();
  /** ForEch       */
  let AllEpisode = data;
  AllEpisode.forEach(item => {
    let options = document.createElement("option");
    options.setAttribute("value", `${item.url}`);
    options.textContent = `S0${item.season}E0${item.number}- ${item.name}`;
    // let link = document.createElement("a");
    // link.href = `${item.url}`;
    // link.textContent = `S0${item.season}E0${item.number}- ${item.name}`;

    // options.appendChild(link);
    formSelect.appendChild(options);
  });
}
fetchEpisode();

reset.addEventListener("click", function () {
  location.reload();
});
