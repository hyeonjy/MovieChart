import { BASE_PATH, options } from "./movie.js";

const searchInput = document.getElementById("search-input");
const form = document.querySelector(".search-form");

export let searchData = [];

// 검색어와 연관된 영화 데이터 가져오기
async function searchMovies(input) {
  const data = await (
    await fetch(
      `${BASE_PATH}/search/movie?query=${input}&include_adult=false&language=ko&page=1`,
      options
    )
  ).json();

  searchData = [...data.results];
  renderList(data.results, "search-item");
}

// 검색관련 영화목록
export function renderList(movies, type) {
  // 기존 화면 지우기
  const sectionLists = document.querySelectorAll(".section-list");
  const searchList = document.querySelector(".search-list");
  const frame = document.querySelector(".video-frame");

  frame.innerHTML = "";
  sectionLists.forEach((sectionList) => {
    sectionList.innerHTML = "";
  });

  let searchContent = "";

  // 영화 목록 나오도록
  // 영화 데이터가 없으면
  if (!movies.length) {
    searchContent = `<div class="empty-item"><span>목록이 존재하지 않습니다.</span></div>`;
  }
  // 영화 데이터가 있으면
  else {
    searchContent = movies
      .map(
        (movie) =>
          `<div class="search-item-wrap" key="${movie.id}" data-movie-id="${movie.id}">
          <img class="search-img ${type}" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" />
          <h1 class="${type}">${movie.title}</h1>
        </div>`
      )
      .join("");
  }

  searchList.innerHTML = searchContent;
}

// 검색어 입력시
form.addEventListener("submit", function (event) {
  event.preventDefault();
  window.scrollTo(0, 0);

  searchMovies(searchInput.value);
});
