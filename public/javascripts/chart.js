const params = (new URL(document.location)).searchParams.toString()
const chart = document.querySelector('#chart').getContext('2d')
const dataPanel = document.querySelector('#data-panel')
const palette = ['rgba(127, 214, 245, 0.5)', 'rgba(37, 130, 167, 0.5)', 'rgba(120, 194, 173, 0.5)', 'rgba(201, 177, 175, 0.5)', 'rgba(245, 127, 155, 0.5)']

axios.get(`/api/records?${params}`)
  .then(response => {
    if (response.data.status === 'error') return
    const data = response.data.reduce((data, record) => {
      data.datasets[0].data.push(record.subTotalAmount)
      data.labels.push(record.category_docs[0].name)
      return data
    }, { datasets: [{ data: [] }], labels: [] })
    data.datasets[0].backgroundColor = palette
    const chartObj = new Chart(chart, {
      type: 'doughnut',
      data,
      options: {
        legend: {
          position: 'bottom',
          labels: {
            fontSize: 16
          }
        }
      }
    })
  })
  .catch(error => console.log(error))