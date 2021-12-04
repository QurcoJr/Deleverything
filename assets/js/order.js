import { renderProducts } from './cart.js'

const productPanels = [...document.querySelectorAll('.tab-content > .products')]

productPanels.forEach(panel => {
  renderProducts({ target: panel, category: +panel.dataset.tab })
})
