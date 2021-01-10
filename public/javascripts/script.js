//index page
const filterForm = document.querySelector('#filter-form')
const category = document.querySelector('#category')
const sort = document.querySelector('#sort')
const month = document.querySelector('#month')
const dateFields = document.querySelectorAll('.date-field')
const clearFilterBtn = document.querySelector('.clear-filter')
//new and edit page
const forms = document.querySelectorAll('form')
const timestampInput = document.querySelector('form #timestamp')
const dateInput = document.querySelector('form #date')

//Index page
//Filter 
if (filterForm) {
  [category, month, sort].forEach(node => node.addEventListener('change', event => {
    setUTCOffset() // Manage time zone difference
    filterForm.submit()
  }))

  filterForm.addEventListener('submit', () => {
    setUTCOffset()
  })

  clearFilterBtn.addEventListener('click', event => {
    category.selectedIndex = '0'
    sort.selectedIndex = '0'
    month.value = ''
    search.value = ''
    filterForm.submit()
  })
}

// Manage time zone difference
// Modify client side input: transfer date string into timestamp, and store in hidden input field
if (timestampInput && dateInput) {
  forms.forEach(form => form.addEventListener('submit', event => {
    const unixTimestamp = new Date(dateInput.value).getTime()
    timestampInput.value = unixTimestamp
  }))
}
// Modify date value in HTML provided by server:
if (dateInput) {
  let timestamp = dateInput.dataset.timestamp ? Number(dateInput.dataset.timestamp) : Date.now()
  dateInput.value = new Date(timestamp).toISOString().slice(0, 10)
  dateInput.dataset.timestamp = ''
}

if (dateFields) {
  dateFields.forEach(date => {
    date.innerText = new Date(Number(date.dataset.timestamp)).toISOString().slice(0, 10).split('-').join('/')
  })
}

//use bootstrap tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})


//----function----//
function setUTCOffset() {
  const utcOffset = document.querySelector('#utc-offset')
  let offset = - (new Date().getTimezoneOffset() / 60)
  offset = offset > 0 ? '+' + offset : offset
  offset = Math.abs(offset) < 10 ? offset[0] + '0' + offset[1] : offset
  utcOffset.value = offset
}



