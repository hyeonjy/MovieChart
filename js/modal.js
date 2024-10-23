import { handleHeartBoxClick } from "./favoriate.js";
import { BASE_PATH, getVideos, options } from "./movie.js";

const sectionLists = document.querySelector(`.section-container`);
const modalOverlay = document.querySelector(".modal-overlay");
const modal = document.querySelector(".modal-wrap");

sectionLists.addEventListener("click", (event) => {
  if (event.target === event.currentTarget) return; // 부모 요소인 경우 취소

  const targetClass = event.target.classList;
  if (
    targetClass.contains("swiper-button-next") ||
    targetClass.contains("swiper-wrapper") ||
    targetClass.contains("section-title") ||
    targetClass.contains("section-list") ||
    targetClass.contains("swiper")
  ) {
    return;
  }

  // 해당 영화의 아이디값을 가져오기
  const parentElement = event.target.closest("[data-movie-id]");
  let movieId = parentElement.getAttribute("data-movie-id");

  // 모달 띄우기
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
  const videoData = await getVideos(movieId);

  const mediaContent = !videoData.length
    ? `<img class="modal-poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}" />`
    : `<iframe class="video" width="100%" height="700px" title="YouTube video player" src="https://www.youtube.com/embed/${videoData[0].key}?autoplay=0&muto=1&loop=1&modestbranding=1&playlist=${videoData[0].key}&controls=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>`;

  const modalHtml = `
      <div class="modal-header">
        <div class="close-btn"><i class="fa-solid fa-x"></i></div>
        ${mediaContent}
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
        <div class="modal-main">
          <h2 class="modal-title">${movie.title}</h2>
          <p class="modal-overview">
            ${movie.overview.slice(0, 97)}...
          </p>
        </div>
        <div class="modal-info">
          <span>📆 상영일: 2024-06-25</span>
          <span>⭐️ 평점: ${movie.vote_average.toFixed(2)}점</span>
        </div>
      </div>
  `;

  modal.innerHTML = modalHtml;

  modalOverlay.style.display = "block";
  modal.style.display = "block";

  // 모달 외부화면 스크롤 방지
  document.body.classList.add("no-scroll");

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

  document.body.classList.remove("no-scroll");
}

// 외부요소 클릭 시 모달 닫기
modalOverlay.addEventListener("click", (event) => {
  if (event.target === modalOverlay) {
    closeModal();
  }
});
