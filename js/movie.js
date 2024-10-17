import config from "./apikey.js";

const BASE_PATH = "https://api.themoviedb.org/3";

const AUTHORIZATION = config.Authorization;

const options = {
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
    console.log(data.results);
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
  const popularMoviesUrl = `${BASE_PATH}/movie/popular?language=ko&page=1&region=KR`;
  const popularMovies = await fetchMovies(popularMoviesUrl);
  renderMovies(popularMovies, "인기있는 영화 순위", 1);

  const topRatedMoviesUrl = `${BASE_PATH}/movie/top_rated?language=ko&page=1&region=KR`;
  const topRatedMovies = await fetchMovies(topRatedMoviesUrl);
  renderMovies(topRatedMovies, "찬사를 받은 영화", 2);
}

displayMovies();
