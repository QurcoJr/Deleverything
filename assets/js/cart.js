import { PRODUCT_LIST } from './products.js'

const productsContainer = document.querySelector('.products-container')
const cartQuantityElement = document.querySelector('.cart-quantity')
const cartContent = document.querySelector('.cart-content')
const cartWrapper = document.querySelector('.cart-wrapper')
const backdrop = document.querySelector('.backdrop')
let cart = JSON.parse(window.localStorage.getItem('cart')) || []
let firstLoad = true

updateCartView()

function addToCart(productId, count) {
  const product = PRODUCT_LIST.find(product => product.id === productId)
  let itemIndexInCart = cart.findIndex(item => item.id === productId)
  let newCount = count || 1

  if (itemIndexInCart === -1) {
    cart.push({ ...product, count: newCount })
  } else {
    cart = cart.map(item => {
      if (item.id === productId) {
        return { ...item, count: newCount }
      } else {
        return item
      }
    })
  }

  updateCartView()
  updateLocalStorage('cart', cart)
}

function updateLocalStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

if (productsContainer) {
  productsContainer.addEventListener('click', handleAddToCartClick)

  function handleAddToCartClick(event) {
    const { target } = event

    if (![...target.classList].includes('add-to-cart-btn')) {
      return
    }

    const productId = target.dataset.productId
    const itemCount = +target.previousElementSibling.value

    addToCart(productId, itemCount)
  }
}

cartContent.addEventListener('click', event => {
  const { target } = event
  const classList = [...target.classList]
  if (
    !(
      classList.includes('remove') ||
      classList.includes('item-dec') ||
      classList.includes('item-inc')
    )
  ) {
    return
  }

  const itemId = target.dataset.itemId
  const itemCount = +document.querySelector(`[data-item-count-id='${itemId}']`)
    .dataset.itemCount

  if (classList.includes('remove')) {
    removeItemFromCart(itemId)
  }

  if (classList.includes('item-dec')) {
    addToCart(itemId, itemCount - 1)
  }

  if (classList.includes('item-inc')) {
    addToCart(itemId, itemCount + 1)
  }
})

function removeItemFromCart(id) {
  cart = cart.filter(item => item.id !== id)
  updateLocalStorage('cart', cart)
  updateCartView()
}

function updateCartView() {
  let cartContentHTML

  if (!cart.length) {
    cartContent.classList.add('no-item')
    cartContentHTML = `<span>We couldn't find any items in your cart.</span>
    <a href="/order.html" class="link-button primary">Start an Order</a>`
  } else {
    cartContent.classList.remove('no-item')
    cartContentHTML = cart
      .map(
        item => `<div class="cart-item">
      <img src=${item.thumbnail} alt=${item.name} />
      <div class="cart-item-details-wrapper">
        <div class="item-details">
          <span class="item-name">${item.name}</span>
          <span class="item-price">$ ${item.price.toFixed(2)} USD</span>
          <button class="remove" data-item-id=${item.id}>Remove</button>
        </div>
        <div class="item-controller">
        <button class="item-dec" data-item-id=${item.id} ${
          item.count === 1 ? 'disabled' : ''
        }>-</button>
        <span class="item-count" data-item-count-id=${
          item.id
        } data-item-count=${item.count}>${item.count}</span>
        <button class="item-inc" data-item-id=${item.id}>+</button>
        </div>
      </div>
    </div>`
      )
      .join('').concat(`<div class="cart-footer">
      <div class="cart-subtotal">
        <span class="subtotal">Subtotal</span
        ><span class="subtotal-count">$ ${calculateSubtotal()} USD</span>
      </div>
      <div class="button primary checkout disabled">Checkout Coming Soon...</div>
    </div>`)
  }

  cartContent.innerHTML = cartContentHTML
  cartQuantityElement.textContent = cart.length
  if (!firstLoad) {
    openCart()
  }

  firstLoad = false
}

function calculateSubtotal() {
  const total = cart.reduce((acc, cur) => acc + cur.price * cur.count, 0)
  return parseFloat(total).toFixed(2)
}

function openCart() {
  cartWrapper.classList.add('expanded')
  backdrop.classList.add('expanded')
}

export function renderProducts({ target, count, category }) {
  let productsToRender

  if (!count) {
    productsToRender = PRODUCT_LIST
  } else {
    productsToRender = PRODUCT_LIST.slice(0, count)
  }

  if (category) {
    productsToRender = productsToRender.filter(
      product => product.category === category
    )
  }

  const productsHTML = productsToRender
    .map(product => {
      const itemCount = cart.find(item => item.id === product.id)?.count || 1

      return `<div class="item">
              <div class="item-image">
                <img
                  src=${product.thumbnail}
                  alt=${product.name}
                />
              </div>
                <div class="item-content">
                  <div class="item-header">
                    <h6 class="item-name">${product.name}</h6>
                    <span class="item-price">$${product.price.toFixed(
                      2
                    )} USD</span>
                  </div>
                  <p class="item-description body-paragraph">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  </p>
                  <div class="item-cta">
                    <input class="product-count" value=${itemCount} type="number" min="1" data-product-id-count=${
        product.id
      } />
                    <button data-product-id=${
                      product.id
                    } class="button primary add-to-cart-btn">Add To Cart</button>
                  </div>
                </div>
              </div>`
    })
    .join('')

  target.innerHTML = productsHTML
}
