const tableBody = document.querySelector('.list-of-students')
const studentForm = document.querySelector('.student-form')
const formName = document.querySelector('#name')
const formDob = document.querySelector('#dob')
const formMobile = document.querySelector('#mobile')
const formEmail = document.querySelector('#email')
const formModal = document.getElementById('myModal')
let update = false
let updateId = ''
const showList = async (e) => {
  const {
    data: { students },
  } = await axios.get('/api/v1/student')
  const allStudents = students
    .map((student) => {
      const { _id: studentId, name, age, mobile, email } = student
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
  if (target.classList.contains('deleteBtn')) {
    await axios.delete(`/api/v1/student/${id}`)
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
  const dob = new Date(formDob.value)
  let month_diff = Date.now() - dob.getTime()
  let age_dt = new Date(month_diff)
  let year = age_dt.getUTCFullYear()
  const age = Math.abs(year - 1970)
  if (!update) {
    await axios.post('api/v1/student', { name, age, mobile, email })
  } else {
    update = false
    console.log(update, updateId)
    await axios.patch(`api/v1/student/${updateId}`, {
      name,
      age,
      mobile,
      email,
    })

    updateId = ''
  }
  showList()
  formDob.value = ''
  formEmail.value = ''
  formMobile.value = ''
  formName.value = ''
})
