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
const containerAll = document.querySelector(".contanair");
const liveSearchName = document.querySelector("#live_search");
const buttonName = document.querySelector("#search_name");
const buttonEpisode = document.querySelector("#episode-button");
const h3 = document.querySelector(".h3");
const formSelect = document.querySelector("#form-select");
const reset = document.querySelector("#reset");
const url = "https://api.tvmaze.com/shows/82/episodes";

//💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫
//💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫

buttonEpisode.addEventListener("click", function () {
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

//💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫
//💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫
buttonName.addEventListener("click", function (e) {
  e.preventDefault();
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

//💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫
//💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫💫

async function fetchEpisode() {
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
}
fetchEpisode();

reset.addEventListener("click", function () {
  location.reload();
});
//💫💫💫💫💫💫💫💫💫💫💫
function intro(item) {
  let html = `<section class="episode_all">
  <div class="overall_ditail">
    <div class="episode_name text">${item.name}-S0${item.season}E0${item.number}</div>
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
</section>`;
  containerAll.insertAdjacentHTML("beforebegin", html);
  // containerAll.getElementsByClassName.opacity = 1;
}
