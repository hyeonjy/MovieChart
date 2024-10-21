import { renderList } from "./search.js";

const favoriateItem = document.querySelector(".item-favoriate");

export let favoriateData = JSON.parse(localStorage.getItem("favoriate")) || [];
export let favoriateId = JSON.parse(localStorage.getItem("favoriateId")) || [];

// favoriate 로컬스토리지 저장, 삭제
export function handleHeartBoxClick(movie, heartBox) {
  heartBox.addEventListener("click", (event) => {
    if (!heartBox.classList.contains("full-heart")) {
      favoriateData.push(movie);
      favoriateId.push(movie.id);
    } else {
      favoriateData = favoriateData.filter((data) => data.id !== movie.id);
      favoriateId = favoriateId.filter((id) => id !== movie.id);
    }

    localStorage.setItem("favoriate", JSON.stringify(favoriateData));
    localStorage.setItem("favoriateId", JSON.stringify(favoriateId));

    // favoriate page에서 좋아요 취소시 다시 렌더링
    if (event.target.classList.contains("favoriate-page")) {
      renderList(favoriateData, "favoriate-item");
    }

    heartBox.classList.toggle("full-heart");
  });
}

// favoriate 메뉴 클릭 시
favoriateItem.addEventListener("click", () => {
  renderList(favoriateData, "favoriate-item");
});
