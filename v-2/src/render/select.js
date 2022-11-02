import { containerAll } from "./variable.js";

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
  containerAll.getElementsByClassName.opacity = 1;
}

export default intro;
