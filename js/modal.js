import { handleHeartBoxClick } from "./favoriate.js";
import { BASE_PATH, options } from "./movie.js";

const sectionLists = document.querySelector(`.section-container`);
const modalOverlay = document.querySelector(".modal-overlay");
const modal = document.querySelector(".modal-wrap");

sectionLists.addEventListener("click", (event) => {
  if (event.target === event.currentTarget) return; // 부모 요소인 경우 취소

  let targetElement = null;

  //1. 메인화면 - 영화포스터 클릭시
  if (event.target.classList.contains("movie-poster")) {
    targetElement = event.target.closest(".swiper-slide");
  }
  // 2. 검색화면, 좋아요 - 영화목록 클릭시
  else if (
    event.target.classList.contains("search-item") ||
    event.target.classList.contains("favoriate-item")
  ) {
    targetElement = event.target.closest(".search-item-wrap");
  }

  // 해당 영화의 아이디값을 가져오기
  const movieId = targetElement.getAttribute("data-movie-id");

  if (event.target.classList.contains("favoriate-item")) {
    showModal(movieId, "favoriate-page");
  } else {
    showModal(movieId);
  }
});

// 모달 생성
async function showModal(movieId, page = "") {
  const savedFavoriateId = JSON.parse(localStorage.getItem("favoriateId"));
  const movie = await (
    await fetch(`${BASE_PATH}/movie/${movieId}?language=ko`, options)
  ).json();

  const modalHtml = `
      <div class="modal-header">
        <div class="close-btn"><i class="fa-solid fa-x"></i></div>
        <img
          class="modal-poster"
          src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
          alt="${movie.title}"
        />
        <h2 class="modal-title">${movie.title}</h2>
        <div class="heart-box ${
          savedFavoriateId && savedFavoriateId.includes(movie.id)
            ? "full-heart"
            : ""
        } ${page}">
          <i class="fa-solid fa-heart heart-icon ${page}"></i>
          <span class="${page}">찜하기</span>
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

  // 하트 박스 클릭 이벤트 핸들러
  const heartBox = document.querySelector(".heart-box");
  handleHeartBoxClick(movie, heartBox);
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
