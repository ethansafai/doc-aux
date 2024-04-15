import axios from 'axios'

const sharedAxios = axios.create({
  baseURL: process.env.REACT_APP_DOCAUX_REST_API_URL,
  headers: {
    'Content-Type': 'application/json',
    timeout: 2000,
  },
})

sharedAxios.interceptors.request.use((config) => {
  const accessToken =
    localStorage.getItem('doctorAccessToken') ??
    localStorage.getItem('patientAccessToken')
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

sharedAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('doctor')
      localStorage.removeItem('doctorAccessToken')
      localStorage.removeItem('patient')
      localStorage.removeItem('patientAccessToken')
      alert('Your session has expired, signing you out...')
      window.location.href = '/login'
    } else {
      return Promise.reject(error)
    }
  }
)

export default sharedAxios
