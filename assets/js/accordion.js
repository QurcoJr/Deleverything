const accordionButtons = document.querySelectorAll('.accordion-button')
accordionButtons.forEach(button =>
  button.addEventListener('click', e =>
    e.currentTarget.parentElement.classList.toggle('expanded')
  )
)
