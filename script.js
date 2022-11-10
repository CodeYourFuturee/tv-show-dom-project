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
//🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉
const episodeButton = document.getElementById("episode-button");
const idContainer = document.getElementById("container");
const containerAll = document.querySelector(".container");
const showContainer = document.querySelector(".show-container");
const liveSearchName = document.querySelector("#live_search");
const buttonName = document.querySelector("#search_name");
const buttonEpisode = document.querySelector("#episode-button");
const h3 = document.querySelector(".h3");
const formSelect = document.querySelector("#form-select");
const reset = document.querySelector("#reset");
const formSelectAllShow = document.querySelector("#form-select-all-show");
const episodeAll = document.querySelectorAll(".episode_all");
// const url = "https://api.tvmaze.com/shows/82/episodes";
const selLabel = document.querySelector("#sel-label");
//💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫
//💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫
function episodes(url) {
  buttonEpisode.addEventListener("click", function () {
    containerAll.innerHTML = "";
    containerAll.className = "container_all";
    async function fetchEpisode() {
      let response = await fetch(url);
      let data = await response.json();
      /** ForEch       */
      let AllEpisode = data;
      AllEpisode.forEach(item => {
        intro(item);
      });
    }
    fetchEpisode();
  });
}

//💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫
//💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫

function filterEpo(url) {
  buttonName.addEventListener("click", function (e) {
    e.preventDefault();
    containerAll.innerHTML = "";
    containerAll.className = "container_all";
    if (liveSearchName.value === "") {
      alert("Please enter a name");
    } else {
      async function fetchEpisode() {
        let response = await fetch(url);
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
    }
  });
}

//💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫
//💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫

async function fetchEpisode(url) {
  let response = await fetch(url);
  let data = await response.json();
  /** ForEch       */
  let AllEpisode = data;
  AllEpisode.forEach(item => {
    let morThan10 = "E" + item.number;
    let lessThan10 = "E0" + item.number;
    let options = document.createElement("option");
    options.setAttribute("value", `${item.url}`);
    options.textContent = `S0${item.season}${
      item.number >= 10 ? morThan10 : lessThan10
    }- ${item.name}`;
    formSelect.appendChild(options);
  });
  formSelect.addEventListener("change", function (e) {
    containerAll.innerHTML = "";
    containerAll.className = "container_all";
    let search = e.target.value;
    let searchResult = AllEpisode.filter(item => {
      return item.url.includes(search);
    });
    searchResult.forEach(item => {
      intro(item);
    });
  });
}
//🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧

async function fetchAllShows() {
  let nameUrl = "https://api.tvmaze.com/shows/";
  let response = await fetch("https://api.tvmaze.com/shows");
  let data = await response.json();
  /** ForEch       */
  let AllEpisode = data;
  AllEpisode.forEach(item => {
    let options = document.createElement("option");
    options.setAttribute("value", `${item.url}`);
    options.textContent = `${item.name}`;
    formSelectAllShow.appendChild(options);
  });
  formSelectAllShow.addEventListener("change", function (e) {
    showContainer.innerHTML = "";
    let search = e.target.value;
    let searchResult = AllEpisode.filter(item => {
      return item.url.includes(search);
    });
    searchResult.forEach(item => {
      introShow(item); //🌞
    });
  });
  //🌧

  formSelectAllShow.addEventListener("change", function (e) {
    // showContainer.innerHTML = "";
    let search = e.target.value;
    let searchResult = AllEpisode.filter(item => {
      return item.url.includes(search);
    });
    nameUrl += searchResult[0].id + "/episodes";
    episodeButton.textContent = "All Episodes" + " " + searchResult[0].name;
    selLabel.textContent = searchResult[0].name;
    console.log(searchResult[0].genres[0]);
    episodes(nameUrl);
    fetchEpisode(nameUrl);
    filterEpo(nameUrl);
  });
}
fetchAllShows();
//🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧🌧
reset.addEventListener("click", function () {
  location.reload();
});
//💫💫💫💫💫💫💫💫💫💫💫
function intro(item) {
  let morThan10 = "E" + item.number;
  let lessThan10 = "E0" + item.number;
  let html = `
  <section class="episode_all active">
  <div class="overall_ditail">
    <div class="episode_name text">${item.name}-S0${item.season}${
    item.number >= 10 ? morThan10 : lessThan10
  }</div>
    <div class="img">
      <img
        src="${item.image.medium}"
        alt=""
        width="150px"
        height="150px"
      />
    </div>
    <div class="text">
      ${item.summary}
    </div>
  </div>
</section>
`;
  containerAll.innerHTML += html;
}

function introShow(item) {
  let html = `<div id="allAreng">
  <div class="item-name_show">
    <h2>${item.name}</h2>
  </div>
  <section class="sec">
    <img id="img" src="${item.image.medium}" alt="" />
    <div class="text">${item.summary}</div>
    <div class="side-bar">
      <div class="item">Rated:  ${item.rating.average}</div>
      <div class="item">Genres:  ${item.genres[0]} | ${item.genres[1]}</div>
      <div class="item"> Status:  ${item.status}</div>
      <div class="item">Runtime:  ${item.runtime}</div>
    </div>
  </section>
</div>`;
  showContainer.innerHTML += html;
}
