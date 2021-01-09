const params = (new URL(document.location)).searchParams.toString()
const chart = document.querySelector('#chart').getContext('2d')

axios.get(`/api/records?${params}`)
  .then(response => {
    console.log('response', response)
    if (response.data.status === 'error') return
    const data = response.data.reduce((data, record) => {
      data.datasets[0].data.push(record.amount)
      data.labels.push(record.name)
      return data
    }, { datasets: [{ data: [] }], labels: [] })
    console.log('@@', data)

    const pieChart = new Chart(chart, {
      type: 'pie',
      data
    })
  })
  .catch(error => console.log(error))