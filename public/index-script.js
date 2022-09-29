const adminForm = document.querySelector('.admin-form')
const formPassword = document.querySelector('#pwd')

adminForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const password = formPassword.value
  try {
    const {
      data: { token },
    } = await axios.post('api/v1/auth/login', { password })

    localStorage.setItem('token', token)
    formPassword.value = ''
    window.location.replace('./student-list.html')
  } catch (error) {
    console.log(error)
    window.location.replace('./index.html')
  }
})
