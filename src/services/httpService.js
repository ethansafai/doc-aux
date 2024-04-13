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

export default sharedAxios
