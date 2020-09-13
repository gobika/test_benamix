import {Swiper, Navigation, Pagination, Scrollbar, EffectCoverflow} from 'swiper';

export class mainPage {

  constructor() {
    Swiper.use([Navigation, Pagination, Scrollbar, EffectCoverflow]);

    this.initHeroSlider();
    this.initProductsSlider();
  }

  initHeroSlider() {
    let selector = '.hero__slider';

    new Swiper(selector, {
      slidesPerView: 1,
      pagination: {
        el: `.hero__pager`,
      },
      navigation: {
        prevEl: '.hero-nav-prev',
        nextEl: '.hero-nav-next',
      }
    });
  }

  initProductsSlider() {
    let selector = '.products__slider';

    new Swiper(selector, {
      slidesPerView: 3,
      spaceBetween: 30,
      navigation: {
        nextEl: '.products-nav-next',
        prevEl: '.products-nav-prev',
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        1280: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
      }
    });
  }
}
