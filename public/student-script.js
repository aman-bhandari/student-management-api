const tableBody = document.querySelector('.list-of-students')
const studentForm = document.querySelector('.student-form')
const formName = document.querySelector('#name')
const formDob = document.querySelector('#dob')
const formMobile = document.querySelector('#mobile')
const formEmail = document.querySelector('#email')
const formModal = document.getElementById('myModal')
const logOut = document.querySelector('.log-out')
let update = false
let updateId = ''
const showList = async (e) => {
  const token = localStorage.getItem('token')
  const {
    data: { students },
  } = await axios.get('/api/v1/student', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const allStudents = students
    .map((student) => {
      const { _id: studentId, name, dob, mobile, email } = student
      const dobDate = new Date(dob)
      let month_diff = Date.now() - dobDate.getTime()
      let age_dt = new Date(month_diff)
      let year = age_dt.getUTCFullYear()
      const age = Math.abs(year - 1970)
      return `
         <tr>
                    <td>${name}</td>
                    <td>${age}</td>
                    <td>${mobile}</td>
                    <td>${email}</td>
                    <td>
                          
        <button id="${studentId}" type="button" class="btn btn-primary updateBtn" data-bs-toggle="modal" data-bs-target="#myModal">
         UPDATE
        </button>
    

                 
                          </td>
                    <td><button id="${studentId}" type="button" class="btn btn-outline-danger deleteBtn">DELETE</button></td>
                </tr>
      `
    })
    .join('')

  tableBody.innerHTML = allStudents
}

window.addEventListener('DOMContentLoaded', showList)

tableBody.addEventListener('click', async (e) => {
  let target = e.target
  let id = target.id
  const token = localStorage.getItem('token')
  if (target.classList.contains('deleteBtn')) {
    await axios.delete(`/api/v1/student/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    showList()
  }
  if (target.classList.contains('updateBtn')) {
    update = true
    updateId = id
  }
})

studentForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const name = formName.value
  const mobile = formMobile.value
  const email = formEmail.value
  const dob = formDob.value
  const token = localStorage.getItem('token')

  if (!update) {
    await axios.post(
      'api/v1/student',

      {
        name,
        dob,
        mobile,
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  } else {
    update = false

    await axios.patch(
      `api/v1/student/${updateId}`,

      {
        name,
        dob,
        mobile,
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    updateId = ''
  }
  showList()
  formDob.value = ''
  formEmail.value = ''
  formMobile.value = ''
  formName.value = ''
})

logOut.addEventListener('click', (e) => {
  localStorage.removeItem('token')
  window.location.replace('./index.html')
})
