const tableBody = document.querySelector('.list-of-students')
const totalCount = document.querySelector('.total-count')
const showList = async (e) => {
  const {
    data: { students, total },
  } = await axios.get('/api/v1/student')
  totalCount.innerText = total
  const allStudents = students
    .map((student) => {
      const { _id: studentId, name, dob, mobile, email } = student
      const dobDate = new Date(dob)
      let month_diff = Date.now() - dobDate.getTime()
      let age_dt = new Date(month_diff)
      let year = age_dt.getUTCFullYear()
      const age = Math.abs(year - 1970)
      return `<tr>
                    <td>${name}</td>
                    <td>${age}</td>
                    <td>${mobile}</td>
                    <td>${email}</td>
             </tr>`
    })
    .join('')

  tableBody.innerHTML = allStudents
}

window.addEventListener('DOMContentLoaded', showList)
