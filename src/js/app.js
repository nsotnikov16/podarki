
//Пункты меню каталога
const catalogBtn = document.querySelector('.header__catalog')
const copyLinksCatalog = document.querySelector('.menu__expand.copy').cloneNode(true)
catalogBtn.append(copyLinksCatalog)