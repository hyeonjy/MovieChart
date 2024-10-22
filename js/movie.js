import config from "./apikey.js";
import { initializeSwiper } from "./slider.js";

export const BASE_PATH = "https://api.themoviedb.org/3";

const AUTHORIZATION = config.Authorization;
const API_KEY = config.Apikey;
const DEFAULT_KEY = config.DefaultKey;
const logo = document.getElementById("logo");
const home = document.querySelector(".item-home");

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: AUTHORIZATION,
  },
};

export let moviesData = [];

async function fetchMovies(url) {
  try {
    const data = await (await fetch(url, options)).json();
    moviesData = [...moviesData, ...data.results];

    return data.results;
  } catch (error) {
    console.error(`Error fetching movies from ${url}: `, error);
  }
}

function renderMovies(movies, title, index) {
  const sectionList = document.querySelector(`.slide${index}`);
  const swiperWrapperContent = movies
    .map(
      (movie) =>
        `<div class="swiper-slide" key="${movie.id}" data-movie-id="${movie.id}">
          <img class="movie-poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" />
        </div>`
    )
    .join("");

  const swiperHtml = `
    <h1 class="section-title">${title}</h1>
    <div class="swiper mySwiper" id="swiper${index}">
      <div class="swiper-wrapper">
        ${swiperWrapperContent}
      </div>
    </div>
    <div class="swiper-button-prev" id="prev${index}"></div>
    <div class="swiper-button-next" id="next${index}"></div>
  `;

  sectionList.innerHTML = swiperHtml;
  initializeSwiper(index);
}

async function displayMovies() {
  const popularMoviesUrl = `${BASE_PATH}/movie/popular?language=ko&region=KR`;
  const popularMovies = await fetchMovies(popularMoviesUrl);
  renderMovies(popularMovies, "인기있는 영화", 1);

  const nowPlayingUrl = `${BASE_PATH}/movie/now_playing?language=ko`;
  const nowPlaying = await fetchMovies(nowPlayingUrl);
  renderMovies(nowPlaying, "지금 볼 수 있는 영화", 2);

  const id = moviesData[Math.ceil(Math.random() * (moviesData.length - 1))].id;
  const videoData = await getVideos(id);
  showBanner(videoData);
}

displayMovies();

// 로고나 홈 메뉴 클릭 시
logo.addEventListener("click", () => {
  // 기존 화면 지우기
  const searchList = document.querySelector(".search-list");
  searchList.innerHTML = "";

  displayMovies();
});
home.addEventListener("click", () => {
  // 기존 화면 지우기
  const searchList = document.querySelector(".search-list");
  searchList.innerHTML = "";

  displayMovies();
});

export const getVideos = async (id) => {
  const data = await (
    await fetch(
      `${BASE_PATH}/movie/${id}/videos?api_key=${API_KEY}&language=ko-KR`
    )
  ).json();

  return data.results;
};

async function showBanner(data) {
  let key = data.length === 0 ? DEFAULT_KEY : data[0].key;

  const frame = document.querySelector(".video-frame");
  const videoHtml = `<iframe
        width="100%"
        height="830px"
        title="YouTube video player"
        src="https://www.youtube.com/embed/${key}?autoplay=0&muto=1&loop=1&modestbranding=1&playlist=${key}&controls=0&enablejsapi=1"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>`;
  frame.innerHTML = videoHtml;
}
