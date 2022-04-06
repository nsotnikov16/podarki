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
window.addEventListener("DOMContentLoaded", function () {
    [].forEach.call(document.querySelectorAll('#phone'), function (input) {
        var keyCode;
        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            var pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            var matrix = "+7 (___) ___ ____",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function (a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                });
            i = new_value.indexOf("_");
            if (i != -1) {
                i < 5 && (i = 3);
                new_value = new_value.slice(0, i)
            }
            var reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function (a) {
                    return "\\d{1," + a.length + "}"
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
            if (event.type == "blur" && this.value.length < 5) this.value = ""
        }

        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false)
    });
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
            /* selectLinks.forEach(link => link.textContent === selectName ? link.parentNode.style.display = 'none' : link.parentNode.style.display = 'block') */
            setTimeout(() => select.classList.remove('open'), 2)
        }
        const selectBtn = select.querySelector('.select__btn')
        const selectLinks = select.querySelectorAll('.select__link')
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

        breakpoints: {
            1290: {
                slidesPerView: 4,
                spaceBetween: 30,
            },
            860: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            480: {
                spaceBetween: 30,
                slidesPerView: 2
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
        const button = form.querySelector('.form__btn')
        if (elements.length > 0) {
            elements.forEach(item => {
                if (['INPUT', 'TEXTAREA'].includes(item.tagName)) {
                    item.addEventListener('focus', () => item.parentNode.style.border = '1px solid #ffaf35')
                    item.addEventListener('focusout', () => item.parentNode.style.border = '')
                    item.addEventListener('input', () => hasInvalidInput(elements) ? button.disabled = true : button.disabled = false)
                }
            })
        }
    })
}


// Детальная страница
const swiperThumbsDetail = new Swiper(".detail-swiper-thumbs", {
    spaceBetween: 10,

    watchSlidesProgress: true,
    navigation: {
        nextEl: ".detail-swiper-thumbs .swiper-button-next",
        prevEl: ".detail-swiper-thumbs .swiper-button-prev",
    },
    mousewheel: true,
    breakpoints: {
        480: {
            direction: 'vertical',
            slidesPerView: 4,
        },
        320: {
            direction: 'horizontal',
            slidesPerView: 3,
        }

    }
});
const swiperDetail = new Swiper(".detail-swiper", {
    thumbs: {
        swiper: swiperThumbsDetail,
    },
    autoplay: true,
    mousewheel: true,
})


// Скролл
const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
    animationTime = 400,
    framesCount = 30;

function scroll(item) {
    // для каждого якоря берем соответствующий ему элемент и определяем его координату Y
    let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;

    // запускаем интервал, в котором
    let scroller = setInterval(function () {
        // считаем на сколько скроллить за 1 такт
        let scrollBy = coordY / framesCount;

        // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
        // и дно страницы не достигнуто
        if (scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
            // то скроллим на к-во пикселей, которое соответствует одному такту
            window.scrollBy(0, scrollBy);
        } else {
            // иначе добираемся до элемента и выходим из интервала
            window.scrollTo(0, coordY);
            clearInterval(scroller);
        }
        // время интервала равняется частному от времени анимации и к-ва кадров
    }, animationTime / framesCount);
}

anchors.forEach(function (item) {
    // каждому якорю присваиваем обработчик события
    item.addEventListener('click', (e) => {
        // убираем стандартное поведение
        e.preventDefault();
        scroll(item)
    });
});

// Состав подарка в модальное окно
const structure = document.querySelector('.detail__structure')
const scrollStructure = document.querySelector('.detail__scroll')
if (structure && scrollStructure) {
    const popupStructure = document.querySelector('#structure-popup .popup__content')
    popupStructure.append(structure.cloneNode(true))
    function showAllStructure(el) {
        if (window.innerWidth < 768) {
            popupsObj['structure-popup'].open()
        } else {
            scroll(el)
        }
    }
}


/* Заказ */
/* var swiperOrder = new Swiper(".order-swiper", {
    direction: "vertical",
    slidesPerView: "auto",
    freeMode: true,
    scrollbar: {
        el: ".order-swiper .swiper-scrollbar",
    },
    mousewheel: true,
}); */

const selectMethodDeliveryOrder = document.querySelector('.order__select-adress')
if (selectMethodDeliveryOrder) {
    const orderExport = document.querySelector('.order__export')
    const orderAddres = document.querySelector('#order-address')
    const inputsMethodDelivery = selectMethodDeliveryOrder.querySelectorAll('input')
    const inputAddress = orderAddres.querySelector('input')

    function checkInputDelivery(input) {
        console.log(Array.from(inputsMethodDelivery))
        Array.from([orderExport, orderAddres]).forEach(el => replaceClass(el, 'd-block', 'd-none'))
        if (input.id === 'courier') {
            replaceClass(orderAddres, 'd-none', 'd-block')
            replaceClass(orderExport, 'd-block', 'd-none')
            inputAddress.required = true

        } else if (input.id === 'export') {
            replaceClass(orderAddres, 'd-block', 'd-none')
            replaceClass(orderExport, 'd-none', 'd-block')
            inputAddress.required = false
            inputAddress.value = ''
        }
    }

    Array.from(inputsMethodDelivery).forEach(item => item.addEventListener('change', () => checkInputDelivery(item)))
}


// Персонал

// Имена одинаковой высоты
const personalNames = document.querySelectorAll('.personal__name')
if (personalNames.length > 0) {
    let height = 0
    personalNames.forEach(item => {
        const heightName = item.clientHeight
        if (heightName > height) height += heightName
    })
    personalNames.forEach(item => item.style.height = `${height}px`)
}

// Показать email сотрудника
const personalEmails = document.querySelectorAll('.personal__email')
if (personalEmails.length > 0) {
    personalEmails.forEach(item => {
        const hide = item.querySelector('.personal__email-hide')
        const show = item.querySelector('.personal__email-show')
        hide.addEventListener('click', () => { show.style.display = 'block'; hide.style.display = 'none' })
    })
}

// Баннеры
var swiperBanner = new Swiper(".swiper-banner", {
    autoplay: true,
    navigation: {
        nextEl: ".swiper-banner .swiper-button-next",
        prevEl: ".swiper-banner .swiper-button-prev",
    },
    pagination: {
        el: '.swiper-banner .swiper-pagination',
    },
});

function replaceClass(el, oldClass, newClass) {
    el.classList.remove(oldClass)
    el.classList.add(newClass)
}