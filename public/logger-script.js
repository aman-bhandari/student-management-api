const list = document.querySelector('.list-group')
const logOut = document.querySelector('.log-out')
window.addEventListener('DOMContentLoaded', async (e) => {
  const token = localStorage.getItem('token')
  const {
    data: { logs },
  } = await axios.get('api/v1/logger', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const allLogs = logs
    .map((log) => {
      const { _id: logId, message, createdAt } = log
      return `
        <li class="list-group-item list-group-item-dark">LogId: ${logId} | TimeStamp: ${createdAt} | ${message}</li>
     `
    })
    .join('')
  list.innerHTML = allLogs
})

logOut.addEventListener('click', (e) => {
  localStorage.removeItem('token')
  window.location.replace('./index.html')
})
