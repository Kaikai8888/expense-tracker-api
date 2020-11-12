const filterForm = document.querySelector('#filter-form')
const categorySelect = document.querySelector('#category-select')
const forms = document.querySelectorAll('form')
const timestampInput = document.querySelector('form #timestamp')
const dateInput = document.querySelector('form #date')
const dateFields = document.querySelectorAll('.date-field')


//Index page
//Filter 
if (filterForm) {
  categorySelect.addEventListener('change', event => {
    ensureYearMonthFilter() //user can only filter by a combination of year and month
    setUTCOffset() // Manage time zone difference
    filterForm.submit()
  })

  filterForm.addEventListener('submit', () => {
    ensureYearMonthFilter()
    setUTCOffset()
  })
}

// Manage time zone difference
// Modify client side input: transfer date string into timestamp, and store in hidden input field
if (timestampInput && dateInput) {
  forms.forEach(form => form.addEventListener('submit', event => {
    const unixTimestamp = new Date(dateInput.value).setHours(0)
    timestampInput.value = unixTimestamp
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

function setUTCOffset() {
  const utcOffset = document.querySelector('#utc-offset')
  let offset = - (new Date().getTimezoneOffset() / 60)
  offset = offset > 0 ? '+' + offset : offset
  offset = Math.abs(offset) < 10 ? offset[0] + '0' + offset[1] : offset
  utcOffset.value = offset
}

function ensureYearMonthFilter() {
  const year = document.querySelector('#year')
  const month = document.querySelector('#month')
  if (!year.value && month.value) {
    year.value = new Date().getFullYear()
  } else if (!month.value && year.value) {
    month.value = '1'
  }
}