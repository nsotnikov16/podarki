//Пункты меню каталога
const header = document.querySelector('.header')
const catalogBtn = header.querySelector('.header__catalog')
const copyLinksCatalog = header.querySelector('.header__container .menu__expand.copy').cloneNode(true)
catalogBtn.append(copyLinksCatalog)

//Мобильное меню
const headerMobileBottom = header.querySelector('.header__mobile-bottom')
const headerMobileinfo = header.querySelector('.header__mobile-info')
const headerMenuCopy = header.querySelector('.header__menu').cloneNode(true)
const headerAddressCopy = header.querySelector('.header__address').cloneNode(true)
const headerSocialCopy = header.querySelector('.header__social').cloneNode(true)
headerMobileBottom.prepend(headerMenuCopy)
Array.from([headerAddressCopy, headerSocialCopy]).forEach(item => headerMobileinfo.append(item))

//Двухуровневое мобильное меню 
const headerMobileLinks = document.querySelectorAll('.header__mobile .menu__link')
headerMobileLinks.forEach(item => item.addEventListener('click', (e) => {
    e.preventDefault()
    item.parentNode.classList.toggle('open')
}))

// Бургер
const burger = header.querySelector('.header__burger')
burger.addEventListener('click', () => Array.from([burger, headerMobileBottom]).forEach(item => item.classList.toggle('open')))

// Поиск мобилка
const btnSearchOpen = header.querySelector('.search__btn_outForm')
const btnSearchClose = header.querySelector('.search__close')
const headerMobileRight = header.querySelector('.header__mobile-right')
btnSearchOpen.addEventListener('click', () => headerMobileRight.classList.add('search-open'))
btnSearchClose.addEventListener('click', () => headerMobileRight.classList.remove('search-open'))

// Свайпер фото подарка
const swipersCatalog = document.querySelectorAll('.catalog__swiper')
if (swipersCatalog.length > 0) {
    swipersCatalog.forEach((swiper, ind) => {
        swiper.classList.add(`catalog__swiper_${ind + 1}`)
        var swiperCatalog = new Swiper(`.catalog__swiper_${ind + 1}`, {
            loop: true,
            pagination: {
                el: `.catalog__swiper_${ind + 1} .swiper-pagination`,
                clickable: true,
            },
        })
        if (window.innerWidth > 1150) {
            const bullets = swiper.querySelectorAll('.swiper-pagination-bullet')
            if (bullets.length > 0) bullets.forEach(bullet => {
                const aria = bullet.getAttribute('aria-label')
                const nextSlide = aria[aria.length - 1]
                bullet.addEventListener('mouseenter', () => { swiperCatalog.slideTo(nextSlide) })
            })
        }
    })
}

/* Отзывы */
const swiperReviews = document.querySelector('.swiper.reviews')
if (swiperReviews) {
    const reviewsImg = swiperReviews.querySelectorAll('.reviews__review')
    reviewsImg.forEach(item => item.addEventListener('click', () => window.innerWidth > 480 ? popupsObj['photo'].open(item) : ''))

    new Swiper(swiperReviews, {
        navigation: {
            nextEl: ".swiper-button-reviews-next",
            prevEl: ".swiper-button-reviews-prev",
        },
        scrollbar: {
            el: ".reviews .swiper-scrollbar",
        },

        breakpoints: {
            1024: {
                spaceBetween: 55,
                slidesPerView: 4,
            },
            768: {
                spaceBetween: 35,
                slidesPerView: 4,

            },

            480: {
                slidesPerView: 2,
                spaceBetween: 30,
            },

            375: {
                spaceBetween: 30,
                slidesPerView: 'auto',
            },

            320: {
                spaceBetween: 20,
                slidesPerView: 'auto',
            }
        }
    })
}

// Popups
class Popup {
    constructor(popupElement) {
        this._popupElement = popupElement;
        this._closeButton = this._popupElement.querySelector('.popup__close');
        this._img = this._popupElement.id === "photo" ? this._popupElement.querySelector('.popup__img') : null;
        this._handleEscClose = this._handleEscClose.bind(this)
        this._openingLinks = document.querySelectorAll(`[data-pointer="${this._popupElement.id}"]`)
        this.setEventListeners()
    }

    open(el) {
        if (this._img) this._img.src = el.src
        document.body.style.overflow = "hidden";
        this._popupElement.classList.add('popup_opened')
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        if (this._img) this._img.src = ""
        this._popupElement.classList.remove('popup_opened');
        document.body.style.overflow = "visible";
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.keyCode === 27) {
            this.close();
        }
    }

    _handleOverlayClick(evt) {
        if (evt.target === evt.currentTarget) {
            this.close();
        }
    }

    setEventListeners() {
        this._openingLinks.forEach(link => link.addEventListener('click', (e) => { e.preventDefault(); this.open(e.target) }))
        this._closeButton.addEventListener('click', () => this.close());
        this._popupElement.addEventListener('click', this._handleOverlayClick.bind(this));
    }
}

const popups = document.querySelectorAll('.popup')
let popupsObj = {}
if (popups.length > 0) popups.forEach(item => { popupsObj[item.id] = new Popup(item) })


// Mask phone
$(function () {
    $("#phone").mask("+7 (999) 999-99-99");
});
