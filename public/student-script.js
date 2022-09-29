const tableBody = document.querySelector('.list-of-students')
const studentForm = document.querySelector('.student-form')
const formName = document.querySelector('#name')
const formAge = document.querySelector('#age')
const formMobile = document.querySelector('#mobile')
const formEmail = document.querySelector('#email')
const formModal = document.querySelector('#myModal')

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
                    <td><button id="${studentId}" type="button" class="btn btn-outline-info updateBtn">UPDATE</button></td>
                    <td><button id="${studentId}" type="button" class="btn btn-outline-danger deleteBtn">DELETE</button></td>
                </tr>
      `
    })
    .join('')

  tableBody.innerHTML = allStudents
}

window.addEventListener('DOMContentLoaded', showList)

studentForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  console.log('chal riya')
  const name = formName.value
  const age = formAge.value
  const mobile = formMobile.value
  const email = formEmail.value
  await axios.post('api/v1/student', { name, age, mobile, email })
  showList()
  formAge.value = ''
  formEmail.value = ''
  formMobile.value = ''
  formName.value = ''
})

tableBody.addEventListener('click', async (e) => {
  let target = e.target
  if (target.classList.contains('deleteBtn')) {
    let id = target.id
    await axios.delete(`/api/v1/student/${id}`)
    showList()
  }

  if (target.classList.contains('updateBtn')) {
  }
})
