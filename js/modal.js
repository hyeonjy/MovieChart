import { moviesData } from "./movie.js";
import { searchData } from "./search.js";
const sectionLists = document.querySelectorAll(`.section-list`);

sectionLists.forEach((sectionList) => {
  sectionList.addEventListener("click", (event) => {
    console.log("clicked!");
    //메인화면 - 영화포스터 클릭시
    if (event.target.classList.contains("movie-poster")) {
      console.log("click1!");
      const slide = event.target.closest(".swiper-slide");

      // 해당 영화의 아이디값을 가져와서 일치하는 데이터를 get
      const movieId = slide.getAttribute("data-movie-id");
      const selectedMovie = moviesData.find((movie) => movie.id == movieId);

      //모달을 보여줌
      showModal(selectedMovie);
    }
    // 검색화면 - 영화목록 클릭시
    else if (event.target.classList.contains("search-item")) {
      console.log("click2!");
      const itemWrap = event.target.closest(".search-item-wrap");

      // 해당 영화의 아이디값을 가져와서 일치하는 데이터를 get
      const movieId = itemWrap.getAttribute("data-movie-id");
      const selectedMovie = searchData.find((movie) => movie.id == movieId);

      //모달을 보여줌
      showModal(selectedMovie);
    }
  });
});

// 모달 생성
function showModal(movie) {
  const modalHtml = `
    <div class="modal-wrap">
      <div class="modal-content">
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
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHtml);

  // 닫힌 버튼을 누르면 모달끄기
  const closeButton = document.querySelector(".close-btn");
  closeButton.addEventListener("click", () => {
    document.querySelector(".modal-wrap").remove();
  });
}
