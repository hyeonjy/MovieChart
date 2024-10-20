import { moviesData } from "./movie.js";
import { searchData } from "./search.js";

const sectionLists = document.querySelector(`.section-container`);
const modalOverlay = document.querySelector(".modal-overlay");
const modal = document.querySelector(".modal-wrap");

sectionLists.addEventListener("click", (event) => {
  if (event.target === event.currentTarget) return; // 부모 요소인 경우 취소

  let targetElement = null;
  let dataList = null;

  //1. 메인화면 - 영화포스터 클릭시
  if (event.target.classList.contains("movie-poster")) {
    console.log("click1!");
    targetElement = event.target.closest(".swiper-slide");
    dataList = moviesData;
  }
  // 2. 검색화면 - 영화목록 클릭시
  else if (event.target.classList.contains("search-item")) {
    console.log("click2!");
    targetElement = event.target.closest(".search-item-wrap");
    dataList = searchData;
  }

  // 해당 영화의 아이디값을 가져와서 일치하는 데이터를 가져옴
  const movieId = targetElement.getAttribute("data-movie-id");
  const selectedMovie = dataList.find((movie) => movie.id == movieId);

  showModal(selectedMovie);
});

// 모달 생성
function showModal(movie) {
  const modalHtml = `
      <div class="modal-header">
        <div class="close-btn"><i class="fa-solid fa-x"></i></div>
        <img
          class="modal-poster"
          src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
          alt="${movie.title}"
        />
        <h2 class="modal-title">${movie.title}</h2>
        <div class="heart-box">
          <i class="fa-solid fa-heart heart-icon"></i>
          <span>찜하기</span>
        </div>
      </div>
      <div class="modal-detail">
        <p class="modal-overview">
          ${movie.overview.slice(0, 97)}...
        </p>
        <div class="modal-info">
          <span>상영일: 2024-06-25</span>
          <span>평점: 7.31점</span>
        </div>
      </div>
  `;

  modal.innerHTML = modalHtml;

  modalOverlay.style.display = "block";
  modal.style.display = "block";

  // 닫힌 버튼을 누르면 모달끄기
  const closeButton = document.querySelector(".close-btn");
  closeButton.addEventListener("click", closeModal);
}

// 모달 닫기
function closeModal() {
  modal.innerHTML = "";
  modalOverlay.style.display = "none";
  modal.style.display = "none";
}

// 외부요소 클릭 시 모달 닫기
modalOverlay.addEventListener("click", (event) => {
  if (event.target === modalOverlay) {
    closeModal();
  }
});
