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




const catalog = document.querySelector('.catalog')
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

// Левое меню
const leftDropdowns = document.querySelectorAll('.left-menu__dropdown')
if (leftDropdowns.length > 0) {
    leftDropdowns.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('open')
            leftDropdowns.forEach(el => el !== item ? el.classList.remove('open') : '')
        })
    })
}

// Селекты
const selects = document.querySelectorAll('.select')
if (selects.length > 0) {
    selects.forEach((select, ind) => {
        let selectName
        const editTextButton = (link, flug) => {
            selectName = link.textContent
            selectBtn.innerHTML = `${selectName}<span></span>`
            selectLinks.forEach(link => link.textContent === selectName ? link.parentNode.style.display = 'none' : link.parentNode.style.display = 'block')
        }
        const selectBtn = select.querySelector('.select__btn')
        const selectLinks = select.querySelectorAll('.select__option a')
        if (selectLinks.length > 0) {
            selectLinks.forEach((item, ind) => {
                ind == 0 ? editTextButton(item, true) : ''
                selectBtn.innerHTML = `${selectName}<span></span>`
                item.addEventListener('click', () => editTextButton(item))
            })
        }
        select.classList.add(`select_${ind}`)
        select.addEventListener('click', () => select.classList.toggle('open'))
        document.addEventListener('click', ({ target }) => {
            if (select.classList.contains('open') && !target.closest(`.select_${ind}`)) {
                select.classList.remove('open')
            }
        })
    })
}


// Перенос фильтра или меню в модалку на брейкпоинте

let mobile
const filter = document.querySelector('.filter')
const leftMenu = document.querySelector('.left-menu')
const aside = document.querySelector('.left-block');

function mobileView() {
    aside.style.display = 'none';
    if (mobile) {
        Array.from([filter, leftMenu]).forEach(item => transferElement(item))
    }
}

function desktopView() {
    aside.style.display = 'grid';
    if (!mobile) {
        Array.from([filter, leftMenu]).forEach(item => transferElement(item))
    }
}

function transferElement(element) {
    if (element) {
        if (mobile) {
            document.querySelector(`#${element.className} .popup__content`).append(element)
        } else {
            aside.append(element)
        }
    }
}
if (aside) {
    window.innerWidth <= 1000 ? mobile = true : mobile = false
    mobile ? mobileView() : desktopView()
    window.addEventListener('resize', () => {

        if (window.innerWidth <= 1000) {
            mobile = true
            mobileView()
        } else {
            mobile = false
            desktopView()
        }
    })
}



// "Самые популярные"
const swiperPopular = document.querySelector('.swiper.popular')
if (swiperPopular) {
    var swiper = new Swiper(swiperPopular, {
        navigation: {
            nextEl: ".swiper-button-popular-next",
            prevEl: ".swiper-button-popular-prev",
        },
        scrollbar: {
            el: ".popular .swiper-scrollbar",
        },

        spaceBetween: 30,
        breakpoints: {
            1290: {
                width: null,
                slidesPerView: 4
            },
            480: {
                spaceBetween: 30,
                width: 300
            },
            320: {
                spaceBetween: 16,
                slidesPerView: 'auto',
            }
        },
    })
}

const inputs = document.querySelectorAll('.form__row input')
const forms = document.querySelectorAll('.form')
function hasInvalidInput(elements) {
    return elements.some((element) => ['INPUT', 'TEXTAREA'].includes(element.tagName) ? !element.validity.valid : '');
}

if (forms.length > 0) {
    forms.forEach(form => {
        const elements = Array.from(form.elements)
        const button = form.querySelector('button')
        const phone = form.querySelector('#phone')
        if (elements.length > 0) {
            elements.forEach(item => {
                if (['INPUT', 'TEXTAREA'].includes(item.tagName)) {
                    item.addEventListener('focus', () => {
                        item.parentNode.style.border = '1px solid #ffaf35'
                    })
                    item.addEventListener('focusout', () => {
                        item.parentNode.style.border = ''
                    })

                    item.addEventListener('input', () => {
                        const phoneInvalid = phone.value.includes('_') || phone.value == '' || !phone.value
                        console.log(phone.value)
                        if (hasInvalidInput(elements) && (phone.required ? phoneInvalid : true)) {
                            button.disabled = true
                        } else {
                            button.disabled = false
                        }
                    })
                }
            })
        }

    })
}
