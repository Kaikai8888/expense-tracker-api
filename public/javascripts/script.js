const filterForm = document.querySelector('#filter-form')
const categorySelect = document.querySelector('#category-select')
const forms = document.querySelectorAll('form')
const timestampInput = document.querySelector('form #timestamp')
const dateInput = document.querySelector('form #date')
const dateFields = document.querySelectorAll('.date-field')


//Index page
//Filter 
if (filterForm) {
  categorySelect.addEventListener('change', event => filterForm.submit())
  //limit filtering function to by a combination of year and month, not just by month or by year
  filterForm.addEventListener('change', event => {
    const year = document.querySelector('#year-select')
    const month = document.querySelector('#month-select')
    if (event.target.id === 'year-select' && year.value !== 'all' &&
      month.value === 'all') {
      month.value = '1'
    } else if (event.target.id === 'month-select' && month.value !== 'all' &&
      year.value === 'all') {
      console.log(year.options.length)
      if (year.options.length > 1) {
        year.value = year.options[year.options.length - 1].value
      } else {
        month.value = 'all'
      }
    } else if (event.target.id !== 'category-select' && event.target.value === 'all') {
      month.value = 'all'
      year.value = 'all'
    }
    console.log(year.selectedIndex)
    console.log(month.selectedIndex)
  })
  // Manage time zone difference
  // pass client side timezone info back to server for year and month filtering
  // filterForm.addEventListener('submit', event => {
  //   const timezoneOffset = document.querySelector('#timezone-offset')
  //   timezoneOffset.value = new Date().getTimezoneOffset()
  // })
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