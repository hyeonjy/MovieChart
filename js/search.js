const searchContainer = document.querySelector(".search-wrap");
const searchIcon = document.querySelector(".search-icon");
const searchInput = document.getElementById("search-input");

let isSearchOpen = false;

//검색 아이콘 클릭시 input이 보이도록
searchIcon.addEventListener("click", () => {
  isSearchOpen = !isSearchOpen;
  searchContainer.classList.toggle("active");
});

//input 외부요소 클릭시 닫힘
function handleClickOuter(event) {
  if (isSearchOpen && !searchContainer.contains(event.target)) {
    isSearchOpen = false;
    searchContainer.classList.toggle("active");
  }
}

document.addEventListener("click", handleClickOuter);
