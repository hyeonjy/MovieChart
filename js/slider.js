export function initializeSwiper(index) {
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
