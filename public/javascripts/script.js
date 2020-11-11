const categorySelectForm = document.querySelector('#category-select-form')
const categorySelect = document.querySelector('#category-select')
const forms = document.querySelectorAll('form')
const timestampInput = document.querySelector('form #timestamp')
const dateInput = document.querySelector('form #date')
const dateFields = document.querySelectorAll('.date-field')
const deleteForms = document.querySelectorAll('.delete-form')


//Index page
//Filter by category 
if (categorySelectForm && categorySelect) {
  categorySelect.addEventListener('change', event => categorySelectForm.submit())
}

// Manage time zone difference
// Modify client side input: transfer date string into timestamp, and store in hidden input field
if (timestampInput && dateInput) {
  forms.forEach(form => form.addEventListener('submit', event => {
    const unixTimestamp = new Date(dateInput.value)
    timestampInput.value = unixTimestamp.getTime()
  }))
}
// Modify date value in HTML provided by server: 
if (dateInput) {
  let timestamp = dateInput.dataset.timestamp ? Number(dateInput.dataset.timestamp) : Date.now()
  dateInput.value = dateFormat('-', new Date(timestamp))
  dateInput.dataset.timestamp = ''
}

if (dateFields) {
  dateFields.forEach(date => {
    date.innerText = dateFormat('/', new Date(Number(date.dataset.timestamp)))
  })
}

//use bootstrap tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})


//----function----//
function dateFormat(separator, date) {
  let day = date.getDate()
  let month = date.getMonth() + 1
  month = month < 10 ? `0${month}` : month
  day = day < 10 ? `0${day}` : day
  return `${date.getFullYear()}${separator}${month}${separator}${day}`
}