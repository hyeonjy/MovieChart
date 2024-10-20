import config from "./apikey.js";

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
    const response = await fetch(url, options);
    const data = await response.json();
    // console.log(data.results);
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

function initializeSwiper(index) {
  const config = {
    container: `#swiper${index}`,
    next: `#next${index}`,
    prev: `#prev${index}`,
  };

  const swiper = new Swiper(config.container, {
    slidesPerView: 1,
    spaceBetween: 100,
    navigation: {
      nextEl: config.next,
      prevEl: config.prev,
    },
    // autoplay: {
    //   delay: 3000,
    //   disableOnInteraction: false,
    // },
    loop: true,
    loopAdditionalSlides: 0,
    breakpoints: {
      600: {
        slidesPerView: 2,
        spaceBetween: 100,
        slidesPerGroup: 2,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 20,
        slidesPerGroup: 4,
      },
      1200: {
        slidesPerView: 5,
        spaceBetween: 20,
        slidesPerGroup: 5,
      },
    },
  });
}

async function displayMovies() {
  const popularMoviesUrl = `${BASE_PATH}/movie/popular?language=ko&region=KR`;
  const popularMovies = await fetchMovies(popularMoviesUrl);
  renderMovies(popularMovies, "인기있는 영화 순위", 1);

  const topRatedMoviesUrl = `${BASE_PATH}/movie/top_rated?language=ko&region=KR`;
  const topRatedMovies = await fetchMovies(topRatedMoviesUrl);
  renderMovies(topRatedMovies, "찬사를 받은 영화", 2);

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

const getVideos = async (id) => {
  const data = await (
    await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=ko-KR`
    )
  ).json();

  return data.results;
};

async function showBanner(data) {
  console.log("data: ", data);
  let key = data.length === 0 ? DEFAULT_KEY : data[0].key;
  // console.log("key: ", key);
  const frame = document.querySelector(".video-frame");
  const videoHtml = `<iframe
        width="100%"
        height="830px"
        src="https://www.youtube.com/embed/${key}?autoplay=1&muto=0&loop=1&modestbranding=1&playlist=${key}&controls=0&enablejsapi=1"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>`;
  frame.innerHTML = videoHtml;
}
