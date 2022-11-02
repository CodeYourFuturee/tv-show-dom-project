import select from "../render/select.js";

async function fetchEpisode() {
  let response = await fetch(`https://api.tvmaze.com/shows/82/episodes`);
  let data = await response.json();
  /** ForEch       */
  let AllEpisode = data;
  AllEpisode.forEach(item => {
    select(item);
  });
}

export default fetchEpisode;
