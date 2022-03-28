
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