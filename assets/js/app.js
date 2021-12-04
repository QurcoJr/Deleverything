const nav = document.querySelector('header nav')
const navLinks = [...document.querySelectorAll('.nav-link')]
const menu = document.querySelector('.burger-menu')
const cart = document.querySelector('.cart-wrapper')
const cartButton = document.querySelector('.cart')
const closeCartButton = document.querySelector('.close-cart')
const backdrop = document.querySelector('.backdrop')

function openCart() {
  cart.classList.toggle('expanded')
  backdrop.classList.toggle('expanded')
  nav.classList.remove('expanded')
}

function closeCart() {
  cart.classList.remove('expanded')
  backdrop.classList.remove('expanded')
}

cartButton.addEventListener('click', openCart)
closeCartButton.addEventListener('click', closeCart)
backdrop.addEventListener('click', closeCart)
menu.addEventListener('click', () => nav.classList.toggle('expanded'))

const pathnameParts = window.location.pathname.split('/')

navLinks.forEach(link => {
  let hrefParts = link.getAttribute('href').split('/')
  if (
    hrefParts[hrefParts.length - 1] === pathnameParts[pathnameParts.length - 1]
  ) {
    link.classList.add('active')
  }
})
