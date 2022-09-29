const list = document.querySelector('.list-group')
window.addEventListener('DOMContentLoaded', async (e) => {
  const {
    data: { logs },
  } = await axios.get('api/v1/logger')

  const allLogs = logs
    .map((log) => {
      const { _id: logId, message, createdAt } = log
      return `
        <li class="list-group-item list-group-item-primary">LogId: ${logId} | TimeStamp: ${createdAt} | ${message}</li>
     `
    })
    .join('')
  list.innerHTML = allLogs
})
