import { BASE_PATH, options } from "./movie.js";

const searchContainer = document.querySelector(".search-wrap");
const searchIcon = document.querySelector(".search-icon");
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
  renderSearch(data.results, input);
}

// 검색관련 영화목록
function renderSearch(movies, input) {
  // 기존 화면 지우기
  const sectionLists = document.querySelectorAll(".section-list");
  const searchList = document.querySelector(".search-list");
  const frame = document.querySelector(".video-frame");

  frame.innerHTML = "";
  sectionLists.forEach((sectionList) => {
    sectionList.innerHTML = "";
  });

  // 검색 화면 목록 나오도록
  const searchContent = movies
    .map(
      (movie) =>
        `<div class="search-item-wrap" key="${movie.id}" data-movie-id="${movie.id}">
          <img class="search-img search-item" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" />
          <h1 class="search-item">${movie.title}</h1>
        </div>`
    )
    .join("");

  searchList.innerHTML = searchContent;
}

// 검색어 입력시
form.addEventListener("submit", function (event) {
  event.preventDefault();
  window.scrollTo(0, 0);

  console.log(searchInput.value);
  searchMovies(searchInput.value);
});
