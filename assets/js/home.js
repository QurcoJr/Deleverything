import { renderProducts } from './cart.js'

const productsHome = document.querySelector('.products-home')
renderProducts({ target: productsHome, count: 4 })
