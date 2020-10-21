const categorySelectForm = document.querySelector('#category-select-form')
const categorySelect = document.querySelector('#category-select')

if (categorySelectForm && categorySelect) {
  categorySelect.addEventListener('change', event => categorySelectForm.submit())
}

//use bootstrap tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})