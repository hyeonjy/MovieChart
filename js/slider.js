export function initializeSwipers() {
  const swipersConfig = [
    {
      container: "#swiper1",
      next: "#next1",
      prev: "#prev1",
    },
    {
      container: "#swiper2",
      next: "#next2",
      prev: "#prev2",
    },
  ];

  swipersConfig.forEach((config) => {
    new Swiper(config.container, {
      slidesPerView: 1,
      spaceBetween: 100, //아이템 사이 간격
      navigation: {
        nextEl: config.next,
        prevEl: config.prev,
      },
      // autoplay: {
      //   // 자동 슬라이드 설정
      //   delay: 3000,
      //   disableOnInteraction: false,
      // },
      loop: true,
      breakpoints: {
        500: {
          slidesPerView: 2,
          spaceBetween: 50,
          slidesPerGroup: 2,
        },
        800: {
          slidesPerView: 3,
          spaceBetween: 20,
          slidesPerGroup: 3,
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
  });
}
